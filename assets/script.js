var timerEl = document.querySelector('.timer');
var wrongBtn = document.querySelectorAll('.wrong');
var correctBtn = document.querySelectorAll('.correct');
var startEl = document.getElementById('startBTN');
var viewLB = document.getElementById('leaderBoard');
var resetQuiz = document.getElementById('resetBTN');
var questionPage = document.getElementById('section1');
var Q1 = document.getElementById('question1');
var Q2 = document.getElementById('question2');
var Q3 = document.getElementById('question3');
var endQ = document.getElementById('end');
var wrongDisplay = document.getElementById('wrongDisplay');
var correctDisplay = document.getElementById('correctDisplay');
var userInput = document.getElementById('submitBtn');
var highScore = document.getElementById('highScore');
var clearLB = document.getElementById('clearLB');
var disablesubmit = document.getElementById('initials');
var leaderboardLocal = JSON.parse(localStorage.getItem('leaderboardLocal'));
var timeLeft = 75;
var correctGuesses = 0;
var questionNum = 3;
var score;
var listofScores = {  
  newScore: [],
  initials: []
};

if (leaderboardLocal === null) {
    localStorage.setItem('leaderboardLocal', JSON.stringify(listofScores));
  } else {
    for (var i = leaderboardLocal.newScore.length - 1; i >= 0; i--) {
      if (leaderboardLocal.newScore[i] < leaderboardLocal.newScore[i + 1]) {
        [leaderboardLocal.newScore[i], leaderboardLocal.newScore[i + 1]] = [leaderboardLocal.newScore[i + 1], leaderboardLocal.newScore[i]];
        [leaderboardLocal.initials[i], leaderboardLocal.initials[i + 1]] = [leaderboardLocal.initials[i + 1], leaderboardLocal.initials[i]];
      }
    }
    for (var x = 0; x < leaderboardLocal.initials.length; x++) {
      listofScores.initials.push(leaderboardLocal.initials[x]);
      listofScores.newScore.push(leaderboardLocal.newScore[x]);
    }
    console.log(leaderboardLocal);
  }
  
function clearlist(event) {
  event.preventDefault();
  localStorage.clear();
  while( highScore.firstChild ){
    highScore.removeChild( highScore.firstChild );
  }
};

function formSubmission(event) {
  event.preventDefault();
  var initial = document.getElementById('initials').value;
  var li = document.createElement('li');
  score = timeLeft * correctGuesses;
  if(initial) {
    listofScores.initials.push(initial);
    listofScores.newScore.push(score);
  }
  localStorage.setItem('leaderboardLocal', JSON.stringify(listofScores));
  var appendScore = initial + '->'  + ' Score: ' + score;
  
  if (!initial) {
    return;
  }
  
  highScore.appendChild(li);
  li.append(appendScore);
  disablesubmit.disabled = true;
  userInput.disabled = true;
};

  function startQuiz() {
  viewLB.disabled = true;
  disablesubmit = false;
  userInput.disabled = false;
  startEl.style.display = 'none';
  
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = 'Time:' + timeLeft;

    if (timeLeft !== 0 && questionNum === 0) {
      clearInterval(timeInterval);
      viewLB.disabled = false;
      var el = document.querySelector('.show');
      el.classList.remove('show');
      endQ.classList.add('show');
      score = timeLeft * correctGuesses;
      return;
    } else if (timeLeft === 0 && questionNum > 0) {
      clearInterval(timeInterval);
      viewLB.disabled = false;
      var el = document.querySelector('.show');
      el.classList.remove('show');
      endQ.classList.add('show');
      score = timeLeft * correctGuesses;
      return;
    } 
  }, 1000);

  questionPage.style.display = 'none';
  Q1.classList.add('show');
  
  function incorrect() {
    timeLeft = timeLeft - 10;
    timerEl.textContent = 'Time:' + timeLeft;
    questionNum--;
    console.log(questionNum);
    wrongDisplay.classList.add('show');
    if(questionNum === 2 && timeInterval !== 0) {
      Q1.classList.remove('show');
      Q2.classList.add('show');
    } else if(questionNum === 1 && timeInterval !== 0) {
      Q2.classList.remove('show');
      Q3.classList.add('show')
    } else if (questionNum === 0 && timeInterval !== 0) {
      setTimeout(() => {
        Q3.classList.remove('show');
        endQ.classList.add('show');
      }, 800);
    }
    setTimeout(() => {
      wrongDisplay.classList.remove('show');
        }, 800);
    };

    function correct() {
      questionNum--;
      correctGuesses++;
      console.log(questionNum);
      correctDisplay.classList.add('show');
      if(questionNum === 2 && timeInterval !== 0) {
        Q1.classList.remove('show');
        Q2.classList.add('show');
      } else if(questionNum === 1 && timeInterval !== 0) {
        Q2.classList.remove('show');
        Q3.classList.add('show')
      } else if (questionNum === 0 && timeInterval !== 0) {
        setTimeout(() => {
          Q3.classList.remove('show');
          endQ.classList.add('show');
        }, 1000);
      }
      setTimeout(() => {
        correctDisplay.classList.remove('show');
      }, 300);
  };
  
    wrongBtn.forEach((btn)=> {
      btn.addEventListener("click", incorrect);
    })
    correctBtn.forEach((btn2)=> {
      btn2.addEventListener("click", correct);
    })
    resetQuiz.addEventListener("click", function () {});
  };

  if(leaderboardLocal !== null && leaderboardLocal.initials.length !== null){
    for(x = 0; x < leaderboardLocal.initials.length; x++){
    var li = document.createElement('li');
    highScore.appendChild(li);
    li.append(leaderboardLocal.initials[x] + ' Score: ' + leaderboardLocal.newScore[x]);
    }
  };

  startEl.addEventListener("click", startQuiz);
  userInput.addEventListener("click", formSubmission);
  clearLB.addEventListener("click", clearlist);
  viewLB.addEventListener("click", function() {
    questionPage.style.display = 'none';
    endQ.classList.add('show');
    userInput.disabled = true;
    disablesubmit.disabled = true;
  });
  
  