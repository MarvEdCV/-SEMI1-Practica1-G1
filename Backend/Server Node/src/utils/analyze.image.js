const AWS = require('aws-sdk');
import config from '../config';

const rekognition = new AWS.Rekognition({
    accessKeyId: config.rekognition.accessKeyId,
    secretAccessKey: config.rekognition.secretAccessKey,
    region: config.rekognition.region
});

async function analyzeImage(base64Image) {
    try {
        const buffer = Buffer.from(base64Image, 'base64');

        const response = await rekognition.detectLabels({
            Image: {
                Bytes: buffer
            },
            MaxLabels: 5 // Aquí puedes especificar cuántas etiquetas deseas que se devuelvan
        }).promise();

        return response.Labels.map(tag => tag.Name);
    } catch (error) {
        console.error(error);
        throw new Error('Ocurrió un error al procesar la imagen.');
    }
}

async function extractText(base64Image) {
    try {
        const buffer = Buffer.from(base64Image, 'base64');

        const response = await rekognition.detectText({
            Image: {
                Bytes: buffer
            }
        }).promise();

        return response.TextDetections.map(detection => detection.DetectedText);
    } catch (error) {
        console.error(error);
        throw new Error('Ocurrió un error al procesar la imagen.');
    }
}



module.exports = {analyzeImage,extractText};
