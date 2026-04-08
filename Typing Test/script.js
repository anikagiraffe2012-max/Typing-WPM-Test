const sentenceElement = document.getElementById('sentence');
const userInput = document.getElementById('userInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const resetBtn = document.getElementById('resetBtn');

let startTime = null;
let timerInterval = null
let currentSentence = sentenceElement.innerText;

function startTimer() {
    if (startTime != null) return;
    startTime = Date.now();

    timerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        timerElement.innerText = elapsedSeconds;
    }, 1000);
}

function stopTimer() {
    if (timerInterval != null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function calculateWPM() {
    const textTyped = userInput.value;
    const wordsTyped = textTyped.trim().split(/\s+/).length;
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const minutes = elapsedSeconds / 60;
    let wpm = 0
    if (minutes > 0) {
        wpm = Math.round(wordsTyped / minutes);
    }
    wpmElement.innerText = wpm;
}

function checkMatch() {
    const typed = userInput.value;
    if (typed === currentSentence) {
        stopTimer();
        calculateWPM();
        userInput.disabled = true;
        alert('You did it! Your typing speed is:'+ wpmElement.innerText + 'wpm');
    }
}

function resetTest() {
    stopTimer();
    startTime = null;
    userInput.disabled = false;
    userInput.value = '';
    timerElement.innerText = '0';
    wpmElement.innerText = '0'
}

userInput.addEventListener('input', () => {
    if (startTime === null) {
        startTimer();
    }
    checkMatch();
});

resetBtn.addEventListener('click', () => {
    resetTest();
});
