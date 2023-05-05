
var listEl;
var buttonEl;
var timeStart = 75;
var questionsAnswer;
var questionsScore = 0;
var leaderBoard = [];
var x = 0;

var startButton = document.querySelector("#start-quiz");
var quizContainer = document.querySelector("#quiz-box");
var quizButton = document.querySelector(".btn");
var timer = document.querySelector("#timer");
var quizHeader = document.querySelector("#quiz-header");
var quizText = document.querySelector("#quiz-text");
var highScore = document.querySelector("#high-score");


var beginQuiz = function() {
    var startTime = setInterval(function(){
        if (timeStart <= -1 || x === 5) {
            clearInterval(startTime);
            endGame();
        } else {
            timer.textContent = timeStart;
        }
        timeStart--;
    }, 666);
    firstQuestion();
}

var firstQuestion = function() {
    if (x === 5) {
        return beginQuiz;
    }
    quizHeader.textContent = questions[x].title;
    quizText.textContent = '';
    startButton.remove();
    var listChoice = questions[x].choices;
    questionsAnswer = questions[x].alerts;
    for (var i = 0; i < 4; i++) {
        listEl = document.createElement("li");
        listEl.className = "btn-content";
        listEl.setAttribute("id", [i]);
        quizContainer.appendChild(listEl);
        buttonEl = document.createElement("button");
        buttonEl.className = "btn-quizbtn";
        buttonEl.setAttribute("id", [i]);
        buttonEl.textContent = listChoice[i];
        listEl.appendChild(buttonEl);
    }
}

var buttonHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn-quizbtn")) {
        if(targetEl.textContent === questionsAnswer) {
            questionsScore += 10;
            console.log(questionsScore);
        }
        else{
            timeStart -= 10;
            console.log(timeStart);
        };
        for (var i = 0; i < 4; i++) {
            var list = document.getElementById([i]);
            list.remove();
        }
        x++
        firstQuestion();
    }
    if (targetEl.matches(".btn-submit")) {
        submitInitials();
        
    }   

}

var endGame = function() {
    score = Math.max(0, timeStart + questionsScore);
    quizHeader.textContent = "Game Over";
    quizText.textContent = "Your Final Score:" + score;
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.className = "text-input";
    initials.setAttribute("placeholder", "Name");
    quizContainer.appendChild(initials);
    
    var submit = document.createElement("button");
    submit.className = "btn-submit";
    submit.setAttribute("id", "save-task");
    submit.setAttribute("type", "submit");
    submit.textContent = "Submit";
    quizContainer.appendChild(submit);
}


var submitInitials = function() {
    var submitInitials = document.querySelector(".text-input").value;
    var submitScore = score;
    var playerScore = {
        name: submitInitials,
        total: submitScore
    }
    leaderBoard.push(playerScore);
    localStorage.setItem("highScores", JSON.stringify(leaderBoard));
    
}

var getGame = function() {
    var savedScore = localStorage.getItem("highScores");
    if (!savedScore) {
        return false;
    }
    else{
        savedScore = JSON.parse(savedScore);
        for (var i = 0; i < savedScore.length; i++) {
            var leaderBoards = document.createElement("h2");
            leaderBoards.className = "scoreBoard";
            leaderBoards.textContent = "High Score:"
            highScore.appendChild(leaderBoards);
            var previousGame = document.createElement("p");
            previousGame.className = "prev-game";
            previousGame.textContent = savedScore[i].name + " : " + savedScore[i].total;
            highScore.appendChild(previousGame);
            
        }
    }
}


var questions = [
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        choices: {
            0: "var",
            1: "let",
            2: "class",
            3: `Both 'var' and 'let'`
        },
        alerts: `Both 'var' and 'let'`
    },
    {
        title: `What does the 'toLocateString()' method do in JS?`,
        choices: {
            0: "Returns a localised object representation",
            1: "Returns a parsed string",
            2: "Returns a localized string representation of an object",
            3: "None of the above"
        },
        alerts: "Returns a localized string representation of an object"
    },
    {
        title: "How do we write a comment in Javascript?",
        choices: {
            0: "||",
            1: "//",
            2: "#",
            3: "$   $"
        },
        alerts: "//"
    },
    {
        title: "Which of the following are not server-side Javascipt objects?",
        choices: {
            0: "Data",
            1: "FileUpload",
            2: "Function",
            3: "All of the above"
        },
        alerts: "All of the above"
    },
    {
        title: "Upon encountering empty statements, what does the Javascript interpreter do?",
        choices: {
            0: "Throws an error",
            1: "Ignores the statements",
            2: "Gives a warning",
            3: "None of the above"
        },
        alerts: "Ignores the statements"
    }
];

startButton.addEventListener("click", beginQuiz);
quizContainer.addEventListener("click", buttonHandler);

getGame();