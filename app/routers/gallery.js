module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		GalleryRouter = express.Router();


	var gallerySchema = mongoose.Schema({
		title: String,
		dateAdded: Date,
		category: String,
		author: String,
		route: String,
		content: Number		
	});

	var GalleryModel = mongoose.model("gallery", gallerySchema);

	GalleryRouter.route("/gallery-list")
		.get(function(req, res) {
			GalleryModel.find({}, function(err, gallery) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(gallery);
			});
		});

	GalleryRouter.route("/gallery")
		.post(function(req, res) {
			var t = new GalleryModel(req.body.gallery);
			t.save(function(err, gallery) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(gallery);
			});
		});

	GalleryRouter.route("/gallery/:galleryId")
		.get(function(req, res) {
			GalleryModel.findById(req.params.galleryId,
				function(err, gallery) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(gallery);
				});
		})
		.put(function(req, res) {
			GalleryModel.findByIdAndUpdate(req.params.galleryId,
				req.body.gallery,
				function(err, gallery) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(gallery);
				});
		})
		.delete(function(req, res) {
			GalleryModel.findByIdAndRemove(req.params.galleryId,
				function(err, gallery) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(gallery);
				});
		});


	return GalleryRouter;
};