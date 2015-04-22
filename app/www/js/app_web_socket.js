function webClient(url){

	var ws = new WebSocket(url);

	var p = new Promise(function(resolve, reject){
		ws.addEventListener("open", function() {
			resolve(msg);
		}	
	});
	p.then({
		
	})

}



ws.addEventListener("open", function() {
	ws.send(JSON.stringify({
		messageType: "error",
		errorMessage: "error message"

	}));
});

ws.addEventListener("message", function(msg) {
	console.log("message received: " + msg.data);
	console.dir(JSON.parse(msg.data));
});

ws.addEventListener("error", function(err) {
	console.log("err received: " + JSON.stringify(err));
});