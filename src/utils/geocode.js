const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoieWFzaGplZXQxOCIsImEiOiJja3QxNnVmd2YwN2xtMzFwaHBpamQ5bXN6In0.jNqOVp4ykr9Fxa7BmfxWgQ&limit=1";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(
                "Unable to connect to the GeoLocation service!",
                undefined
            );
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (response.body.features.length === 0) {
            callback(
                "Unable to find coordinates try another search",
                undefined
            );
        } else {
            const fetchedData = response.body;
            const latLongValues = fetchedData.features[0].center;
            const longitude = latLongValues[0];
            const latitude = latLongValues[1];
            const place = fetchedData.features[0].place_name;

            const data = {
                latitude: latitude,
                longitude: longitude,
                place: place,
            };

            callback(undefined, data);
        }
    });
};

module.exports = {
    geocode: geocode,
};
