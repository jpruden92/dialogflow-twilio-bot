const Amplitude = require('amplitude');
const amplitude = process.env.AMPLITUDE_API_KEY ? new Amplitude(process.env.AMPLITUDE_API_KEY) : null;

const track = (sessionId, eventName, evntProperties) => {
    if (!amplitude) return;

    const data = {
        event_type: eventName,
        user_id: sessionId,
        event_properties: evntProperties
    }

    amplitude.track(data);
}

module.exports = {
    track
};