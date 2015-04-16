function Walk(){
	this.go= function(){
		console.log("walking");
	}

}

function DriveMyCar(){
	this.go= function(){
		console.log("driving car 1");
	}

}

function RideBlueBicycle(){
	this.go= function(){
		console.log("ride blue bike");
	}

}

function DriveMyCar2(){
	this.go= function(){
		console.log("driving2");
	}

}

function StealABike(){
	this.go= function(){
		console.log("stealing");
	}

}

function myFactory(methodOfTransport){

	switch(methodOfTransport){
		case "walk":
			return new Walk();
		case "drive":
			return new DriveMyCar();
		case "ride":
			return new RideBlueBicycle();
		case "steal":
			return new StealABike();

	}
}

var transport = myFactory("ride");
transport.go();