var nitrogen = require('nitrogen'),
    latitude = 47.6097,
    longitude = -122.3331,
    config, service, car;

config = {
    host: 'api.nitrogen.io',
    http_port: 443,
    protocol: 'https'
};

service = new nitrogen.Service(config);
car = new nitrogen.Device({
    api_key: process.env.API_KEY,
    name: 'Fake Car Device',
    nickname: 'car',
    tags: ['sends:location']
});

service.connect(car, function(err, session) {
    if (err) {
        return console.log('Service connect error: ', err);
    }
    setInterval(fakeCarMessage.bind(null, session), 1000);
});

/* Helper functions */
function log(err, message) {
    if (err) {
        return console.log('Message send error: ', err);
    }
    console.dir(message);
}

function fakeCarMessage(session) {
    var message;

    latitude += Math.random() * 0.0005;
    longitude += Math.random() * 0.0005;

    message = new nitrogen.Message({
        type: 'location',
        body: {
            heading: Math.random() * 90.0,
            speed: 13.88 + 10.0 * Math.random(),
            latitude: latitude,
            longitude: longitude
        }
    });

    message.send(session, log);
}
