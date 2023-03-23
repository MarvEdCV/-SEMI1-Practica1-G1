import AWS from 'aws-sdk';
import config from '../config';

AWS.config.update({region: config.s3.region});
const contentTypes = {
    "bmp": "image/bmp",
    "gif": "image/gif",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "tiff": "image/tiff",
    "webp": "image/webp"
};

class S3 {
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: config.s3.accessKeyId,
            secretAccessKey: config.s3.secretAccessKey,
        });
    }


    async uploadImage(base64Image, filename) {
        const file = filename.split('.');
        const ext = file.pop();
        const name = file.shift();
        const contentType = contentTypes[ext];

        const buffer = Buffer.from(base64Image, 'base64');

        const uploadResponse = await this.s3.upload({
            Bucket: config.s3.bucketName,
            Key: `${name}-${Date.now()}-NodeJs.${ext}`,
            Body: buffer,
            ContentType: contentType,
        }).promise();
        return uploadResponse.Location;
    }
}

export default S3;
