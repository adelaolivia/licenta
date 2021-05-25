var config = {
  apiKey: "AIzaSyCT-QMSSlQGSLmP-LJjyH6qk8KE336At08",
  authDomain: "lang-mmp2.firebaseapp.com",
  databaseURL: "https://lang-mmp2.firebaseio.com",
  projectId: "lang-mmp2",
  storageBucket: "lang-mmp2.appspot.com",
  messagingSenderId: "178927936496"
};


var user_uid = null;
console.log(user_uid);

function whichTest(){
  let page_url        = window.location,
      page_attr       = page_url.toString().split('?'),
      attr_test       = page_attr[1].toString().split('='),
      test_name       = attr_test[1];

    return test_name;
}

let test_name = whichTest();

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
      console.log(user_uid);
  }
}
}

userStuff();

var question_transport_uk=
[["_______________ înseamnă bicicletă", "bicycle"],
["Tren =_____________   ", "train"],
["______________ înseamnă avion", "airplane"],
["Bus =______________ ", "autobus"],
["___________ înseamnă mașină ", "car"],
["Barcă = _____________ ", "boat"]
];

var question_numbers_spanish=
[["___________ înseamnă 2", "dos"],
              ["Cuatro înseamnă _____________", "patru"],
              ["15 este _________", "quince"],
              ["____________ = 21    ", "ventiuno"],
              ["100 este ________   ", "ciento"],
              ["________ înseamnă 40", "cuarenta"]
];

var question_transport_spanish=
[["_______________ înseamnă bicicletă", "bicicleta"],
["Tren =_____________   ", "tren"],
["______________ înseamnă avion", "avion"],
["Bus =______________ ", "autobus"],
["___________ înseamnă mașină ", "auto"],
["Barcă = _____________ ", "barco"]
];

var question_numbers_french=
[["___________ înseamnă 2", "deux"],
              ["Quatre înseamnă _____________", "patru"],
              ["15 este _________", "quinze"],
              ["____________ = 20    ", "vingt"],
              ["100 este ________   ", "cent"],
              ["________ înseamnă 40", "quarante"]
];

var question_transport_french=
[["_______________ înseamnă bicicletă", "velo"],
["Tren =_____________   ", "train"],
["______________ înseamnă avion", "avion"],
["Bus =______________ ", "autobus"],
["___________ înseamnă mașină ", "voiture"],
["Barcă = _____________ ", "bateau"]
];

var question_numbers_german=
[["___________ înseamnă 2", "zwei"],
              ["Vier înseamnă _____________", "patru"],
              ["15 este _________", "fünfzehn"],
              ["____________ = 21    ", "einundzwanzig"],
              ["100 este ________   ", "hundert"],
              ["________ înseamnă 40", "vierzig"]
];

var question_transport_german=
[["_______________ înseamnă bicicletă", "fahrad"],
["Tren =_____________   ", "zug"],
["______________ înseamnă avion", "flugzeug"],
["Bus =______________ ", "autobus"],
["___________ înseamnă mașină ", "auto"],
["Barcă = _____________ ", "schiff"]
];

var question_numbers_uk=
[["___________ înseamnă 2", "two"],
              ["Four înseamnă _____________", "patru"],
              ["15 este _________", "fifteen"],
              ["____________ = 20    ", "twenty"],
              ["100 este ________   ", "hundred"],
              ["________ înseamnă 40", "forty"]
];


var score=0;
var number_question=0;
var test_db=null;
if(test_name=="Numbers_spanish"){
  questions=question_numbers_spanish;
  test_db="Numere Sp";
}else if(test_name=="Transport_spanish"){
  questions=question_transport_spanish;
  test_db="Transport Sp";
}else if(test_name=="Transport_german"){
  questions=question_transport_german;
  test_db="Transport Ge";
}else if(test_name=="Numbers_german"){
  questions=question_numbers_german;
  test_db="Numere Ge";
}else if(test_name=="Numbers_uk"){
  questions=question_numbers_uk;
  test_db="Numere En";
}else if(test_name=="Transport_uk"){
  questions=question_transport_uk;
  test_db="Transport En";
}else if(test_name=="Numbers_french"){
  questions=question_numbers_french;
  test_db="Numere Fr";
}else if(test_name=="Transport_french"){
  questions=question_transport_french;
  test_db="Transport Fr";
}


