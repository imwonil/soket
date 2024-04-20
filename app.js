const express = require("express") 
const http =require("http")
const app = express();

const server =http.createServer(app)
const socketIO = require("socket.io")

const io = socketIO(server); 

app.use(express.static(__dirname+'/src'));


//  const socket = io("http://yourserver.com");

 


io.on("connection" , (socket) => { //client 에서 보낸data 를 server 에서 받음
socket.on("chatting", (data)=> {
  console.log(data)
   io.emit("chatting", `그려${data}`) // server 에서   client쪽으로  data를 보냄

})

})
server.listen(3000, () => {



})