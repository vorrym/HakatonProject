// Pomodoro Timer
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
                alert("Time's up! Take a short break.");
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

// Daily Challenges
const challenges = [
    "Solve 5 math problems.",
    "Read 10 pages of a book.",
    "Write a short summary of a topic you learned today.",
    "Practice a new word in a foreign language 10 times.",
    "Watch a short educational video."
];

function generateChallenge() {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('daily-challenge').textContent = challenge;
}

// Motivational Quotes
const motivationalQuotes = [
    "Bill Gates: 'Don't compare yourself with anyone in this world. If you do so, you are insulting yourself.'",
    "Elon Musk: 'When something is important enough, you do it even if the odds are not in your favor.'",
    "Oprah Winfrey: 'The more you praise and celebrate your life, the more there is in life to celebrate.'",
    "Steve Jobs: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.'",
    "Warren Buffett: 'The best investment you can make is in yourself.'"
];

function generateMotivation() {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('quote').textContent = quote;
}

// Initialize on load
window.onload = function() {
    resetPomodoro();
    generateChallenge();
    generateMotivation();
};
