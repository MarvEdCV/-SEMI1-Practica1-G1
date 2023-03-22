import dotenv from "dotenv";

dotenv.config({path: `./.env.${process.env.NODE_ENV}`});
export default {
    mysql: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORT,
        database: process.env.DATABASE_NAME,
        connectionLimit: 10
    },
    s3: {
        region: process.env.S3_REGION,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        bucketName: process.env.S3_BUCKET_NAME
    },
    rekognition: {
        region: process.env.REKOGNITION_REGION,
        accessKeyId: process.env.REKOGNITION_ACCESS_KEY_ID,
        secretAccessKey: process.env.REKOGNITION_SECRET_ACCESS_KEY
    },
    translate: {
        region: process.env.TRASLATE_REGION,
        accessKeyId: process.env.TRASLATE_ACCESS_KEY_ID,
        secretAccessKey: process.env.TRASLATE_SECRET_ACCESS_KEY
    }
}
