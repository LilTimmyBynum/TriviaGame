//set start of qCount
var qCount;

//current correct answer array/button position
var correctAns;

var correctAnswerCount;
var wrongAnswerCount;
var unansweredCount;


var trivia = [
    ["In \"The Five Deadly Venoms\" who were the first two venoms to fight each other?", 4, ["Centipede vs Lizard",
        "Scorpion vs Toad",
        "Snake vs Lizard",
        "Toad vs Centipede"
    ]],
    ["In what movie did Bruce Lee kill Chuck Norris?", 4, ["Crouching Tiger, Hidden Dragon",
        "Enter the Dragon",
        "The Last Dragon",
        "Way of the Dragon"
    ]],
    ["In \"Kid with the Golden Arm\" how many total members were in the crew led by Golden Arm ?", 3, ["9",
        "5",
        "4",
        "7"
    ]],
    ["How many chambers does a pupil have to get through in the Shoalin Temple ?", 2, ["9",
        "36",
        "15",
        "44"
    ]],
    ["Who left their mark on Bruce Lee\'s chest?", 2, ["Chuck Norris",
        "Kareem Abdul Jabbar",
        "Bolo",
        "Jim Kelly"
    ]],
    ["Who did NOT star in \"The Man with the Iron Fists\"?", 1, ["Donnie Yen",
        "Dave Bautista",
        "Cung Le",
        "Russell Crowe"
    ]],
    ["What was the name of the gang led by Golden Arm in \"Kid with the Golden Arm\"?", 3, ["Kill La Crew",
        "Furious Five",
        "Chi Sha Gang",
        "Invincibles"
    ]]
];

function hideGameStuff() {
    $("#display").hide();
    $("#theQuestion").hide();
    $("#option0").hide();
    $("#option1").hide();
    $("#option2").hide();
    $("#option3").hide();
    $("#message").hide();
}

function showGameStuff() {
    $("#display").show();
    $("#theQuestion").show();
    $("#option0").show();
    $("#option1").show();
    $("#option2").show();
    $("#option3").show();
    $("#message").show();
}

function hideStats() {
    $("#scoreTitle").hide();
    $("#correctAns").hide();
    $("#wrongAns").hide();
    $("#unAns").hide();
    $("#restart").hide();
}

function showStats() {
    $("#scoreTitle").show();
    $("#correctAns").show();
    $("#wrongAns").show();
    $("#unAns").show();
    $("#restart").show();

    $("#correctAns").html("Correct answers:  " + correctAnswerCount);
    $("#wrongAns").html("Wrong answers:  " + wrongAnswerCount);
    $("#unAns").html("Unanswered:  " + unansweredCount);
    $("#restart").html();
}

function checkStats() {
    qCount++;

    console.log("correctAnswerCount    " + correctAnswerCount);
    console.log("wrongAnswerCount       " + wrongAnswerCount);
    console.log("unansweredCount         " + unansweredCount);

    if (qCount < trivia.length) {
        nextQuestion();

    } else {
        // at the end of the trivia array .....remove remaining questions and show stats
        hideGameStuff();
        showStats();
    };
};

function getQandA(data) {
    $("#theQuestion").html(trivia[qCount][0]);

    correctAns = (trivia[qCount][1]) - 1;

    $("#option0").html(trivia[qCount][2][0]);
    $("#option1").html(trivia[qCount][2][1]);
    $("#option2").html(trivia[qCount][2][2]);
    $("#option3").html(trivia[qCount][2][3]);
};

function disableButtons() {
    $("#option0").attr("disabled", true);
    $("#option1").attr("disabled", true);
    $("#option2").attr("disabled", true);
    $("#option3").attr("disabled", true);
}

function enableButtons() {
    $("#option0").attr("disabled", false);
    $("#option1").attr("disabled", false);
    $("#option2").attr("disabled", false);
    $("#option3").attr("disabled", false);
}

function greenBack() {
    // sets correct answer background to green
    var back = ("#option" + correctAns);
    $(back).css('background-color', 'green');
}

function timesUp() {
    clearInterval(intervalId);
    clockRunning = false;
    greenBack();
    disableButtons();
    $("#message").html("Time is up !!!");
    setTimeout(checkStats, 3000); // set back to 3 secs ------------------------------------
    unansweredCount++;
}

function checkAnswer() {
    disableButtons();

    clearInterval(intervalId);
    clockRunning = false;

    // check against correctAnswer
    var tempAns = this.id;

    if (tempAns.includes(correctAns.toString())) {
        $("#message").html("Correct !");
        correctAnswerCount++;
    } else {
        $(this).css('background-color', 'red');
        $("#message").html("WRONG !!");
        wrongAnswerCount++;
    };

    greenBack();
    // start delay counter and then go to checkStats() 
    setTimeout(checkStats, 3000);
}; // end of checkAnswer function

// --------------------------- the real beginning of game logic ----------------------------
function gameStart() {
  $("#startGame").hide();

    qCount = 0;

    correctAnswerCount = 0;
    wrongAnswerCount = 0;
    unansweredCount = 0;

    hideStats();
    showGameStuff();
    nextQuestion();
};

function nextQuestion() {
    $("#message").html("");

    getQandA(qCount);
    
    $("#option0").css('background-color', '#7FFFD4');
    $("#option1").css('background-color', '#7FFFD4');
    $("#option2").css('background-color', '#7FFFD4');
    $("#option3").css('background-color', '#7FFFD4');

    enableButtons();

    // start question timer
    myTimer.reset();
    myTimer.start();
};
var intervalId;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;

var myTimer = {
    time: 3,
    reset: function() {
        myTimer.time = 10;
        
        //Change the "display" div to "00:10"....make it a real challenge !!!!!!!
        $("#display").html("Time remaining: 00:10 Seconds");        
    },
    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(myTimer.count, 1000);
            clockRunning = true;
        }
    },
    count: function() {
        // decrease time by 1 
        myTimer.time--;
        // convert time and save current time in a variable
        var converted = myTimer.timeConverter(myTimer.time);
        if (myTimer.time == 0) {
            timesUp();
        };
        $("#display").html("Time remaining: " + converted + " Seconds");
    },
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};

// This code will run as soon as the page loads
window.onload = function() {
    $("#resetTimer").on("click", myTimer.reset);
    $("#startTimer").on("click", myTimer.start);

    $("#option0").on("click", checkAnswer);
    $("#option1").on("click", checkAnswer);
    $("#option2").on("click", checkAnswer);
    $("#option3").on("click", checkAnswer);

    // game start button
    $("#startGame").on("click", gameStart);
    $("#restart").on("click", gameStart);

    // setup answer buttons
    enableButtons();

    //hide stats
    hideStats();
};
