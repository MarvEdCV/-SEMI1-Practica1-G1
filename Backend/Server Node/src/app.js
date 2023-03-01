import express from "express";

import morgan from "morgan";
import config from "./config";
const mysql = require("mysql2")
const app = express();
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
const p1Routes = require('./routes/p1.routes')

app.set("port",3010);


// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api",p1Routes.router);
/**
 * Creamos pool conection para evitar crear muchas conexiones
 * @type {Pool}
 */
app.locals.mysqlConnectionPool = mysql.createPool(config.mysql);

export default  app;