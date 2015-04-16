"use strict";

var 
	youngLady = Q.defer(),
	youngMan = youngLady.promise;


//ajax syntax
$.ajax({},function(){

});


youngMan.then(function(msg){
		console.log(msg)
		console.log("she said YES!");
	},function(){
		console.log("she said NO!");
});


setTimeout(function(){
	youngLady.reject();  //failure
	//youngLady.resolve(); //success
	//youngLady.resolve("my parents are making me wait"); //success
},2000);

console.log("young Man is waiting!");