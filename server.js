var express = require('express');
var socket = require('socket.io');
const bodyParser = require('body-parser');
const cors =require('cors');
var fs = require('fs');
var app = express();
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(cors());
var roomList = [];
var users = ["0x0111", '0x3000'];
console.log("***************historique***************")
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var server = app.listen(port, function () {
  console.log("run server in port : " + port);
});
app.get("/data", function (req,res) {
  fs.readFile('Output.txt', 'utf8', function(err, data) {
      res.send(data);
  });   
});
app.get('/add',(req,res)=>{
   let nom =req.query.nom;
   console.log(nom+"ff");
  // fs.appendFile('Output.txt', "\r\n", (err) => {
  //     // In case of a error throw err. 
  //     if (err) throw err;
  // })
  fs.appendFile('Output.txt', "\r\n"+nom, (err) => {

  });
});
var io = socket(server);
io.on("connection", (socket) => {
    let data = " name :" + socket.id;
    // Write data in 'Output.txt' . 
  
    console.log("hey its one plus online id : " + socket.id);
    //addRoom
    socket.on("addRoom", (data) => {
        roomList.push(data);
        socket.emit("nbr", roomList.length);
    });
    //list room
    socket.on("getroomList", () => {
        socket.emit("roomList", roomList);
    });
    //join room
    socket.on('joinroom', function (data) {
        socket.nickname = data.name;
        var clientSocket = [];
        socket.join(data.room);
        var clients = io.sockets.adapter.rooms[data.room].sockets;
        //to get the number of clients
        var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
        for (var clientId in clients) {
            //this is the socket of each client in the room.
            clientSocket.push(io.sockets.connected[clientId].nickname);
        }
        if (data.change === 'ok') {
            roomList[data.table - 1].pool++;
            var data = { players: clientSocket }
            console.log(data);
            io.sockets.emit('players', data);
        }
    });
    socket.on('online', (data) => {
        console.log(data + ': online');
        users.push(data);
        console.log(users);
    });
    /********************users chat message*************** */
    socket.on('chat', (data) => {
        console.log(data);
        io.sockets.to(data.room).emit('chatrom', data);
        console.log("data passed : " + data.message);
    });
    //send number 
    socket.on('game', (data) => {
        io.sockets.to(data.room).emit('setnumber', data);
    });
    //send vs number 
    socket.on('vsnember', (data) => {
        io.sockets.to(data.room).emit('getvsnember', data);
        console.log("nbr*******");
        console.log(data.nbrvs);
    });
    io.sockets.emit('online2', users);
    //******************disconnect********************************** */
    socket.on('disconnect', async (datas) => {
        let data = datas;
        console.log("have disconect++++++++++++++++++: " + data);
        var i = await users.findIndex(async (x) => x === data);
        if (i > 1) {
            console.log("index of user have disconect " + i)
            users.splice(i, 1);
            io.sockets.emit('disconnect2', users);
            console.log(data + " disconnect");
            console.log("all users now :" + users);
        }
    });
    // setTimeout(() => {
    //   
    // }, 10000);
});
setInterval(() => {
    roomList.shift();
    console.log(roomList)
}, 86400000);

