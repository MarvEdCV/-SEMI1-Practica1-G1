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

}

module.exports = {P1Model};