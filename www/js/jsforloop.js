var extend = function(d,s){
	for(var a in s){
		d[a]=s[a]
	}

}


var srcObj = {
	fname: "Nathan",	
	lname: "Kane",
	occupation: "XD"
};

var destObj = {

};


extend(destObj,srcObj);

console.dir(destObj);