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
    socket.on('join', name => {
        users.push({name, id: socket.id});
        socket.broadcast.emit('join', name);
    });
     socket.on('message', (message) => { 
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => { 
        const userToRemove = users.find(user => user.id === socket.id);
        if (userToRemove) {
            users.splice(users.indexOf(userToRemove), 1);
            socket.broadcast.emit('remove', userToRemove.name);
        } else console.log('User not exist');
    });
});