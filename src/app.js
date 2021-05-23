const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();

const port = process.env.PORT || 3000

// Define paths for express config
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

// app.com

app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Weather App",
    author: "umr",
  });
});

app.get("/help", (req, res, next) => {
  res.render("help", {
    title: "Help",
    author: "umr",
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About",
    author: "umr",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address!" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, logitude, location } = {}) => {
        if (error) {
          res.send({ error });
        }
        forecast(latitude, logitude, (error, forecastData) => {
          if (error) {
            res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  req.query;
});

app.get("*", (req, res) => {
  res.send("My 404");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
