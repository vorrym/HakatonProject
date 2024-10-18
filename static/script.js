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
const challengesRussian = [
  "9 задание. Правописание корней",
  "10 задание. Правописание приставок",
  "11 задание. Правописание суффиксов",
  "12 задание. Правописание глаголов",
  "13 задание. Правописание не и ни",
  "14 задание. Слитное, дефисное написание",
  "15 задание. Правописание Н и НН",
  "16 задание. Пунктуация ССП",
  "17 задание. Обособленные члены",
  "18 задание. Знаки препинания при конструкциях",
  "19 задание. Знаки препинания в СПП",
  "20 задание. Знаки препинания в предложениях с разными видами связи",
  "21 задание. Пунктуационный анализ. Тире, двоеточие",
  "7 задание. Морфологические нормы",
  "8 задание. Синтаксические нормы",
  "4 задание. Ударения",
  "5 задание. Паронимы",
  "Повторить орфографию. Решение заданий 9-15",
  "6 задание. Плеоназмы",
  "1 задание. Главная информация в тексте",
  "2 задание. Средства связи",
  "3 задание. Лексическое значение слова",
  "22 задание. Смысловой анализ текста",
  "23 задание. Типы речи",
  "24 задание. Синонимы, антонимы. Лексическое значение слова",
  "25 задание. Средства связи предложений",
  "26 задание. Языковые средства выразительности",
  "Повторить пунктуацию. Решение заданий 16-21",
  "Повторить орфографию. Решение заданий 9-15",
  "Повторить пунктуацию. Решение заданий 16-21",
  "4 задание. Ударения",
  "5 задание. Паронимы",
  "Повторить Работу над текстом",
  "Комплексное повторение",
  "Решение теста - все задания",
  "Сочинение"
];

const challengesMath = [
  "Задание 04. Определение вероятностей",
  "Задание 05. Теория вероятностей",
  "Задание 06. Простейшие уравнения",
  "Задание 07. Значение выражения",
  "Задание 08. Производная и первообразная",
  "Задание 09. Задачи с прикладным содержанием",
  "Задание 10. Текстовые задачи",
  "Задание 11. Функции",
  "Задание 12. Исследование функций",
  "Задание 13. Уравнения",
  "Задание 15. Неравенства",
  "Задание 16. Финансовая математика",
  "Задание 18. Параметры",
  "Задание 19. Числа и их свойства",
  "Геометрия",
  "Задание 01. Планиметрия",
  "Задание 02. Векторы",
  "Задание 03. Стереометрия",
  "Задание 14. Стереометрическая задача",
  "Задание 17. Планиметрическая задача"
];
// Функция для генерации нового задания
function generateChallenge() {
  const challengeType = document.getElementById("challenge-type").value;
  let challenges = challengeType === "math" ? challengesMath : challengesRussian;

  if (challenges.length === 0) {
      document.getElementById("daily-challenge").innerText = "Все задания выполнены!";
      return;
  }

  const randomIndex = Math.floor(Math.random() * challenges.length);
  currentChallenge = challenges[randomIndex];

  // Удаляем задание из массива (если не нужно удалять задания, уберите эту строку)
  // challenges.splice(randomIndex, 1);

  // Обновляем текст задания
  document.getElementById("daily-challenge").innerText = currentChallenge;
}

// Функция для отметки задания как выполненного
function markTaskDone() {
  if (currentChallenge === "") {
      alert("Сначала выберите задание!");
      return;
  }

  completedTasks++;
  document.getElementById('tasks-completed').textContent = completedTasks;
  alert("Задание выполнено! Отличная работа!");

  // Очищаем текущее задание после выполнения
  currentChallenge = "";
  document.getElementById("daily-challenge").innerText = "Выберите новое задание!";
}

//function markTaskDone() {
//    tasksCompleted++;
//    localStorage.setItem('tasksCompleted', tasksCompleted);
//    document.getElementById('tasks-completed').textContent = tasksCompleted;
//    alert("Задание выполнено! Отличная работа!");
//}

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
    generateChallenge();
    generateMotivation();
};
