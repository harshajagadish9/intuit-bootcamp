// CLOSURE EXAMPLE

console.log("i am here");

var x=0, y=0, funcs=[];

for(; x<5; x++){
	(function() {
		var t = x;
  		funcs.push(function(){
			console.log(t);
		});	
	}());
}

console.log(funcs);

for(; y<5; y++){	
	funcs[y]();	
}




console.log("i am here");

var x=0, y=0, funcs=[];

for(; x<5; x++){
	
	
  		funcs.push(function(){
			console.log(x);
	
	});
}

console.log(funcs);

for(; y<5; y++){	
	funcs[y]();	
}