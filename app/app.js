module.exports = function(config) {

	var
	express = require("express"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	mongoose = require("mongoose"),
	session = require('express-session'),
	passport = require("passport"),
	crypto = require("crypto"),
	fs = require('fs'),
	app = express();

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret : "asecret"
	}));


	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);


	console.log(config.httpServer.wwwRoot);

	app.use(express.static(config.httpServer.wwwRoot));


	app.use(multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));

	app.post("/uploads", function(req, res) {

		console.dir(req);

		res.json({
			msg: "received"
		});

	});

	app.use(passport.initialize());
	app.use(passport.session());


	app.use("/api", bodyParser.json());
	app.use("/api", require("./routers/transactions.js")(config));
	app.use("/api", require("./routers/contact.js")(config));
	app.use("/api", require("./routers/donation-list.js")(config));
	app.use("/api", require("./routers/gallery.js")(config));
	app.use("/api", require("./routers/login-form.js")(config));

	


	return app;

};
