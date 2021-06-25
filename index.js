//<---------------Modüller----------------->
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Discord = require("discord.js");
const client = new Discord.Client();
//<---------------Modüller----------------->

//<---------------Ayarlar----------------->
app.set('views','./src');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/src'));
server.listen(3000);
client.login("");
var kanal_id;
//<---------------Ayarlar----------------->

app.get("/",(req,res)=>{
	kanal_id = req.query.kanal;
	res.render("index",{channel_name:client.channels.cache.get(kanal_id).name});
});

io.on("connection",(socket) => {
	socket.on("message_send",data => {
		if(!client.channels.cache.array().find(c=>c.id == kanal_id)) return false;
		client.channels.cache.get(kanal_id).send(data);
	});

	socket.on("channel_change",data => {
		kanal_id = data;
	});
});

client.on("message",message=>{	
	if(message.channel.id == kanal_id){
		io.sockets.emit("message_come",{
			content : message.content,
			author : message.author
		});
	};
});
