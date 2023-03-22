const AWS = require('aws-sdk');
const request = require('request-promise-native');
import config from '../config';

// Configurar las credenciales de AWS

AWS.config.update({
    accessKeyId: config.rekognition.accessKeyId,
    secretAccessKey: config.rekognition.secretAccessKey,
    region: config.rekognition.region
});

const rekognition = new AWS.Rekognition();

async function compareImages(imageUrl, base64Image) {
    const imageName = imageUrl.split('/').pop();
    try {

        const params = {
            SimilarityThreshold: 80,
            SourceImage: {
                S3Object: {
                    Bucket: config.s3.bucketName,
                    Name: imageName
                },
            },
            TargetImage: {
                S3Object: {
                    Bucket: config.s3.bucketName,
                    Name: imageName
                },
            }
        };
        console.log(params)
        const result = await rekognition.compareFaces(params).promise();
        console.log(result);
        return params;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = compareImages;
