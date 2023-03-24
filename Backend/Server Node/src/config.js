import dotenv from "dotenv";

dotenv.config({path: `./.env.${process.env.NODE_ENV}`});
export default {
    mysql: {
        host: "database-photobucket.cr1hjnbhot0g.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "seminario1-grupo1",
        port: "3306",
        database: "db-photobucket",
        connectionLimit: 10
    },
    s3: {
        region: "us-east-1",
        accessKeyId: "AKIAV2WSSDG75MMIAJ6P",
        secretAccessKey: "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",
        bucketName: "practica1-g1-imagenes-semi1"
    },
    rekognition: {
        region: "us-east-1",
        accessKeyId: "AKIAV2WSSDG7SPU3SXXQ",
        secretAccessKey: "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"
    },
    translate: {
        region: "us-east-1",
        accessKeyId: "AKIAV2WSSDG73N6GLK6L",
        secretAccessKey: "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"
    }
}
