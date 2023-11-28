// Create script.js 

let questions = [
    {
        prompt: `How many countries are in the African continent?`,
        choices: [
            "57 countries",
            "54 countries",
            "40 countries",
            "61 countries",
        ],
        answer: "54 countries",
    },

    {
        prompt: `The following countries are part of west Africa?`,
        choices: [
            "Kenya, Nigeria, Ethiopia, Mali, Madagascar",
            "Nigeria, Ethiopia, Mali, Madagascar, Cameroon",
            "Ethiopia, Mali, Madagascar, Cameroon, Malawi",
            "Mali, Nigeria, Cameroon, Senegal",
        ],
        answer: "Mali, Nigeria, Cameroon, Senegal",
    },

    {
        prompt: `Nelson Madiba Mandela was the first president of which African country?`,
        choices: [
            "Tanzania",
            "Guinea-Bissau",
            "Mozambique",
            "South Africa",
        ],
        answer: "South Africa",
    },

    {
        prompt: ` Which country in Africa do you find the Rwenzori mountains?`,
        choices: [
            "Mauritius",
            "Ethiopia",
            "Uganda",
            "Kenya",
        ],
        answer: "Uganda",
    },

    {
        prompt: `Which country in Africa is the largest by population?`,
        choices: [
            "South Africa",
            "Egypt",
            "Nigeria",
            "Senegal",
        ],
        answer: "Nigeria",
    },

    {
        prompt: ` Who is the current president of Kenya?`,
        choices: [
            "Uhuru Kenyatta",
            "William Ruto",
            "Raila Odinga",
            "Julius Malema",
        ],
        answer: "William Ruto",
    },

    {
        prompt: `Which country in Africa is the largest by land?`,
        choices: [
            "DR Congo",
            "South Africa",
            "Sudan",
            "Algeria",
        ],
        answer: "Algeria",
    },
];

// Obtain Dom Elements 

let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let optionsEl =
    document.querySelector("#choices");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// Start Quiz 
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage 

function quizStart() {
    timerId = setInterval(
        clockTick,
        1500
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-screen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Loop through array of questions and 
// Answers and create list with buttons 
function getQuestion() {
    let currentQuestion =
        questions[currentQuestionIndex];
    let promptEl =
        document.getElementById(
            "question-words"
        );
    promptEl.textContent =
        currentQuestion.prompt;
    optionsEl.innerHTML = "";
    currentQuestion.choices.forEach(
        function (option, i) {
            let optionBtn =
                document.createElement(
                    "button"
                );
            optionBtn.setAttribute(
                "value",
                option
            );
            optionBtn.textContent =
                i + 1 + ". " + option;
            optionBtn.onclick =
                questionClick;
            optionsEl.appendChild(
                optionBtn
            );
        }
    );
}

// Verify right answers and subtract 
// Time (10 seconds) for wrong answer, then go to next question 

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "Correct!";
        feedbackEl.style.color =
            "blue";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// Conclude quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz if timer reaches 0 

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score and user's name in local storage 

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Press enter to save users' score

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;

// Create highScore.js 

let scoresBtn = document.querySelector(
    "#view-high-scores"
);

// Rank previous scores in order by 
// Retrieving scores from localStorage 

function printHighscores() {
    let highscores =
        JSON.parse(
            window.localStorage.getItem(
                "highscores"
            )
        ) || [];
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    highscores.forEach(function (
        score
    ) {
        let liTag =
            document.createElement(
                "li"
            );
        liTag.textContent =
            score.name +
            " - " +
            score.score;
        let olEl =
            document.getElementById(
                "highscores"
            );
        olEl.appendChild(liTag);
    });
}

// Clear previous scores when users click clear 
function clearHighscores() {
    window.localStorage.removeItem(
        "highscores"
    );
    window.location.reload();
}
document.getElementById(
    "clear"
).onclick = clearHighscores;

printHighscores();
