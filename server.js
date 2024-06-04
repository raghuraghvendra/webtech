const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat message', (msg) => {
        const response = generateResponse(msg);
        io.emit('chat message', response);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function generateResponse(message) {
    const greetings = ['hi', 'hello', 'hey', 'what\'s up', 'howdy'];
    const casualResponses = ['Hi there!', 'Hello!', 'Hey!', 'Yo!', 'Hey, how can I help you?'];

    message = message.toLowerCase();

    if (greetings.includes(message)) {
        return casualResponses[Math.floor(Math.random() * casualResponses.length)];
    } else {
        return "I'm sorry, I didn't quite catch that. Can you please repeat?";
    }
}

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
