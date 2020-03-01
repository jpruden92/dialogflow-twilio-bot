const dialogflow = require('dialogflow');
const Amplitude = require('./amplitude.js');

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient();

const resolveText = async (text, sessionId, phoneNumber) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text,
                languageCode: process.env.LANGUAGE || 'es-ES'
            }
        }
    };


    const responses = await sessionClient.detectIntent(request);

    const evntProps = {
        ..._parseParams(responses[0].queryResult.parameters.fields),
        input: responses[0].queryResult.queryText,
        //phoneNumber
    };

    let endConversation = false;

    try {
        if (responses[0].queryResult.diagnosticInfo.fields.end_conversation.boolValue) {
            endConversation = true;
        }
    } catch (err) {}

    Amplitude.track(sessionId, responses[0].queryResult.intent.displayName, evntProps);

    return {
        text: responses[0].queryResult.fulfillmentText,
        endConversation
    };
};

const _parseParams = fields => {
    const params = {};
    for (key in fields) {
        params[key] = fields[key].stringValue
    }
    return params;
};

module.exports = {
    resolveText
};