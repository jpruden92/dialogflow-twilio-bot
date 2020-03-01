require('dotenv').config();

const PORT = process.env.PORT || 3000;
const VOICE_RATE = '111%';

const express = require('express');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const Dialogflow = require('./utils/dialogflow.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (request, response) => {
    response.send('Twilio Phone server started.');
});

app.post('/webhook', async (request, response) => {
    const { body } = request;
    const { SpeechResult, CallSid, From } = body;

    const twiml = new VoiceResponse();

    let nlpResult;

    if (!SpeechResult) {
        // First time interaction.
        nlpResult = await Dialogflow.resolveText('hola', CallSid, From);
    } else {
        // Second and next time interactions.
        nlpResult = await Dialogflow.resolveText(SpeechResult, CallSid, From);
    }

    twiml.say({
        rate: VOICE_RATE,
        language: process.env.LANGUAGE || 'es-ES'
    }, nlpResult.text);

    if (!nlpResult.endConversation) {
        twiml.gather({
            method: 'POST',
            input: 'speech',
            action: '/webhook',
            speechTimeout: 1,
            timeout: 10,
            actionOnEmptyResult: true,
            finishOnKey: '',
            language: process.env.LANGUAGE || 'es-ES'
        });
    }

    response.send(twiml.toString());
});

app.post('/callStatus', (request, response) => {
    const { body } = request;
    response.send();
});

app.listen(PORT, () => {
    console.info(`Your server is listening on ${PORT}`);
});
