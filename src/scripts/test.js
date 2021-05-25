var config = {
   apiKey: "AIzaSyCT-QMSSlQGSLmP-LJjyH6qk8KE336At08",
   authDomain: "lang-mmp2.firebaseapp.com",
   databaseURL: "https://lang-mmp2.firebaseio.com",
   projectId: "lang-mmp2",
   storageBucket: "lang-mmp2.appspot.com",
   messagingSenderId: "178927936496"
};
if (!firebase.apps.length) {
   firebase.initializeApp(config);
}

var user_uid = null,
    which_test = null;

function userStuff(){
  isUserAuth();
}

function isUserAuth(){
  if(window.localStorage){
    var locUrl = window.location;
    var locParts = locUrl.toString().split('/');

    if(sessionStorage.getItem('user') == null){
      if(!(locParts[locParts.length-1] =='login.html'))
        window.location='login.html';
    }else{
      user_uid = sessionStorage.getItem('user');
      if(!(locParts[locParts.length-1] =='login.html'))
        askUserName();
    }
  }
}

function askUserName(){
  let user_label  = document.getElementById('user_label'),
    text    = '<i class="material-icons">perm_identity</i> ';

  firebase.database().ref('/user/'+user_uid).once('value').then(function(user_data){
    let data = user_data.val();
    if(data.username==null){
      user_label.innerHTML = text + data.email;
    }else{
      user_label.innerHTML = text + data.username;
    }
  });
}

var questions = [];

// create the quiz
var quiz = new Quiz(questions);

//detects test name
function whichTest(){
    let page_url        = window.location,
        page_attr       = page_url.toString().split('?'),
        attr_test       = page_attr[1].toString().split('='),
        test_name       = attr_test[1];

      return test_name;
}

//reading from db
function readQuestionsDatabase(){
  let test_name = whichTest();

  firebase.database().ref('/tests/'+test_name).once('value').then(function(test_data){
    test_data = test_data.val();
    
    let i=1, j=1, a=`a${j}`, q='', r='', answers=[];
    if(test_data==null){
      window.location = 'index.html';
    }
    while(test_data[i]!=null){
      j=1;
      a=`a${j}`;
      answers = [];
      q = test_data[i].question;
      r = test_data[i].r;
      while(test_data[i][a]!=null){
        //console.log(test_data[i][a]);
        answers.push(test_data[i][a]);
        j++;
        a=`a${j}`;
      }

     questions.push(new Question(q, answers, r));
      i++;
    }

  }).then(function(data){
    // display quiz
    populate();
    
  });
}

readQuestionsDatabase();

function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      
      // show the question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // show the options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
//  let new_score = {getScoreCount() : {score: `${quiz.score}_${quiz.questions.length}`, testname : whichTest()}};
  var counter = 1;

    firebase.database().ref('/scores/'+user_uid).once('value').then(function(count_data){
    count_data = count_data.val();
    if(count_data!=null)
      while(count_data[counter]!=null){
        counter++;
      }
  }).then(function(){
    firebase.database().ref('/scores/'+user_uid+"/"+counter+"/").set({
      score : `${quiz.score}_${quiz.questions.length}`,
      testname : whichTest()
    }).then(function(data){
      var gameOverHTML = "<h1>Result</h1>";
      gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + " out of " + quiz.questions.length +"</h2><br><br><a href='tests_page.html'><button id='back'>Go back</button></a>";
      var element = document.getElementById("quiz");
      element.innerHTML = gameOverHTML;
    });
  });
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
      var element = document.getElementById("correct");
      document.getElementById("correct").style.color="green";
      element.innerHTML = "Correct answer";
  }else{
      var element = document.getElementById("correct");
      document.getElementById("correct").style.color="red";
      element.innerHTML = "Wrong answer. The answer was: "+ quiz.getQuestionIndex().answer;;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
//check
Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}