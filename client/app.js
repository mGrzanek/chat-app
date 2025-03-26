const loginForm = document.getElementById('welcome-form');
const userNameInput = loginForm.querySelector('[id="username"]');
const messagesSection = document.getElementById('messages-section');
const messagesList = messagesSection.querySelector('.messages-section__list');
const addMessageForm  = document.getElementById('add-messages-form');
const messageContentInput = addMessageForm.querySelector('#message-content');
const socket = io();
let userName;

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', (name) => addMessage('Chat Boot', `${name} has joined the conversation!`));
socket.on('remove', (userToRemove) => addMessage('Chat Boot', `Oh, ${userToRemove} has left the conversation... :(`));

const login = e => {
    e.preventDefault();
    if(userNameInput.value){
        userName = userNameInput.value;
        socket.emit('join', userName);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else alert('Username required!');
};

const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
        <h3 class="message__author">${(author === userName ? 'You' : author)}</h3>
        <div class="message__content ${author === 'Chat Boot' ? 'chat__content' : ''}">${content}</div>
    `;
    messagesList.appendChild(message);
};

const sendMessage = e => {
    e.preventDefault();
    if(messageContentInput.value){
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value});
        messageContentInput.value = '';
    } else alert('Empty message!');
};

loginForm.addEventListener('submit', function(e){
    login(e);
});

addMessageForm.addEventListener('submit', function(e) {
    sendMessage(e);
});