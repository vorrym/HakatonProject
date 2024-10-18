// auth.js

// Импортировать данные пользователей из JSON-файла
let users = [];
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data.users; // Предполагаем, что данные находятся в массиве users
    });

// Функция для сохранения пользователей в JSON-файл (для демонстрационных целей)
function saveUsers() {
    const blob = new Blob([JSON.stringify({ users }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();
}

// Регистрация ученика
document.getElementById('register-student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;
    const parentUsername = document.getElementById('parent-username').value;

    // Проверка уникальности имени пользователя
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        document.getElementById('message').textContent = "Имя пользователя занято. Пожалуйста, выберите другое.";
        return;
    }

    // Добавление нового пользователя
    const newUser = {
        username: username,
        password: password,
        role: 'student',
        parentUsername: parentUsername || null
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Сохраняем пользователей в localStorage
    document.getElementById('message').textContent = "Регистрация успешна!";

    // Очистка полей ввода
    document.getElementById('student-username').value = '';
    document.getElementById('student-password').value = '';
    document.getElementById('parent-username').value = '';
});

// Регистрация родителя
document.getElementById('register-parent-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('parent-username-reg').value;
    const password = document.getElementById('parent-password').value;

    // Проверка уникальности имени пользователя
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        document.getElementById('message').textContent = "Имя пользователя занято. Пожалуйста, выберите другое.";
        return;
    }

    // Добавление нового родителя
    const newParent = {
        username: username,
        password: password,
        role: 'parent'
    };

    users.push(newParent);
    saveUsers(); // Сохранить данные в файл
    document.getElementById('message').textContent = "Регистрация успешна!";

    // Очистка полей ввода
    document.getElementById('parent-username-reg').value = '';
    document.getElementById('parent-password').value = '';
});

// Вход в систему
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Поиск пользователя
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        document.getElementById('message').textContent = "Добро пожаловать, " + username + "!";
        document.getElementById('user-role').textContent = "Ваша роль: " + user.role;
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('modal').style.display = 'none';
    } else {
        document.getElementById('message').textContent = "Неверное имя пользователя или пароль.";
    }

    // Очистка полей ввода
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
});
