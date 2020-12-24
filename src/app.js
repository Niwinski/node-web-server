const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicPath = path.join(__dirname, "..", "public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("index", { name: "Tom", title: "Weather" });
});
app.get("/about", (req, res) => {
    res.render("about", { name: "Tom", title: "About" });
});
app.get("/help", (req, res) => {
    res.render("help", {
        message: "rain in spain is mainly in the plains.",
        title: "Help Page",
        name: "bob",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("Must provide an address");
    }
    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send(error);
        }
        forecast(data.lat, data.long, (error, { temp, feel } = {}) => {
            if (error) {
                return res.send(error);
            }
            res.send({ address: req.query.address, temp: temp, feel: feel });
        });
    });

    //    res.send({ forecast: "50 degrees", location: req.query.address });
});

app.get("/products", (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send("Must have a search term");
    }
    res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        name: "Tom",
        title: "404",
        msg: "Help topic not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        name: "Tom",
        title: "404",
        msg: " no page like this bro!",
    });
});

app.listen(port, () => {
    console.log("start on port " + port);
});
