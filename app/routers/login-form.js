module.exports = function(config) {

	var
	express = require("express"),
	mongoose = require("mongoose"),
	session = require('express-session'),
	passport = require("passport"),
	crypto = require("crypto"),
	csrf = require("csrf")(),
	app = express(),
	LoginRouter = express.Router();


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

	var loginSchema = mongoose.Schema({
		username: String,
		password: String
	});

	var LoginModel = mongoose.model("login", loginSchema);

	LoginRouter.route("/accounts/get-users")
	.get(function(req, res) {
		LoginModel.find({}, function(err, login) {
			if (err) {
				console.log(err);
				res.status(500).json(err);
				return;
			}
			res.json(login);
		});
	});

	LoginRouter.route("/account/authenticate")
	.post(function(req, res) {
		var passwordSalt = "mortonsalt";

		
		function sha1(value) {
			return crypto.createHash("sha1").update(value.toString()).digest("hex");
		}

		var passwordHashed = sha1(req.body.password + passwordSalt);

		console.log(req.body.username);
		console.log(req.body.password);
		console.log(passwordHashed);			

		LoginModel.findOne({username:req.body.username,password:passwordHashed},function(err,login){
			if (err) {
				console.dir(err);
				res.status(500).json(err);
				return;
			}			
			if(!login){
				res.status(500).json({ msg: "not found" });
				return;
			}
			req.login(login, function(err) {

				if (err) {
					console.dir(err);
					res.status(500).json(err);
					return;
				}

				csrf.secret().then(function(secret) {
					req.session.csrfSecret = secret;
					res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
					res.json(login);
				});

			});
		});

	});

	LoginRouter.route("/accounts/get-users/:username")
	.get(function(req, res) {
		LoginModel.findById(req.params.username,
			function(err, login) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(login);
			});
	})
	.put(function(req, res) {
		LoginModel.findByIdAndUpdate(req.params.username,
			req.body.login,
			function(err, login) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(login);
			});
	})
	.delete(function(req, res) {
		LoginModel.findByIdAndRemove(req.params.username,
			function(err, login) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(login);
			});
	});


	return LoginRouter;
};
