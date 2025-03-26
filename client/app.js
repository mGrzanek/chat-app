const loginForm = document.getElementById('welcome-form');
const userNameInput = loginForm.querySelector('[id="username"]');
const messagesSection = document.getElementById('messages-section');
const messagesList = messagesSection.querySelector('.messages-section__list');
const addMessageForm  = document.getElementById('add-messages-form');
let userName;

const login = e => {
    e.preventDefault();
    if(userNameInput.value){
        userName = userNameInput.ariaValueMax;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else alert('Username required!');
};

loginForm.addEventListener('submit', function(e){
    login(e);
});