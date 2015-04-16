var stringBuilder = {
	buffer:[],
	appendString: function(string){
		this.buffer.push(string);
		return this;
	},
	toString: fucntion(){
		return this.buffer.join("");
	}
}

stringBuilder.appendString("Hello ");
stringBuilder.appendString("World");
stringBuilder.toString();