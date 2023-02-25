const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    saveNewUser(userName,password,url){
        return this.queryMultiple({sql: "CALL new_user(?,?,?)", params: [userName,password,url]});
    }

    findUser(userName){
        return this.queryView({sql: `SELECT * FROM user WHERE username = '${userName}' AND deleted_at IS NULL`});
    }

}

module.exports = {P1Model};