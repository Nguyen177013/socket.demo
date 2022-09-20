let socket = io();
socket.on('connect',async function(){
    console.log('Connected to server');
    // await socket.emit('createMessage',{
    //     from:"Luden",
    //     text:"Hello world!"
    // })
}); //this is what the client send to server
socket.on('disconnect',function(){
    console.log('disconnected from server');
})
socket.on('newMessage',function(message){
    console.log('server message ', message);
})