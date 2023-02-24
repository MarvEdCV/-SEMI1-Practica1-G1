import {Router} from "express";
import httpCode from "http-status-codes";
import CryptoJS from 'crypto-js';

import app from "../app";

const {P1Model} = require("../models/p1.model.js");
const router = Router();

router.get("/", (req, res) => {
    res.status(httpCode.OK).json({"Bienvenid@": "Esta es la API de NodeJs del Grupo 1 para la practica 1 - SEMINARIO DE SISTEMAS I"})
})

router.post("/user", (req, res) => {
    //Todo: Aca es donde tengo que pasar la imagen de base 64 a url ya que la picture en el body vendra en base 64.
    let url = req.body.picture;
    P1Model.create(req.app)
        .saveNewUser(req.body.username, req.body.password, url).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la creación de usuario revise el servidor de Node",
            "error": err
        });
    });
});

router.post("/user/login", (req, res) => {
    P1Model.create(req.app)
        .findUser(req.body.username).then(data => {
        let passEncrypted = CryptoJS.MD5(req.body.password).toString();
        if (data.length > 0) {
            if (passEncrypted == data[0].password) {
                return res.status(httpCode.OK).json({"successStatus": true, "existUser":true, "errorMessage": null});
            }
            return res.status(httpCode.NOT_FOUND).json({"successStatus": false, "existUser": true ,"errorMessage": "contraseña incorrecta"});
        }
        return res.status(httpCode.NOT_FOUND).json({"successStatus": false, "existUser": false , "errorMessage": "El usuario no existe"});
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});


module.exports = {router}