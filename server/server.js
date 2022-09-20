const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const os = require('os');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('A new user just connected');
     
    // this is what the server send to client
    // socket.emit('newMessage',{
    //     from:"Phan",
    //     text:"SHUIT THE FUCKV Up!"
    // })  
    socket.emit('newMessage',{
        from:"Admin",
        text:"Welcome to the chat app!!",
        createAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from:"Admin",
        text:"New user joined the chat",
        createAt: new Date().getTime()
    })
    socket.on('createMessage',(message)=>{
        console.log(`client message `,message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //         from: message.from,
        //         text: message.text,
        //         createAt: new Date().getTime()
        //     });
    });
    
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
        socket.broadcast.emit('newMessage',{
            from:"Admin",
            text:"User dissconnect the chat",
            createAt: new Date().getTime()
        })
    })
})
server.listen(port,()=>{
    console.log(`server chạy cổng ${port}`);
})