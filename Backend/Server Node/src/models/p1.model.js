const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    saveNewUser(userName, name,password,url){
        return this.queryMultiple({sql: "CALL new_user(?,?,?,?)", params: [userName,name,password,url]});
    }

    findUser(userName){
        return this.queryView({sql: `SELECT * FROM user WHERE username = '${userName}' AND deleted_at IS NULL`});
    }

    getUser(userName){
        return this.queryMultiple({sql: "CALL get_user(?)", params: [userName]});
    }

    updateUser(username,name,url){
        return this.queryMultiple({sql: "CALL update_user(?,?,?)", params: [username,name,url]});
    }

    newPicture(username,albumName,url){
        return this.queryMultiple({sql: "CALL new_picture(?,?,?)", params: [username,albumName,url]});
    }

    newAlbum(username,albumName){
        return this.queryMultiple({sql: "CALL new_album(?,?)", params: [username,albumName]});
    }

    updateAlbum(username,albumName,newAlbumName){
        return this.queryMultiple({sql: "CALL update_album(?,?,?)", params: [username,albumName,newAlbumName]});
    }

    deleteAlbum(username,albumName){
        return this.queryMultiple({sql: "CALL delete_album(?,?)", params: [username,albumName]});
    }

}

module.exports = {P1Model};