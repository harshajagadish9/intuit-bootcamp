

(function(){
	console.log("own js file loaded");
}());

var n = 3;
console.log(n);

console.log(typeof n);

n = true
console.log(typeof n);


n = "i am a string"
console.log(typeof n);

n = {}
// Object
console.log(typeof n);

n = []
// Object
console.log(typeof n);

n=1;

//IF anything u variable is not defined within a function, then we have it defined in the global scope as above


function myFunc(){
	var n=3;	
	var m=9;
}


// n will be 1 and not 3 since it will refer global variable
console.log(n);
console.log(window.m);


function myFunc2(){	
	console.log(Infinity + Infinity);
	console.log(Infinity === Infinity);
	console.log(NaN === NaN);
	var x= NaN;
	console.log(isNaN(x));
	console.log(typeof(NaN));
	console.log(typeof undefined);
}
myFunc2();


// What is an IIFE?

(function myFunc5(){
		var a=100;
		console.log("inside IFFE");
		console.log(a);
})();


//OR


(function(){
		var a=100;
		console.log("inside second IFFE");
		console.log(a);
})();


console.log("this is a log");
console.warn("this is a warn");
console.error("this is a error");
console.info("this is a info");

//count the number of time the function is defined.
console.count("myFunc");
console.trace("myFunc");

console.time("test");
console.timeEnd("test");

//Objects
var o = { 
     firstName : "Jake",
     lastName : "Watchel",
     age:16,
     dowork:function(){
     	console.log("doing some work - Jake");
     }
};

o.state="CA"; // add new property
delete o.age; //delete a age property


console.log(o);


Object.defineProperty(o,"title",{
	configurable:true,
	writable:true,
	value:"CEO",
	enumerable:true
});

o.title = "VP"

Object.preventExtensions(o);

//doesnt get added due to preventExtensions
o.phone = "1234";

console.log(o);



var baseObj = {};

Object.defineProperty(baseObj,"name",{
	configurable:true,
	writable:true,
	value:"Base Child",
	enumerable:true
});

var childObj = Object.create(baseObj)

childObj.name = "Child";

console.log (childObj.name);
console.log (baseObj.name);


var baseObj = {};

Object.defineProperty(baseObj,"name",{
	configurable:true,
	// writable:true,
	get:function(){
		console.log("get");
	},
	set:function(value){
		console.log("set");
	},
	enumerable:true
});

var childObj = Object.create(baseObj)

childObj.name = "Child";

console.log (childObj.name);
console.log (baseObj.name);






