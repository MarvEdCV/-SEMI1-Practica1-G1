import {Router} from "express";
import httpCode from "http-status-codes";
const router = Router();

router.get("/v2", (req, res) => {
    res.status(httpCode.OK).json({"Bienvenid@": "Esta es la API de NodeJs del Grupo 1 v2 para la practica 1 - SEMINARIO DE SISTEMAS I"})
})

module.exports = {router}
