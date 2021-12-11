const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// public directory set-up
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

// template views set-up
const viewsDirectory = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", viewsDirectory);

// Partials set-up
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Yashjeet Singh",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Yashjeet Singh",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Yashjeet Singh",
        message: "This is the help page. We are happy to help you.",
    });
});

// // localhost:3000/
// app.get("", (req, res) => {
//     res.send("<h1>Hello Express!</h1>");
// });

// // localhost:3000/help
// app.get("/help", (req, res) => {
//     res.send({
//         name: "Yashjeet Singh",
//         age: 22,
//     });
// });

// // localhost:3000/about
// app.get("/about", (req, res) => {
//     res.send("<h1>About page</h1>");
// });

// localhost:3000/weather
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide a valid address.",
        });
    }

    const address = req.query.address;

    geocode.geocode(address, (error, response) => {
        if (error) {
            res.send({
                error,
            });
        } else {
            const { latitude, longitude, place } = response;
            forecast.forecast(latitude, longitude, (error, data) => {
                if (error) {
                    res.send({
                        error,
                    });
                } else {
                    res.send({
                        forecast: data,
                        location: place,
                        address: address,
                    });
                }
            });
        }
    });
});

// app.get("/products", (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "Please provide a search term",
//         });
//     }

//     console.log(req.query);
//     res.send({
//         products: [],
//     });
// });

app.get("/help/*", (req, res) => {
    res.render("help-error", {
        name: "Yashjeet Singh",
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        message: "This page doesn't exists.",
        name: "Yashjeet Singh",
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
