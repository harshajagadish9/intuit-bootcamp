crypto = require("crypto")

function sha1(value) {
	return crypto.createHash("sha1").update(value.toString()).digest("hex");
}

