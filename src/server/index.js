var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3456, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
}

var backsIO = require('socket.io-client')
var backSocket = backsIO.connect('http://localhost:1234')

var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {

    console.log("new camera client: " + socket.id);

    socket.on('bloop', function(data) {
        backSocket.emit('bloop',{image: data.image})
    });

    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });
});
