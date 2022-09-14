const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
server.listen(3000,()=>{
    console.log('kết nối tại cổng 3000');
})
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
io.on('connection',(socket)=>{
    socket.broadcast.emit('hi');
    console.log('user connected');
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg)
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index');
})