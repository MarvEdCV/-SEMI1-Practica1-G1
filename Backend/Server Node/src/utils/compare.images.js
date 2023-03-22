const AWS = require('aws-sdk');
import config from '../config';

// Configurar las credenciales de AWS

AWS.config.update({
    accessKeyId: config.rekognition.accessKeyId,
    secretAccessKey: config.rekognition.secretAccessKey,
    region: config.rekognition.region
});

const rekognition = new AWS.Rekognition();

async function compareImages(imageUrl, imageUrl2) {
    const imageName = imageUrl.split('/').pop();
    const imageName2 = imageUrl2.split('/').pop();
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
                    Name: imageName2
                },
            }
        };
        const result = await rekognition.compareFaces(params).promise();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = compareImages;
