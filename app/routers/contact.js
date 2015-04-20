module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		ContactRouter = express.Router();


	var contactSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		email: String,
		phone: Number,
		comments: String,
		bestWaytoContact: String
	});

	var ContactModel = mongoose.model("contact", contactSchema);

	ContactRouter.route("/contacts")
		.get(function(req, res) {
			ContactModel.find({}, function(err, contact) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(contact);
			});
		});

	ContactRouter.route("/contact")
		.post(function(req, res) {
			var t = new ContactModel(req.body.contact);
			t.save(function(err, contact) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(contact);
			});
		});

	ContactRouter.route("/contact/:contactId")
		.get(function(req, res) {
			ContactModel.findById(req.params.contactId,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		})
		.put(function(req, res) {
			ContactModel.findByIdAndUpdate(req.params.contactId,
				req.body.contact,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		})
		.delete(function(req, res) {
			ContactModel.findByIdAndRemove(req.params.contactId,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		});


	return ContactRouter;
};