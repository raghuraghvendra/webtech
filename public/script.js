document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const messageList = document.getElementById('message-list');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message !== '') {
            appendMessage('You', message);
            socket.emit('chat message', message);
            messageInput.value = '';
        }
    });

    socket.on('chat message', (msg) => {
        appendMessage('Chatbot', msg);
    });

    function appendMessage(sender, message) {
        const li = document.createElement('li');
        li.textContent = `${sender}: ${message}`;
        messageList.appendChild(li);
        messageList.scrollTop = messageList.scrollHeight;
    }
});
