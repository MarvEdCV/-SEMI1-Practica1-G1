import {Router} from "express";
import httpCode from "http-status-codes";

const { P1Model } = require("../models/p1.model.js");
const router = Router();

router.get("/",(req,res) => {
    res.status(httpCode.OK).json({"Bienvenido":"hola"})
})

module.exports = {router}