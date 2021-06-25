const socket = io.connect("http://localhost:3000");

socket.on("message_come",data => {
	document.querySelector("#messages").innerHTML += `<p><img width="25" height="25" style="border-radius:5px;" src="${data.author.displayAvatarURL.replace("webp","gif")}"><span style="color:white;"><b>${data.author.tag}</b></span> : <b>${data.content}</b></p>`;
	document.querySelector("#messages").scrollTo(0,50000000);	
});

document.querySelector("#message_button").onclick = function () {
	var text = document.querySelector("#message_box").value;
	if(!text) return alert("Lütfen bir yazı girin.");
	socket.emit("message_send",text);
	document.querySelector("#message_box").value = "";
};

document.querySelector("#message_box").onkeypress = function(event) {
	if(event.keyCode == 13){
		var text = document.querySelector("#message_box").value;
		if(!text) return alert("Lütfen bir yazı girin.");
		socket.emit("message_send",text);
		document.querySelector("#message_box").value = "";
	};
};
