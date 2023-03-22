const AWS = require('aws-sdk');
import config from '../config';

AWS.config.update({
    accessKeyId: config.translate.accessKeyId,
    secretAccessKey: config.translate.secretAccessKey,
    region: config.translate.region
});

const translate = new AWS.Translate({apiVersion: '2017-07-01'});

async function translateText(text, targetLanguage) {
    try {
        const params = {
            SourceLanguageCode: 'auto', // Detecta el idioma automáticamente
            TargetLanguageCode: targetLanguage,
            Text: text
        };
        const result = await translate.translateText(params).promise();
        return result.TranslatedText;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = translateText;