function loadQuestions(){
  document.getElementById("question1").innerHTML=questions[0][0];
  document.getElementById("question2").innerHTML=questions[1][0];
  document.getElementById("question3").innerHTML=questions[2][0];
  document.getElementById("question4").innerHTML=questions[3][0];
  document.getElementById("question5").innerHTML=questions[4][0];
  document.getElementById("question6").innerHTML=questions[5][0];
}
     function Question1()
      {
        number_question++;
        var ans1 = document.getElementById("answer1").value;

        if (ans1.toLowerCase() == questions[0][1]) 
        {
        score=score+5; 
        document.getElementById("1").style.display="none";
        document.getElementById("scoring").innerHTML = score;
        } else {
          document.getElementById("answerPane1").innerHTML ='Wrong. The answer was: '+ questions[0][1];
          document.getElementById("answerPane1").style.color="red";}
      }


      function Question2()
      {
        number_question++;
        var ans2 = document.getElementById("answer2").value;
        
        if (ans2.toLowerCase() == questions[1][1]) 
        {
          score=score+5;
          document.getElementById("2").style.display="none";
          
        } else {
          document.getElementById("answerPane2").innerHTML ='Wrong.The answer was: '+ questions[1][1];
          document.getElementById("answerPane2").style.color="red";
        }
      }



      function Question3()
      {
        number_question++;
        var ans3 = document.getElementById("answer3").value;
        if (ans3.toLowerCase() == questions[2][1]) 
        {
        score=score+5;
        document.getElementById("3").style.display="none";
        document.getElementById("scoring").innerHTML = score;
        } else {
         document.getElementById("answerPane3").innerHTML ='Wrong. The answer was: '+ questions[2][1];
         document.getElementById("answerPane3").style.color="red";}     
      }

      function Question4()
      {
        number_question++;
        var ans4 = document.getElementById("answer4").value;
   
        if (ans4.toLowerCase() == questions[3][1]) 
        {
        score=score+5;
        document.getElementById("4").style.display="none";
        document.getElementById("scoring").innerHTML = score;
        } else {
         document.getElementById("answerPane4").innerHTML ='Wrong. The answer was: '+ questions[3][1];               
         document.getElementById("answerPane4").style.color="red";}     
        }

        function Question5()
      {
        number_question++;
        var ans5 = document.getElementById("answer5").value;
        
        if (ans5.toLowerCase() == questions[4][1]) 
        {
        score=score+5;
        document.getElementById("5").style.display="none";
        document.getElementById("scoring").innerHTML = score;
        } else {
         document.getElementById("answerPane5").innerHTML ='Wrong. The answer was: '+ questions[4][1];
         document.getElementById("answerPane5").style.color="red";}     
      }

      function Question6()
      {
        
        var ans6 = document.getElementById("answer6").value;
        
        if (ans6.toLowerCase() == questions[5][1]) 
        {
        score=score+5;
        document.getElementById("6").style.display="none";
        document.getElementById("scoring").innerHTML = score;
        } else {
         document.getElementById("answerPane6").innerHTML ='Wrong. The answer was: '+ questions[5][1];
         document.getElementById("answerPane6").style.color="red";}
         number_question++;     
      }


      firebase.initializeApp(config);
      
      function checkMyScore()
      {
        document.getElementById("scoring").innerHTML=score;
        if (number_question >= 6) 
        { 
          document.getElementById("1").style.display="none";
          document.getElementById("2").style.display="none";
          document.getElementById("3").style.display="none";
          document.getElementById("4").style.display="none";
          document.getElementById("5").style.display="none";
          document.getElementById("6").style.display="none";
          
         document.getElementById("text_score").style.visibility="hidden";
         document.getElementById("scoring").style.visibility="hidden";
         document.getElementById("nextLesson").style.display = "block";
         document.getElementById("result").innerHTML=score + '/30';
         document.getElementById("tilu_complet").innerHTML= "Scorul tău este: ";

         var counter = 1;

    firebase.database().ref('/scores/'+user_uid).once('value').then(function(count_data){
    count_data = count_data.val();
    if(count_data!=null)
      while(count_data[counter]!=null){
        counter++;
      }
  }).then(function(){
    firebase.database().ref('/scores/'+user_uid+"/"+counter+"/").set({
      score : `${score}_30`,
      testname : test_db
    });
  });
}    
} 
      
