let usersData;

// Загружаем пользователей из JSON файла
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        usersData = data.users;
    })
    .catch(err => console.error(err));

// Обработчик авторизации
document.getElementById('auth-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Проверка пользователя в загруженном JSON
    const user = usersData.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        alert('Успешный вход!');
        document.getElementById('dashboard').style.display = 'block';
        if (role === 'student') {
            document.getElementById('student-view').style.display = 'block';
            document.getElementById('student-tasks-completed').textContent = user.tasksCompleted;
        } else if (role === 'parent') {
            document.getElementById('parent-view').style.display = 'block';
            const childUser = usersData.find(u => u.username === user.childUsername);
            document.getElementById('child-progress').textContent = `Выполнено задач ребёнком: ${childUser.tasksCompleted}`;
        }
    } else {
        alert('Неверные данные для входа.');
    }
});

// Функция завершения задачи для ученика
function completeTask() {
    const username = document.getElementById('username').value;
    const user = usersData.find(u => u.username === username && u.role === 'student');
    
    if (user) {
        user.tasksCompleted++;
        document.getElementById('student-tasks-completed').textContent = user.tasksCompleted;
        
        // Сохранение изменений в JSON на сервере не происходит, но можно сделать это с помощью локального сервера (например, на Node.js)
        alert("Задача выполнена!");
    }
}
