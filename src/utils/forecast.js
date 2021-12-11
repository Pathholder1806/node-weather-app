const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=de8485d8bc1225bd17c787cc0a2995fb&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if (response.body.error) {
            callback(
                response.body.error.code + ": " + response.body.error.info,
                undefined
            );
        } else {
            const responseBody = response.body;
            const str =
                responseBody.current.weather_descriptions[0] +
                ". It is currently " +
                responseBody.current.temperature +
                " degrees. But it feels like " +
                responseBody.current.feelslike +
                " degrees out.";
            callback(undefined, str);
        }
    });
};

module.exports = {
    forecast: forecast,
};
