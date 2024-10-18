// Помодоро Таймер
let timer;
let timeLeft = 25 * 60;

function startPomodoro() {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                displayTime();
            } else {
                clearInterval(timer);
                alert("Время вышло! Сделайте короткий перерыв.");
            }
        }, 1000);
    }
}

function resetPomodoro() {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    displayTime();
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Ежедневные Задачи
const challenges = [
    "Решите 5 задач по математике.",
    "Прочитайте 10 страниц книги.",
    "Напишите краткое изложение новой темы.",
    "Выучите 3 новых слова на иностранном языке.",
    "Посмотрите короткое обучающее видео."
];

let tasksCompleted = 0;

function generateChallenge() {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('daily-challenge').textContent = challenge;
}

function markTaskDone() {
    tasksCompleted++;
    document.getElementById('tasks-completed').textContent = tasksCompleted;
    alert("Задание выполнено! Отличная работа!");
}

// Мотивационные Цитаты
const motivationalQuotes = [
    "Билл Гейтс: 'Не сравнивайте себя с кем-либо в этом мире. Если вы это делаете, вы оскорбляете себя.'",
    "Илон Маск: 'Когда что-то действительно важно, вы делаете это, даже если шансы не в вашу пользу.'",
    "Опра Уинфри: 'Чем больше вы хвалите и отмечаете свою жизнь, тем больше поводов для праздника.'",
    "Стив Джобс: 'Ваша работа займет большую часть жизни, и единственный способ быть по-настоящему довольным — делать то, что вы считаете великим делом.'",
    "Уоррен Баффет: 'Лучшая инвестиция, которую вы можете сделать, — это инвестиция в себя.'"
];

function generateMotivation() {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('quote').textContent = quote;
}

// Инициализация
window.onload = function() {
    resetPomodoro();
    generateChallenge();
    generateMotivation();
};
