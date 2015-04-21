module.exports = function(config) {

	var
	express = require("express"),
	bodyParser = require("body-parser"),
	multer = require("multer"),
	mongoose = require("mongoose"),
	fs = require('fs'),
	app = express();

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

	app.use("/api", bodyParser.json());
	app.use("/api", require("./routers/transactions.js")(config));
	app.use("/api", require("./routers/contact.js")(config));
	app.use("/api", require("./routers/donation-list.js")(config));
	app.use("/api", require("./routers/gallery.js")(config));

	return app;

};
