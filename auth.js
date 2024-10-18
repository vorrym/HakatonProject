const usersFilePath = 'users.json';

// Функция для чтения данных из файла
async function readUsersFromFile() {
    const response = await fetch(usersFilePath);
    const data = await response.json();
    return data.users;
}

// Функция для записи данных в файл
async function writeUsersToFile(users) {
    const blob = new Blob([JSON.stringify({ users }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Регистрация ученика
document.getElementById('register-student-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;
    const parentUsername = document.getElementById('parent-username').value;

    const users = await readUsersFromFile();

    // Проверка на существование пользователя
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        document.getElementById('message').textContent = "Пользователь уже существует.";
        return;
    }

    // Добавление нового ученика
    const newStudent = { username, password, role: 'student', tasksCompleted: 0 };
    if (parentUsername) {
        const parent = users.find(u => u.username === parentUsername && u.role === 'parent');
        if (parent) {
            newStudent.parentUsername = parent.username; // Привязываем ученика к родителю
            parent.children = parent.children || [];
            parent.children.push(newStudent.username); // Добавляем ученика в список детей родителя
        } else {
            document.getElementById('message').textContent = "Родитель не найден.";
            return;
        }
    }
    users.push(newStudent);
    await writeUsersToFile(users);

    document.getElementById('message').textContent = "Регистрация ученика успешна!";
});

// Регистрация родителя
document.getElementById('register-parent-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('parent-username-reg').value;
    const password = document.getElementById('parent-password').value;

    const users = await readUsersFromFile();

    // Проверка на существование пользователя
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        document.getElementById('message').textContent = "Пользователь уже существует.";
        return;
    }

    // Добавление нового родителя
    const newParent = { username, password, role: 'parent', children: [] };
    users.push(newParent);
    await writeUsersToFile(users);

    document.getElementById('message').textContent = "Регистрация родителя успешна!";
});

// Авторизация пользователя
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = await readUsersFromFile();

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        document.getElementById('message').textContent = "Неверные учетные данные.";
        return;
    }

    // Успешный вход
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user-role').textContent = `Роль: ${user.role}`;
    document.getElementById('tasks-completed').textContent = user.tasksCompleted;
    document.getElementById('message').textContent = "Вход успешен!";
});

// Функция завершения задачи
function completeTask() {
    const username = document.getElementById('login-username').value;
    readUsersFromFile().then(users => {
        const user = users.find(u => u.username === username);
        if (user) {
            user.tasksCompleted++;
            document.getElementById('tasks-completed').textContent = user.tasksCompleted;

            // Сохраняем обновленные данные
            writeUsersToFile(users);
            alert("Задача выполнена!");
        }
    });
}
