const {Database} = require('./../database/database')
const compareImages = require('./../utils/compare.images');
const imageProccesor = require('./../utils/analyze.image')
const translateText = require('./../utils/translate.text');
import S3 from '../aws/s3';
const uploader = new S3();
/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    saveAlbum(name,username){
        return this.queryView({sql:`INSERT INTO album(name,username) VALUES('${name}','${username}')`})
    }

    savePicture(url,albumId){
        return this.queryView({sql:`INSERT INTO picture(url, album_id) VALUES('${url}','${albumId}')`})
    }
    async saveNewUser(userName, name,password,url,base64Image){
        const labels = await imageProccesor.analyzeImage(base64Image);
        const newUser = await this.queryView({sql:`INSERT INTO user(username,name,password,labels) VALUES('${userName}','${name}',MD5('${password}'),'${labels}')`});
        //Creamos album default
        const albumDefault = await this.saveAlbum(`default-${userName}`,userName);

        await this.savePicture(url,albumDefault.insertId)

        if(newUser.affectedRows > 0){
            return this.queryView({sql: `SELECT * FROM user WHERE username = '${userName}'`});
        }
        return {
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la creación de usuario revise el servidor de Node"
        }
    }

    findUser(userName){
        return this.queryView({sql: `SELECT * FROM user WHERE username = '${userName}' AND deleted_at IS NULL`});
    }

    getUser(userName){
        return this.queryMultiple({sql: "CALL get_user(?)", params: [userName]});
    }

    async updateUser(username,name,url,base64Image){
        const labels = await imageProccesor.analyzeImage(base64Image);
        return this.queryMultiple({sql: "CALL update_user(?,?,?,?)", params: [username,name,url,labels.join(',')]});
    }

    async newPicture(username,url,base64Image,description,name){

            const labels = await imageProccesor.analyzeImage(base64Image);
            for (const label of labels) {
                let albumId;
                const existAlbum = await this.queryView({sql:`SELECT * FROM album WHERE name = '${label}' AND username = '${username}' LIMIT 1`})
                if(existAlbum.length > 0){
                    albumId = existAlbum[0].album_id;
                }else{
                    const album = await this.queryView({sql:`INSERT INTO album(name,username) VALUES('${label}','${username}')`});
                    albumId = album.insertId;
                }
                await this.queryView({sql:`INSERT INTO picture(url,album_id,name,description) VALUES('${url}','${albumId}','${name.split('.')[0]}','${description}')`})
            }
            return {
                successStatus: true,
                errorMessage: null
            }
    }

    getAlbum(username){
        return this.queryView({sql: `SELECT album_id, name FROM album WHERE username = '${username}' AND deleted_at IS NULL`});
    }

    getPicture(album_id){
        return this.queryView({sql: `SELECT picture_id,url,name,description FROM picture WHERE album_id = ${album_id} AND deleted_at IS NULL`});
    }

    getFotoPerfilUsuario(username){
        return this.queryView({sql: `SELECT p.url FROM picture p JOIN album a ON a.album_id = p.album_id WHERE a.name = 'default-${username}' ORDER BY p.updated_at DESC LIMIT 1`})
    }
    async loginCamera(username,picture){
        const currentPicture = await this.getFotoPerfilUsuario(username);
        const url = await uploader.uploadImage(picture, 'login');
        return await compareImages(currentPicture[0].url, url)
    }

    async transaleDescription(pictureId,language){
        const picture = await this.queryView({sql: `SELECT * FROM picture WHERE picture_id = ${pictureId}`});
        const result = await translateText(picture[0].description,language)
        return {"description":picture[0].description,"traduction":result,"url":picture[0].url};
    }

    extractText(base64Image){
        return imageProccesor.extractText(base64Image);
    }

}

module.exports = {P1Model};
