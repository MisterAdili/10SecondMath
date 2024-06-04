$(document).ready(function(){
  document.getElementById('answer').focus();
  const question = document.getElementById('question');
  var a;
  var b;
  var score = 0;
  var scoreHTML = document.getElementById("score");
  var answer = document.getElementById('answer');
  var answer1 = '';
  var answer2 = '';
  var answer3 = '';
  var timerSpan = document.body.querySelector("#timer");
  var seconds = 10;
  var timer = null;
  var highScoreHTML = document.getElementById('highScore');
  var highScore = 0;
  var gameOn = false;
  var startButton = document.getElementById('startButton');
  var numberLimit = document.getElementById('numberLimit').value;
  
  function newQuestion() {
    a = Math.floor(numberLimit * Math.random())+1;
    b = Math.floor(numberLimit * Math.random())+1;
    question.innerHTML = a +' + '+ b+' = ?' ;
  }

  $("#answer").on("keyup", function(){
    if (gameOn == true && answer.value == a + b){
      answer.value = "";
      score+=1;
      scoreHTML.innerHTML = score;
      seconds +=1;
      timerSpan.innerHTML = seconds;
      newQuestion();
    }
    if(answer.value.length > (a+b).toString().length){
      answer.value = "";
    }
  });

  var stopGame = function(){
    gameOn = false;
    startButton.innerHTML = "Start Game"
    window.clearInterval(timer);
    timer = null;
    if (score > highScore){
      highScore = score;
      highScoreHTML.innerHTML = highScore;
    }
    score = 0;
    scoreHTML.innerHTML = score;
    a = null;
    b = null;
    question.innerHTML = "Game Over. Start Again.";
  }

  var startTimer = function() {
    if(!timer){
      seconds = 10;
      timerSpan.innerHTML = seconds;
      timer = setInterval(function (){
        document.getElementById('answer').focus();
        seconds -= 1;
        timerSpan.innerHTML = seconds;
        if (seconds == 0){
          stopGame();
        }
      },1000);
    }
  };
  
  answer.value = "";
  scoreHTML.innerHTML = score;
  highScoreHTML.innerHTML = highScore;
  timerSpan.innerHTML = seconds;

  $('#startButton').on('click', function (){
    if (gameOn == false){
      gameOn = true;
      this.innerHTML = "Stop Game";
      numberLimit = document.getElementById('numberLimit').value;
      newQuestion();
      startTimer();
      document.getElementById('answer').focus();
    }
    else if (gameOn == true){
      stopGame();
    }
  });
    
});
