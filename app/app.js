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
        csrf = require("csrf")(),
        app = express();

    var Promise = require("bluebird");

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });


    app.set("json replacer", function(key, value) {
        if (key === "__v") {
            return undefined;
        }
        return value;
    });

    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: "asecret"
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    mongoose.connect("mongodb://" +
        config.mongoServer.host + ":" +
        config.mongoServer.port + "/" +
        config.mongoServer.dbName);

    app.use("/api", bodyParser.json());
    // app.use("/api", require("./routers/transactions.js")(config));
    // app.use("/api", require("./routers/donation-list.js")(config));
    app.use("/api", require("./routers/login-form.js")(config));

    app.use("/api", function(req, res, next) {

        if (!req.user) {
            console.log("not a valid user");
            res.status(401).json({
                msg: 'not logged in'
            });
            return;
        }

        if (!csrf.verify(req.session.csrfSecret, req.get("X-CSRF-Token"))) {
            console.log("not a valid token");
            res.status(401).json({
                msg: 'not logged in'
            });
            return;
        }

        csrf.secret().then(function(secret) {
            req.session.csrfSecret = secret;
            res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
            next();
        });


    });

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



    //app.use("/api", bodyParser.urlencoded({ extended: true }));
    //app.use("/api", require("./routers/login-form.js")(config));
    app.use("/api", require("./routers/transactions.js")(config));
    app.use("/api", require("./routers/contact.js")(config));
    app.use("/api", require("./routers/donation-list.js")(config));
    app.use("/api", require("./routers/gallery.js")(config));



    app.use(express.static(config.httpServer.wwwRoot));

    return app;

};
