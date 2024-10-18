// Помодоро Таймер

let pomodoro = document.getElementById("pomodoro-timer");
      let short = document.getElementById("short-timer");
      let long = document.getElementById("long-timer");
      let currentTimer = null;

      function showDefaultTimer() {
        pomodoro.style.display = "block";
        short.style.display = "none";
        long.style.display = "none";
      }

      showDefaultTimer();

      function hideAll() {
        let timers = document.querySelectorAll(".timer-display");
        timers.forEach((timer) => (timer.style.display = "none"));
      }

      document
        .getElementById("pomodoro-session")
        .addEventListener("click", function () {
          hideAll();

          pomodoro.style.display = "block";
          currentTimer = pomodoro;
        });
      document
        .getElementById("short-break")
        .addEventListener("click", function () {
          hideAll();

          short.style.display = "block";
          currentTimer = short;
        });
      document
        .getElementById("long-break")
        .addEventListener("click", function () {
          hideAll();

          long.style.display = "block";
          currentTimer = long;
        });

      let myInterval = null;

      function startTimer(timerdisplay) {
        if (myInterval) {
          clearInterval(myInterval);
        }

        timerDuration = timerdisplay
          .getAttribute("data-duration")
          .split(":")[0];
        console.log(timerDuration);

        let durationinmiliseconds = timerDuration * 60 * 1000;
        let endTimestamp = Date.now() + durationinmiliseconds;

        myInterval = setInterval(function () {
          const timeRemaining = new Date(endTimestamp - Date.now());

          if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerdisplay.textContent = "00:00";
            const alarm = new Audio(
              "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
            );
            alarm.play();
          } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`;
            console.log(formattedTime);
            timerdisplay.textContent = formattedTime;
          }
        }, 1000);
      }

      document.getElementById("start").addEventListener("click", function () {
        if (currentTimer) {
            startTimer(currentTimer);
            document.getElementById("timer-message").style.display = "none"; 
        } else {
            document.getElementById("timer-message").style.display = "block";
        }
    });

      document.getElementById("stop").addEventListener("click", function () {
        if (currentTimer) {
          clearInterval(myInterval);
        }
      });

// Ежедневные Задачи
const challenges = [
    "Решите 5 задач по математике.",
    "Прочитайте 10 страниц книги.",
    "Напишите краткое изложение новой темы.",
    "Выучите 3 новых слова на иностранном языке.",
    "Посмотрите короткое обучающее видео."
];

let tasksCompleted = localStorage.getItem('tasksCompleted') || 0;
document.getElementById('tasks-completed').textContent = tasksCompleted;

function generateChallenge() {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('daily-challenge').textContent = challenge;
}

function markTaskDone() {
    tasksCompleted++;
    localStorage.setItem('tasksCompleted', tasksCompleted);
    document.getElementById('tasks-completed').textContent = tasksCompleted;
    alert("Задание выполнено! Отличная работа!");
}

// Собственные задачи
function addCustomTask() {
    const taskText = document.getElementById('custom-task-input').value.trim();
    if (taskText) {
        const ul = document.getElementById('custom-task-list');
        const li = document.createElement('li');
        li.textContent = taskText;
        
        const btn = document.createElement('button');
        btn.textContent = "Выполнено";
        btn.classList.add('task-done');
        btn.onclick = function () {
            ul.removeChild(li);
            markTaskDone();
        };

        li.appendChild(btn);
        ul.appendChild(li);
        document.getElementById('custom-task-input').value = "";
    }
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
