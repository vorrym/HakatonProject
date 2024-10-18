// Регистрация пользователя
document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const registerMessage = document.getElementById('register-message'); // Элемент для вывода сообщения

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            registerMessage.textContent = "Регистрация успешна!"; // Успешная регистрация
            registerMessage.style.color = 'green';
        } else {
            registerMessage.textContent = data.detail; // Ошибка регистрации
            registerMessage.style.color = 'red';
        }
    } catch (error) {
        registerMessage.textContent = 'Ошибка: ' + error.message; // Ошибка сети или другая ошибка
        registerMessage.style.color = 'red';
    }
});

// Авторизация пользователя
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginMessage = document.getElementById('login-message'); // Элемент для вывода сообщения

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            loginMessage.textContent = "Авторизация успешна!"; // Успешная авторизация
            loginMessage.style.color = 'green';
        } else {
            loginMessage.textContent = data.detail; // Ошибка авторизации
            loginMessage.style.color = 'red';
        }
    } catch (error) {
        loginMessage.textContent = 'Ошибка: ' + error.message; // Ошибка сети или другая ошибка
        loginMessage.style.color = 'red';
    }
});
