const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

absolutePath = __dirname + "/views/index.html";

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function simpleLogger(req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

app.get("/", (req, res) => {
	res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE == "uppercase") {
		res.json({ message: "HELLO JSON" });
	} else {
		res.json({ message: "Hello json" });
	}
});
app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.send({ time: req.time });
	}
);

app.get("/:word/echo", (req, res) => {
	res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
	var { first: firstName, last: lastName } = req.query;
	res.json({
		name: `${firstName} ${lastName}`,
	});
});

app.post("/name", (req, res) => {
	var { first: firstName, last: lastName } = req.body;
	res.json({
		name: `${firstName} ${lastName}`,
	});
});

module.exports = app;

module.exports = app;
