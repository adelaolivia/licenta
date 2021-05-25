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

var user_uid = null;
console.log(user_uid);

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

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        
        var title=document.getElementById("test_title");
        title.innerHTML=test_title;

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

var test_name_db=null;

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
var test_title="Test cu alegeri multiple";

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Întrebarea " + currentQuestionNumber + " din " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Rezultate</h1>";
      gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + " out of " + quiz.questions.length +"</h2><br><br><a href='tests_page.html'><button id='back'>Pagina de teste</button></a>";
      var element = document.getElementById("quiz");
      element.innerHTML = gameOverHTML;

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
      testname : test_name_db
    });
  });
};

var pron_spanish = [
    new Question("Cum se traduce „Dumneavoastră”(singular, formal)?", ["Yo", "Él","Ella", "Usted"], "Usted"),
    new Question("Ce înseamnă \"Ustedes” ?", ["Tu","Noi", "Voi", "Ea"], "Tu"),
    new Question("_____________ se traduce „Noi”", ["Nosotros", "Ellos", "Ustedes", "Tú"], "Nosotras"),
    new Question("Cum se traduce „Ea”?", ["Yo", "Ella", "El", "Nosotras"], "Nosotros"), 
    new Question("„Nosotras” înseamnă:  ", ["Tu","Noi","Ei", "Voi"], "Noi"), 
    new Question("„Ellos” înseamnă", ["Ea", "Tu", "Ei", "El"], "Ei")
  ];
  var greetings_spanish = [
    new Question("Cum se traduce „Bună dimineața”?", ["Buenas noches", "Buenos días","Buenas tardes", "¡Bienvenido!"], "Buenos días"),
    new Question("Cum se traduce “Bună”?", ["Halo!","¡Bienvenido!", "¡Hola!", "Buenas noches"], "¡Hola!"),
    new Question("Cum se traduce „Ce faci?”", ["¿Cómo estás?", "¿Cómo te llamas?", "¿Qué hubo?", "¿De dónde eres?"], "¿Cómo estás?"),
    new Question("Cum se traduce „Bine ai venit”?", ["Bienvenidos", "Buenos días", "¿Qué tal?", "¿De dónde eres?"], "Bienvenidos"), 
    new Question("Cum se traduce „Cum te numești?” ", ["Buenas noches","¿Cómo te llamas?","¿De dónde eres?", "¿Qué tal?"], "¿Cómo te llamas?"), 
    new Question("Cum se traduce „De unde ești?” ", ["Cómo estás?", "¿De dónde eres?", "¿Qué tal?", "¡Hola!"], "¿De dónde eres?")
];
var time_spanish = [
    new Question("Cum se traduce „După-amiază”?", ["la mañana", "la tarde" ,"domingo", "septiembre"], "la tarde"),
    new Question("__________ se traduce „Luni”?", ["julio", "lunes", "viernes", "martes"], "lunes"),
    new Question("Cum se traduce „Cât este ceasul?”", ["¿Qué hora es?", "¿Qué quieres comer?", "Buenas tardes", "¿Qué hubo?"], "¿Qué hora es?"),
    new Question("„Ayer” înseamnă:", ["Ieri", "Astăzi", "Dimineață", "Mâine"], "Ieri" ), 
    new Question("Cum se traduce „August”?", ["marzo", "agosto", "enero", "abril"], "agosto"), 
    new Question("______________înseamnă „mañana” ",  ["Vineri", "Mâine", "Septembrie", "Noi"], "Mâine")
  ];
  var food_spanish = [
    new Question("Cum se traduce „Cafea”?", ["Café", "El agua" , "La comida", "Manzana"], "Café"),
    new Question("Cum se traduce „Ce dorești să mănânci”?", ["¿Qué quieres comer?", "¿Qué hora es?", "¿De dónde eres?", "Buenas tardes"], "¿Qué quieres comer?"),
    new Question("Cum se traduce „Mâncare”?",["la comida", "el agua", "tomato", "manzana"], "la comida"),
    new Question("„El agua” înseamnă:",["Supă", "Ceai", "Cafea", "Apă"], "Apă"), 
    new Question("Cum se traduce „Ce îți place să mănânci?”", ["¿Qué hubo?", "¿Qué te gusta comer?", "¿Cómo estás?", "¡Bienvenido!"], "¿Qué te gusta comer?"), 
    new Question("_________înseamnă „O cafea, te rog”",  ["¿Qué quieres comer?", "¿Qué hubo?", "¿De dónde eres?", "Un café por favor"],"Un café por favor" )
  ]; 
  var verb_spanish = [
    new Question("Cum se traduce „A merge”?", ["tardes", "ir", "ser", "estar"], "ir"),
    new Question("Ce înseamnă „comer”?", ["A merge", "A mânca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce „Merg afară”?",["¿De dónde eres?", "Voy a salir", "¿Qué tal?", "Buenas tardes"], "Voy a salir"),
    new Question("„Volar” înseamnă:",["A dormi", "A merge", "A zbura", "A plânge"], "A zbura"), 
    new Question("Cum se traduce „A râde”?", ["La risa", "Volar", "Ser", "Dormir"], "La risa"), 
    new Question("„Ser” înseamnă",  ["A avea", "A merge", "A fi", "A trăi"], "A fi")
  ];
  var pron_german = [
    new Question("Ce înseamnă „Ich”?", ["Eu", "Noi", "Ei", "El"], "Eu"),
    new Question("Care este forma corectă pentru „Voi”?", ["Ihr", "Sie", "Wir", "Ich"], "Wir"),
    new Question("Care este forma corectă pentru „Tu”?",["Du", "Es", "Er", "Ihnen"], "Du"),
    new Question("„Unser” = ?",["Al nostru", "Al meu", "Voi", "Noi"], "Al nostru"), 
    new Question("„Tu” se traduce: ", ["Du", "Wir", "Sie", "Er"], "Du"), 
    new Question("„Ei” poate fi tradus ca: ",  ["Sie", "Ihr", "Es", "Ich"], "Sie")
  ];
  var greetings_german = [
    new Question("Cum se traduce „Bună dimineața”?", ["Tschüss", "Ciao", "Gute Nacht", "Guten Morgen"], "Guten Morgen"),
    new Question("Ce înseamnă „Tschüss”?", ["La revedere", "Bună ziua", "Salut", "Bună seara"], "La revedere"),
    new Question("Cum se traduce „Pe curând”?",["Bis bald", "Tschüss", "Ciao", "Guten Morgen"], "Bis bald"),
    new Question("Cum se traduce „Ce faci?”:",["Bis bald", "Tschüssi", "Tschüss", "Wie geht’s?"], "Wie geht’s?"), 
    new Question("Ce înseamnă „Guten Tag”?", ["Bună dimineața", "Noapte bună", "Bună ziua", "La revedere"], "Bună ziua"), 
    new Question("Ce înseamnă „Bis bald”?",  ["Ce faci?", "Pe curând", "La revedere", "Bună ziua"], "Pe curând")
  ];
  var verb_german= [
    new Question("Cum se traduce „A merge”?", ["werden", "haben", "gehen", "sein"], "gehen"),
    new Question("Ce înseamnă „kommen”?", ["A merge", "A mânca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce „Merg afară”?",["¿De dónde eres?", "Voy a salir", "¿Qué tal?", "Buenas tardes"], "Voy a salir"),
    new Question("„Gehen” înseamnă:",["A dormi", "A merge", "A zbura", "A plânge"], "A merge"), 
    new Question("Cum se traduce „A avea”?", ["werden", "haben", "gehen", "sein"], "haben"), 
    new Question("„Sein” înseamnă",  ["A avea", "A merge", "A fi", "A trăi"], "A fi")
  ];
  var food_german = [
    new Question("Cum se traduce „Cafea”?", ["das Wasser", "der Kaffee" , "der Kuchen", "der Salat"], "der Kaffee"),
    new Question("Cum se traduce „Ce dorești să mănânci”?", ["Lebensmittel", "Einen Kaffee bitte", "der Kuchen", "Was möchtest du essen"], "Was möchtest du essen"),
    new Question("Cum se traduce „Legume”?",["Lebensmittel", "das Gemüse", "die Tomate", "der Apfel"], "das Gemüse"),
    new Question("„das Wasser”  înseamnă:",["Supă", "Ceai", "Cafea", "Apă"], "Apă"), 
    new Question("Cum se traduce „Ce îți place să mănânci?”", ["Was möchtest du essen", "Danke", "Einen Kaffee bitte", "Lebensmittel"], "Was möchtest du essen"), 
    new Question("_________înseamnă „O cafea, te rog”",  ["Was möchtest du essen", "Danke", "Lebensmittel", "Einen Kaffee bitte"],"Einen Kaffee bitte" )
  ];
  var time_german = [
    new Question("Cum se traduce „După-amiază”?", ["der Vormittag", "der Nachmittag" ,"der Abend", "die Nacht"], "der Nachmittag"),
    new Question("__________ se traduce „Luni”?", ["Sonntag", "Montag", "Freitag", "Dienstag"], "Montag"),
    new Question("Cum se traduce „Cât este ceasul?”", ["Wie spät ist es?", "Abend?", "Montag", "Samstag"], "Wie spät ist es?"),
    new Question("„Ayer” înseamnă:", ["Ieri", "Astăzi", "Dimineață", "Mâine"], "Ieri" ), 
    new Question("Cum se traduce „Vineri”?", ["Freitag", "Wie spät ist es?", "der Sonnenaufgang", "der Morgen"], "Freitag"), 
    new Question("______________înseamnă „der Morgen” ",  ["Vineri", "Mâine", "Septembrie", "Noi"], "Mâine")
 ];
  var pron_french = [
    new Question("Care este forma corectă pentru pronumele indirect „Tu”?", ["Lui", "Toi", "Te", "Nous"], "Te"),
    new Question("Ce înseamnă “elles”?", ["Ele", "Tu", "Noi", "Ea"], "Ele"),
    new Question("Care este forma corectă pentru pronumele „Ei”?",["Moi", "Ells", "Leur", "Ils"], "Ils"),
    new Question("Forma reflexivă pentru pronumele „Eu” este:",["Se", "Vous", "Eux", "Me"], "Me"), 
    new Question("Ce înseamnă “nous”?", ["Tu", "Noi", "Voi", "Ei"], "Noi"), 
    new Question("Care este forma corectă pentru pronumele „voi”?",  ["Les", "A merge", "Se", "Eux"], "Vous")
  ];
  var greetins_french = [
    new Question("Cum se traduce „Bună dimineața”?", ["Coucou", "Bonjour!", "Allo", "A plus tard"], "Bonjour!"),
    new Question("Ce înseamnă  „Au revoir”?", ["Bună ziua", "Bună dimineața", "La revedere", "Salut"], "La revedere"),
    new Question("Cum se traduce „Ne vedem mai târziu”?",["A plus tard", "Allo", "Coucou", "Salut"], "A plus tard"),
    new Question("Ce înseamnă  „Bonne nuit”?",["Bună dimineața", "La revedere", "Bună ziua", "Noapte Bună"], "Noapte Bună"), 
    new Question("Cum se spune „Îmi cer scuze”?", ["Je dois y aller", "Je suis désolé", "Au revoir", "Bonne nuit"], "Je suis désolé"), 
    new Question("Ce înseamnă  „Coucou”?",  ["Bună ziua", "Bună dimineața", "Salut", "La revedere"], "Salut")
  ];
  var time_french = [
      new Question("Cum se traduce „După-amiază”?", ["noon", "demie" ,"l'après-midi", "jeudi"], "l'après-midi"),
      new Question("__________ se traduce „Luni”?", ["samedi", "lundi", "vendredi", "jeudi"], "lundi"),
      new Question("Cum se traduce „Astăzi”", ["samedi", "lundi", "hier", "aujourd'hui"], "aujourd'hui"),
      new Question("„Hier” înseamnă:", ["Ieri", "Astăzi", "Dimineață", "Mâine"], "Ieri" ), 
      new Question("Cum se traduce „seară”?", ["soir", "midi", "quart", "demie"], "soir"), 
      new Question("______________înseamnă „demain” ",  ["Vineri", "Mâine", "Septembrie", "Noi"], "Mâine")
 ];
  var verb_french = [
    new Question("Cum se traduce „A merge”?", ["aller", "devoir", "être", "dire"], "aller"),
    new Question("Ce înseamnă „comer”?", ["A merge", "A mânca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce „A avea”?",["devoir", "être", "avoir", "dire"], "avoir"),
    new Question("„Voler” înseamnă:",["A dormi", "A merge", "A zbura", "A plânge"], "a zbura"), 
    new Question("Cum se traduce „A găsi”?", ["trouver", "aimer", "être", "dire"], "trouver"), 
    new Question("„être” înseamnă",  ["A avea", "A merge", "A fi", "A trăi"], "A fi")
  ];
  var food_french = [
    new Question("Cum se traduce „Cafea”?", ["Café", "Tomate" , "La pomme", "De terre"], "Café"),
    new Question("Cum se traduce „Ce dorești să mănânci”?", ["Que voulez-vous manger?", "Le Café, s'il vous plait", "Les légumes", "L'addition, s'il vous plait"], "Que voulez-vous manger?"),
    new Question("Cum se traduce „Mâncare”?",["La salade", "L'eau", "Nourriture", "Pâtisseries"], "Nourriture"),
    new Question("„L'eau” înseamnă:",["Supă", "Ceai", "Cafea", "Apă"], "Apă"), 
    new Question("Cum se traduce „Prăjituri”", ["Nourriture", "Pâtisseries", "La pomme", "De terre"], "Pâtisseries"), 
    new Question("_________înseamnă „O cafea, te rog”",  ["Que voulez-vous manger?", "Le Café, s'il vous plait", "Les légumes", "L'addition, s'il vous plait"],"Le Café, s'il vous plait" )
   ];

  var pron_uk = [
    new Question("Cum se traduce „Dumneavoastră”(singular, formal)?", ["You", "They","Her", "Me"], "You"),
    new Question("Ce înseamnă \"You” ?", ["Tu","Noi", "Voi", "Ea"], "Tu"),
    new Question("_____________ se traduce „Noi”", ["They", "I", "We", "Your"], "We"),
    new Question("Cum se traduce „Ea”?", ["Him", "Them", "Yours", "She"], "She"), 
    new Question("„We” înseamnă:  ", ["Tu","Noi","Ei", "Voi"], "Noi"), 
    new Question("„They” înseamnă", ["Ea", "Tu", "Ei", "El"], "Ei")
  ];
  var greetings_uk = [
    new Question("Cum se traduce „Bună dimineața”?", ["Good day", "Good morning","Hello", "Good evening"], "Good morning"),
    new Question("Cum se traduce “Bună”?", ["Hello","Good day", "Good morning", "Bye"], "Hello"),
    new Question("Cum se traduce „Ce faci?”", ["Are you ok?", "How are you?", "Hello", "I don't know"], "How are you?"),
    new Question("Cum se traduce „Bine ai venit”?", ["Hello", "Welcome", "Good day", "Good morning"], "Welcome"), 
    new Question("Cum se traduce „Cum te numești?” ", ["What's your name?","Are you ok?", "How are you?", "Bye"], "What's your name?"), 
    new Question("Cum se traduce „De unde ești?” ", ["What's your name?","Are you ok?", "Where are you from?", "Hey"], "Where are you from?")
];
var time_uk = [
    new Question("Cum se traduce „După-amiază”?", ["Afternoon", "Noon" ,"Tuesday", "September"], "Afternoon"),
    new Question("__________ se traduce „Luni”?", ["July", "Monday", "Friday", "Tuesday"], "Monday"),
    new Question("Cum se traduce „Cât este ceasul?”", ["How are you?", "What time it is?","Are you ok?", "Where are you from?"], "What time it is?"),
    new Question("„Yesterday” înseamnă:", ["Ieri", "Astăzi", "Dimineață", "Mâine"], "Ieri" ), 
    new Question("Cum se traduce „August”?", ["March", "September", "August", "April"], "August"), 
    new Question("______________înseamnă „Tomorrow” ",  ["Vineri", "Mâine", "Septembrie", "Noi"], "Mâine")
  ];
  var food_uk = [
    new Question("Cum se traduce „Cafea”?", ["Coffee", "Water" , "Food", "Apple"], "Coffee"),
    new Question("Cum se traduce „Ce dorești să mănânci”?", ["Are you tired?", "What would you like to eat?","Are you ok?", "Where are you from?"], "What would you like to eat?"),
    new Question("Cum se traduce „Mâncare”?",["Water", "Tea", "Tomato", "Food"], "Food"),
    new Question("„Water” înseamnă:",["Supă", "Ceai", "Cafea", "Apă"], "Apă"), 
    new Question("Cum se traduce „Ce îți place să mănânci?”", ["Whar do you like to eat?", "What would you like to eat?","Are you ok?", "Where are you from?"], "Whar do you like to eat?"), 
    new Question("_________înseamnă „O cafea, te rog”",  ["How are you?", "What time it is?", "A coffee, please", "Thank you"],"A coffee, please" )
  ]; 
  var verb_uk = [
    new Question("Cum se traduce „A merge”?", ["To try", "To go", "To be", "to run"], "To go"),
    new Question("Ce înseamnă „To come”?", ["A merge", "A mânca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce „A merge”?",["To cry", "To walk", "To eat", "To see"], "To walk"),
    new Question("„To fly” înseamnă:",["A dormi", "A merge", "A zbura", "A plânge"], "A zbura"), 
    new Question("Cum se traduce „A râde”?", ["To fly", "To watch", "To cry", "To laugh"], "To laugh"), 
    new Question("„To be” înseamnă",  ["A avea", "A merge", "A fi", "A trăi"], "A fi")
  ];
  
function whichTest(){
    let page_url        = window.location,
        page_attr       = page_url.toString().split('?'),
        attr_test       = page_attr[1].toString().split('='),
        test_name       = attr_test[1];
  
      return test_name;
  }
  
  let test_name = whichTest();
  
// create questions
if(test_name=="greetings"){
    var questions=greetings_spanish;
    test_title="Salutări";
    test_name_db="Salutări Sp";
}else if(test_name=="Pronouns"){
    var questions = pron_spanish;
    test_title="Pronume";
    test_name_db="Pronume Sp";
  }else if(test_name=="time"){
    var questions = time_spanish;
    test_title="Timp";
    test_name_db="Timp Sp";
  }else if(test_name=="food"){
    var questions = food_spanish;
    test_title="Mâncare";
    test_name_db="Mâncare Sp";
  }else if(test_name=="verbs"){
    var questions = verb_spanish;
    test_title="Verbe";
    test_name_db="Verbe Sp";
  }else if(test_name=="pron_french"){
    var questions = pron_french;
    test_title="Pronume";
    test_name_db="Pronume Fr";
  }else if(test_name=="greetings_french"){
    var questions = greetins_french;
    test_title="Salutări";
    test_name_db="Salutări Fr";
  }else if(test_name=="food_french"){
    var questions = food_french;
    test_title="Mâncare";
    test_name_db="Mâncare Fr";
  }else if(test_name=="time_french"){
    var questions = time_french;
    test_title="Timp";
    test_name_db="Timp Fr";
  }else if(test_name=="verbs_french"){
    var questions = verb_french;
    test_title="Verbe";
    test_name_db="Verbe Fr";
  }else if(test_name=="pron_german"){
    var questions = pron_german;
    test_title="Pronume";
    test_name_db="Pronume Ge";
  }else if(test_name=="greetings_german"){
    var questions = greetings_german;
    test_title="Salutări";
    test_name_db="Salutări Ge";
  }else if(test_name=="food_german"){
    var questions = food_german;
    test_title="Mâncare";
    test_name_db="Mâncare Ge";
  }else if(test_name=="time_german"){
    var questions = time_german;
    test_title="Timp";
    test_name_db="Timp Ge";
  }else if(test_name=="verbs_german"){
    var questions = verb_german;
    test_title="Verbe";
    test_name_db="Verbe Ge";
  }else if(test_name=="pron_uk"){
    var questions = pron_uk;
    test_title="Pronume";
    test_name_db="Pronume En";
  }else if(test_name=="greetings_uk"){
    var questions = greetins_uk;
    test_title="Salutări";
    test_name_db="Salutări En";
  }else if(test_name=="food_uk"){
    var questions = food_uk;
    test_title="Mâncare";
    test_name_db="Mâncare En";
  }else if(test_name=="time_uk"){
    var questions = time_uk;
    test_title="Timp";
    test_name_db="Timp En";
  }else if(test_name=="verbs_uk"){
    var questions = verb_uk;
    test_title="Verbe";
    test_name_db="Verbe En";
  }


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
        element.innerHTML = "Răspuns corect";
    }else{
        var element = document.getElementById("correct");
        document.getElementById("correct").style.color="red";
        element.innerHTML = "Greșit.Răspunsul corect era: " + quiz.getQuestionIndex().answer;
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

// create the quiz
var quiz = new Quiz(questions);

// display quiz
populate();
