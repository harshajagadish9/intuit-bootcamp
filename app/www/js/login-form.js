document.getElementById("loginSubmit").addEventListener("click", function(){
	var xhr = new XMLHttpRequest();	
	var uname = document.getElementById("email").value;
	var pwd = document.getElementById("password").value;
	console.log("uname " + uname + " and password are" + pwd);
	data = {'username': uname , 'password': pwd}
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var o = JSON.parse(xhr.responseText)
			console.log(o);
		}
	};
	xhr.open("POST", "/api/account/authenticate");		
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(data));
});