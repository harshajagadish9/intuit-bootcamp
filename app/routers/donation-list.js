module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		DonationRouter = express.Router();


	var donationSchema = mongoose.Schema({
		amount: Number,
		typeOfPayment: String,
		nameOnCard: String,
		cardNumber: Number,
		expirationDate: Date,
		cvv: Number,
		address: String
	});

	var DonationModel = mongoose.model("donation", donationSchema);

	DonationRouter.route("/donations")
		.get(function(req, res) {
			DonationModel.find({}, function(err, donation) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(donation);
			});
		});

	DonationRouter.route("/donation")
		.post(function(req, res) {
			var t = new DonationModel(req.body.donation);
			t.save(function(err, donation) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(donation);
			});
		});

	DonationRouter.route("/donation/:donationId")
		.get(function(req, res) {
			DonationModel.findById(req.params.donationId,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		})
		.put(function(req, res) {
			DonationModel.findByIdAndUpdate(req.params.donationId,
				req.body.donation,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		})
		.delete(function(req, res) {
			DonationModel.findByIdAndRemove(req.params.donationId,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		});


	return DonationRouter;
};