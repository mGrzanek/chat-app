const express = require('express');
const socket = require('socket.io');
const path = require('path');
const app = express();
const users = [];
const messages = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', (username) => {
        users.push({username, id: socket.id});
        console.log(`${username.name} has joined.`);
    });
     socket.on('message', (message) => { 
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => { 
        users.splice(users.findIndex(user => user.id === socket.id), 1);
         console.log(`Oh, ${socket.id} has left`);
    });
});