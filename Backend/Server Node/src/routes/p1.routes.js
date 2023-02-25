import {Router} from "express";
import httpCode from "http-status-codes";
import CryptoJS from 'crypto-js';
import S3 from '../aws/s3';

import app from "../app";

const {P1Model} = require("../models/p1.model.js");
const router = Router();
const uploader = new S3();

router.get("/", (req, res) => {
    res.status(httpCode.OK).json({"Bienvenid@": "Esta es la API de NodeJs del Grupo 1 para la practica 1 - SEMINARIO DE SISTEMAS I"})
})

router.post("/user", async (req, res) => {
    const url = await uploader.uploadImage(req.body.picture, req.body.filename);
    P1Model.create(req.app)
        .saveNewUser(req.body.username, req.body.name, req.body.password, url).then(data => {
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
                return res.status(httpCode.OK).json({"successStatus": true, "existUser": true, "errorMessage": null});
            }
            return res.status(httpCode.NOT_FOUND).json({
                "successStatus": false,
                "existUser": true,
                "errorMessage": "contraseña incorrecta"
            });
        }
        return res.status(httpCode.NOT_FOUND).json({
            "successStatus": false,
            "existUser": false,
            "errorMessage": "El usuario no existe"
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/user", (req, res) => {
    P1Model.create(req.app)
        .getUser(req.body.username).then(data => {
        if (data.length > 0) {
            return res.status(httpCode.OK).json(data);
        }
        return res.status(httpCode.NOT_FOUND).json({"status": false, "message": "El usuario no existe"});
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({"error": err});
    });
});

router.put("/user", async (req, res) => {
    const url = await uploader.uploadImage(req.body.picture, req.body.filename);
    P1Model.create(req.app)
        .updateUser(req.body.username, req.body.name, url).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la actualizacion de usuario revise el servidor de Node",
            "error": err
        });
    });
});

router.post("/picture", async (req, res) => {
    const url = await uploader.uploadImage(req.body.picture, req.body.filename);
    P1Model.create(req.app)
        .newPicture(req.body.username, req.body.albumName, url).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la creación de foto revise el servidor de Node",
            "error": err
        });
    });
});

router.post("/album", async (req, res) => {
    P1Model.create(req.app)
        .newAlbum(req.body.username, req.body.albumName).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la creación de album revise el servidor de Node",
            "error": err
        });
    });
});

router.put("/album", async (req, res) => {
    P1Model.create(req.app)
        .updateAlbum(req.body.username, req.body.albumName, req.body.newAlbumName).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la actualizacion de album revise el servidor de Node",
            "error": err
        });
    });
});

router.delete("/album", async (req, res) => {
    P1Model.create(req.app)
        .deleteAlbum(req.body.username, req.body.albumName).then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json({
            "sucessStatus": false,
            "errorMessage": "Hubo un error en la eliminacion de album revise el servidor de Node",
            "error": err
        });
    });
});

router.get("/album", async (req, res) => {
    let albumList = await P1Model.create(req.app).getAlbum(req.body.username);
    if( albumList.length > 0){
        const albumResponse = {};
        for (const album of albumList){
            const pictureList = await  P1Model.create(req.app).getPicture(album.album_id);
            albumResponse[album.name] = pictureList;
        }
        const result = {album: albumResponse};
        console.log(result);
        return res.status(httpCode.OK).json({"status":true,result});
    }
    return res.status(httpCode.NOT_FOUND).json({"status":false,"message": "El usuario no tiene albumes creados"});

});


module.exports = {router}

