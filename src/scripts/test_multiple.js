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
    element.innerHTML = "√éntrebarea " + currentQuestionNumber + " din " + quiz.questions.length;
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
    new Question("Cum se traduce ‚ÄěDumneavoastrńÉ‚ÄĚ(singular, formal)?", ["Yo", "√Čl","Ella", "Usted"], "Usted"),
    new Question("Ce √ģnseamnńÉ \"Ustedes‚ÄĚ ?", ["Tu","Noi", "Voi", "Ea"], "Tu"),
    new Question("_____________ se traduce ‚ÄěNoi‚ÄĚ", ["Nosotros", "Ellos", "Ustedes", "T√ļ"], "Nosotras"),
    new Question("Cum se traduce ‚ÄěEa‚ÄĚ?", ["Yo", "Ella", "El", "Nosotras"], "Nosotros"), 
    new Question("‚ÄěNosotras‚ÄĚ √ģnseamnńÉ:  ", ["Tu","Noi","Ei", "Voi"], "Noi"), 
    new Question("‚ÄěEllos‚ÄĚ √ģnseamnńÉ", ["Ea", "Tu", "Ei", "El"], "Ei")
  ];
  var greetings_spanish = [
    new Question("Cum se traduce ‚ÄěBunńÉ diminea»õa‚ÄĚ?", ["Buenas noches", "Buenos d√≠as","Buenas tardes", "¬°Bienvenido!"], "Buenos d√≠as"),
    new Question("Cum se traduce ‚ÄúBunńÉ‚ÄĚ?", ["Halo!","¬°Bienvenido!", "¬°Hola!", "Buenas noches"], "¬°Hola!"),
    new Question("Cum se traduce ‚ÄěCe faci?‚ÄĚ", ["¬ŅC√≥mo est√°s?", "¬ŅC√≥mo te llamas?", "¬ŅQu√© hubo?", "¬ŅDe d√≥nde eres?"], "¬ŅC√≥mo est√°s?"),
    new Question("Cum se traduce ‚ÄěBine ai venit‚ÄĚ?", ["Bienvenidos", "Buenos d√≠as", "¬ŅQu√© tal?", "¬ŅDe d√≥nde eres?"], "Bienvenidos"), 
    new Question("Cum se traduce ‚ÄěCum te nume»ôti?‚ÄĚ ", ["Buenas noches","¬ŅC√≥mo te llamas?","¬ŅDe d√≥nde eres?", "¬ŅQu√© tal?"], "¬ŅC√≥mo te llamas?"), 
    new Question("Cum se traduce ‚ÄěDe unde e»ôti?‚ÄĚ ", ["C√≥mo est√°s?", "¬ŅDe d√≥nde eres?", "¬ŅQu√© tal?", "¬°Hola!"], "¬ŅDe d√≥nde eres?")
];
var time_spanish = [
    new Question("Cum se traduce ‚ÄěDupńÉ-amiazńÉ‚ÄĚ?", ["la ma√Īana", "la tarde" ,"domingo", "septiembre"], "la tarde"),
    new Question("__________ se traduce ‚ÄěLuni‚ÄĚ?", ["julio", "lunes", "viernes", "martes"], "lunes"),
    new Question("Cum se traduce ‚ÄěC√Ęt este ceasul?‚ÄĚ", ["¬ŅQu√© hora es?", "¬ŅQu√© quieres comer?", "Buenas tardes", "¬ŅQu√© hubo?"], "¬ŅQu√© hora es?"),
    new Question("‚ÄěAyer‚ÄĚ √ģnseamnńÉ:", ["Ieri", "AstńÉzi", "Diminea»õńÉ", "M√Ęine"], "Ieri" ), 
    new Question("Cum se traduce ‚ÄěAugust‚ÄĚ?", ["marzo", "agosto", "enero", "abril"], "agosto"), 
    new Question("______________√ģnseamnńÉ ‚Äěma√Īana‚ÄĚ ",  ["Vineri", "M√Ęine", "Septembrie", "Noi"], "M√Ęine")
  ];
  var food_spanish = [
    new Question("Cum se traduce ‚ÄěCafea‚ÄĚ?", ["Caf√©", "El agua" , "La comida", "Manzana"], "Caf√©"),
    new Question("Cum se traduce ‚ÄěCe dore»ôti sńÉ mńÉn√Ęnci‚ÄĚ?", ["¬ŅQu√© quieres comer?", "¬ŅQu√© hora es?", "¬ŅDe d√≥nde eres?", "Buenas tardes"], "¬ŅQu√© quieres comer?"),
    new Question("Cum se traduce ‚ÄěM√Ęncare‚ÄĚ?",["la comida", "el agua", "tomato", "manzana"], "la comida"),
    new Question("‚ÄěEl agua‚ÄĚ √ģnseamnńÉ:",["SupńÉ", "Ceai", "Cafea", "ApńÉ"], "ApńÉ"), 
    new Question("Cum se traduce ‚ÄěCe √ģ»õi place sńÉ mńÉn√Ęnci?‚ÄĚ", ["¬ŅQu√© hubo?", "¬ŅQu√© te gusta comer?", "¬ŅC√≥mo est√°s?", "¬°Bienvenido!"], "¬ŅQu√© te gusta comer?"), 
    new Question("_________√ģnseamnńÉ ‚ÄěO cafea, te rog‚ÄĚ",  ["¬ŅQu√© quieres comer?", "¬ŅQu√© hubo?", "¬ŅDe d√≥nde eres?", "Un caf√© por favor"],"Un caf√© por favor" )
  ]; 
  var verb_spanish = [
    new Question("Cum se traduce ‚ÄěA merge‚ÄĚ?", ["tardes", "ir", "ser", "estar"], "ir"),
    new Question("Ce √ģnseamnńÉ ‚Äěcomer‚ÄĚ?", ["A merge", "A m√Ęnca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce ‚ÄěMerg afarńÉ‚ÄĚ?",["¬ŅDe d√≥nde eres?", "Voy a salir", "¬ŅQu√© tal?", "Buenas tardes"], "Voy a salir"),
    new Question("‚ÄěVolar‚ÄĚ √ģnseamnńÉ:",["A dormi", "A merge", "A zbura", "A pl√Ęnge"], "A zbura"), 
    new Question("Cum se traduce ‚ÄěA r√Ęde‚ÄĚ?", ["La risa", "Volar", "Ser", "Dormir"], "La risa"), 
    new Question("‚ÄěSer‚ÄĚ √ģnseamnńÉ",  ["A avea", "A merge", "A fi", "A trńÉi"], "A fi")
  ];
  var pron_german = [
    new Question("Ce √ģnseamnńÉ ‚ÄěIch‚ÄĚ?", ["Eu", "Noi", "Ei", "El"], "Eu"),
    new Question("Care este forma corectńÉ pentru ‚ÄěVoi‚ÄĚ?", ["Ihr", "Sie", "Wir", "Ich"], "Wir"),
    new Question("Care este forma corectńÉ pentru ‚ÄěTu‚ÄĚ?",["Du", "Es", "Er", "Ihnen"], "Du"),
    new Question("‚ÄěUnser‚ÄĚ = ?",["Al nostru", "Al meu", "Voi", "Noi"], "Al nostru"), 
    new Question("‚ÄěTu‚ÄĚ se traduce: ", ["Du", "Wir", "Sie", "Er"], "Du"), 
    new Question("‚ÄěEi‚ÄĚ poate fi tradus ca: ",  ["Sie", "Ihr", "Es", "Ich"], "Sie")
  ];
  var greetings_german = [
    new Question("Cum se traduce ‚ÄěBunńÉ diminea»õa‚ÄĚ?", ["Tsch√ľss", "Ciao", "Gute Nacht", "Guten Morgen"], "Guten Morgen"),
    new Question("Ce √ģnseamnńÉ ‚ÄěTsch√ľss‚ÄĚ?", ["La revedere", "BunńÉ ziua", "Salut", "BunńÉ seara"], "La revedere"),
    new Question("Cum se traduce ‚ÄěPe cur√Ęnd‚ÄĚ?",["Bis bald", "Tsch√ľss", "Ciao", "Guten Morgen"], "Bis bald"),
    new Question("Cum se traduce ‚ÄěCe faci?‚ÄĚ:",["Bis bald", "Tsch√ľssi", "Tsch√ľss", "Wie geht‚Äôs?"], "Wie geht‚Äôs?"), 
    new Question("Ce √ģnseamnńÉ ‚ÄěGuten Tag‚ÄĚ?", ["BunńÉ diminea»õa", "Noapte bunńÉ", "BunńÉ ziua", "La revedere"], "BunńÉ ziua"), 
    new Question("Ce √ģnseamnńÉ ‚ÄěBis bald‚ÄĚ?",  ["Ce faci?", "Pe cur√Ęnd", "La revedere", "BunńÉ ziua"], "Pe cur√Ęnd")
  ];
  var verb_german= [
    new Question("Cum se traduce ‚ÄěA merge‚ÄĚ?", ["werden", "haben", "gehen", "sein"], "gehen"),
    new Question("Ce √ģnseamnńÉ ‚Äěkommen‚ÄĚ?", ["A merge", "A m√Ęnca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce ‚ÄěMerg afarńÉ‚ÄĚ?",["¬ŅDe d√≥nde eres?", "Voy a salir", "¬ŅQu√© tal?", "Buenas tardes"], "Voy a salir"),
    new Question("‚ÄěGehen‚ÄĚ √ģnseamnńÉ:",["A dormi", "A merge", "A zbura", "A pl√Ęnge"], "A merge"), 
    new Question("Cum se traduce ‚ÄěA avea‚ÄĚ?", ["werden", "haben", "gehen", "sein"], "haben"), 
    new Question("‚ÄěSein‚ÄĚ √ģnseamnńÉ",  ["A avea", "A merge", "A fi", "A trńÉi"], "A fi")
  ];
  var food_german = [
    new Question("Cum se traduce ‚ÄěCafea‚ÄĚ?", ["das Wasser", "der Kaffee" , "der Kuchen", "der Salat"], "der Kaffee"),
    new Question("Cum se traduce ‚ÄěCe dore»ôti sńÉ mńÉn√Ęnci‚ÄĚ?", ["Lebensmittel", "Einen Kaffee bitte", "der Kuchen", "Was m√∂chtest du essen"], "Was m√∂chtest du essen"),
    new Question("Cum se traduce ‚ÄěLegume‚ÄĚ?",["Lebensmittel", "das Gem√ľse", "die Tomate", "der Apfel"], "das Gem√ľse"),
    new Question("‚Äědas Wasser‚ÄĚ  √ģnseamnńÉ:",["SupńÉ", "Ceai", "Cafea", "ApńÉ"], "ApńÉ"), 
    new Question("Cum se traduce ‚ÄěCe √ģ»õi place sńÉ mńÉn√Ęnci?‚ÄĚ", ["Was m√∂chtest du essen", "Danke", "Einen Kaffee bitte", "Lebensmittel"], "Was m√∂chtest du essen"), 
    new Question("_________√ģnseamnńÉ ‚ÄěO cafea, te rog‚ÄĚ",  ["Was m√∂chtest du essen", "Danke", "Lebensmittel", "Einen Kaffee bitte"],"Einen Kaffee bitte" )
  ];
  var time_german = [
    new Question("Cum se traduce ‚ÄěDupńÉ-amiazńÉ‚ÄĚ?", ["der Vormittag", "der Nachmittag" ,"der Abend", "die Nacht"], "der Nachmittag"),
    new Question("__________ se traduce ‚ÄěLuni‚ÄĚ?", ["Sonntag", "Montag", "Freitag", "Dienstag"], "Montag"),
    new Question("Cum se traduce ‚ÄěC√Ęt este ceasul?‚ÄĚ", ["Wie sp√§t ist es?", "Abend?", "Montag", "Samstag"], "Wie sp√§t ist es?"),
    new Question("‚ÄěAyer‚ÄĚ √ģnseamnńÉ:", ["Ieri", "AstńÉzi", "Diminea»õńÉ", "M√Ęine"], "Ieri" ), 
    new Question("Cum se traduce ‚ÄěVineri‚ÄĚ?", ["Freitag", "Wie sp√§t ist es?", "der Sonnenaufgang", "der Morgen"], "Freitag"), 
    new Question("______________√ģnseamnńÉ ‚Äěder Morgen‚ÄĚ ",  ["Vineri", "M√Ęine", "Septembrie", "Noi"], "M√Ęine")
 ];
  var pron_french = [
    new Question("Care este forma corectńÉ pentru pronumele indirect ‚ÄěTu‚ÄĚ?", ["Lui", "Toi", "Te", "Nous"], "Te"),
    new Question("Ce √ģnseamnńÉ ‚Äúelles‚ÄĚ?", ["Ele", "Tu", "Noi", "Ea"], "Ele"),
    new Question("Care este forma corectńÉ pentru pronumele ‚ÄěEi‚ÄĚ?",["Moi", "Ells", "Leur", "Ils"], "Ils"),
    new Question("Forma reflexivńÉ pentru pronumele ‚ÄěEu‚ÄĚ este:",["Se", "Vous", "Eux", "Me"], "Me"), 
    new Question("Ce √ģnseamnńÉ ‚Äúnous‚ÄĚ?", ["Tu", "Noi", "Voi", "Ei"], "Noi"), 
    new Question("Care este forma corectńÉ pentru pronumele ‚Äěvoi‚ÄĚ?",  ["Les", "A merge", "Se", "Eux"], "Vous")
  ];
  var greetins_french = [
    new Question("Cum se traduce ‚ÄěBunńÉ diminea»õa‚ÄĚ?", ["Coucou", "Bonjour!", "Allo", "A plus tard"], "Bonjour!"),
    new Question("Ce √ģnseamnńÉ  ‚ÄěAu revoir‚ÄĚ?", ["BunńÉ ziua", "BunńÉ diminea»õa", "La revedere", "Salut"], "La revedere"),
    new Question("Cum se traduce ‚ÄěNe vedem mai t√Ęrziu‚ÄĚ?",["A plus tard", "Allo", "Coucou", "Salut"], "A plus tard"),
    new Question("Ce √ģnseamnńÉ  ‚ÄěBonne nuit‚ÄĚ?",["BunńÉ diminea»õa", "La revedere", "BunńÉ ziua", "Noapte BunńÉ"], "Noapte BunńÉ"), 
    new Question("Cum se spune ‚Äě√émi cer scuze‚ÄĚ?", ["Je dois y aller", "Je suis d√©sol√©", "Au revoir", "Bonne nuit"], "Je suis d√©sol√©"), 
    new Question("Ce √ģnseamnńÉ  ‚ÄěCoucou‚ÄĚ?",  ["BunńÉ ziua", "BunńÉ diminea»õa", "Salut", "La revedere"], "Salut")
  ];
  var time_french = [
      new Question("Cum se traduce ‚ÄěDupńÉ-amiazńÉ‚ÄĚ?", ["noon", "demie" ,"l'apr√®s-midi", "jeudi"], "l'apr√®s-midi"),
      new Question("__________ se traduce ‚ÄěLuni‚ÄĚ?", ["samedi", "lundi", "vendredi", "jeudi"], "lundi"),
      new Question("Cum se traduce ‚ÄěAstńÉzi‚ÄĚ", ["samedi", "lundi", "hier", "aujourd'hui"], "aujourd'hui"),
      new Question("‚ÄěHier‚ÄĚ √ģnseamnńÉ:", ["Ieri", "AstńÉzi", "Diminea»õńÉ", "M√Ęine"], "Ieri" ), 
      new Question("Cum se traduce ‚ÄěsearńÉ‚ÄĚ?", ["soir", "midi", "quart", "demie"], "soir"), 
      new Question("______________√ģnseamnńÉ ‚Äědemain‚ÄĚ ",  ["Vineri", "M√Ęine", "Septembrie", "Noi"], "M√Ęine")
 ];
  var verb_french = [
    new Question("Cum se traduce ‚ÄěA merge‚ÄĚ?", ["aller", "devoir", "√™tre", "dire"], "aller"),
    new Question("Ce √ģnseamnńÉ ‚Äěcomer‚ÄĚ?", ["A merge", "A m√Ęnca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce ‚ÄěA avea‚ÄĚ?",["devoir", "√™tre", "avoir", "dire"], "avoir"),
    new Question("‚ÄěVoler‚ÄĚ √ģnseamnńÉ:",["A dormi", "A merge", "A zbura", "A pl√Ęnge"], "a zbura"), 
    new Question("Cum se traduce ‚ÄěA gńÉsi‚ÄĚ?", ["trouver", "aimer", "√™tre", "dire"], "trouver"), 
    new Question("‚Äě√™tre‚ÄĚ √ģnseamnńÉ",  ["A avea", "A merge", "A fi", "A trńÉi"], "A fi")
  ];
  var food_french = [
    new Question("Cum se traduce ‚ÄěCafea‚ÄĚ?", ["Caf√©", "Tomate" , "La pomme", "De terre"], "Caf√©"),
    new Question("Cum se traduce ‚ÄěCe dore»ôti sńÉ mńÉn√Ęnci‚ÄĚ?", ["Que voulez-vous manger?", "Le Caf√©, s'il vous plait", "Les l√©gumes", "L'addition, s'il vous plait"], "Que voulez-vous manger?"),
    new Question("Cum se traduce ‚ÄěM√Ęncare‚ÄĚ?",["La salade", "L'eau", "Nourriture", "P√Ętisseries"], "Nourriture"),
    new Question("‚ÄěL'eau‚ÄĚ √ģnseamnńÉ:",["SupńÉ", "Ceai", "Cafea", "ApńÉ"], "ApńÉ"), 
    new Question("Cum se traduce ‚ÄěPrńÉjituri‚ÄĚ", ["Nourriture", "P√Ętisseries", "La pomme", "De terre"], "P√Ętisseries"), 
    new Question("_________√ģnseamnńÉ ‚ÄěO cafea, te rog‚ÄĚ",  ["Que voulez-vous manger?", "Le Caf√©, s'il vous plait", "Les l√©gumes", "L'addition, s'il vous plait"],"Le Caf√©, s'il vous plait" )
   ];

  var pron_uk = [
    new Question("Cum se traduce ‚ÄěDumneavoastrńÉ‚ÄĚ(singular, formal)?", ["You", "They","Her", "Me"], "You"),
    new Question("Ce √ģnseamnńÉ \"You‚ÄĚ ?", ["Tu","Noi", "Voi", "Ea"], "Tu"),
    new Question("_____________ se traduce ‚ÄěNoi‚ÄĚ", ["They", "I", "We", "Your"], "We"),
    new Question("Cum se traduce ‚ÄěEa‚ÄĚ?", ["Him", "Them", "Yours", "She"], "She"), 
    new Question("‚ÄěWe‚ÄĚ √ģnseamnńÉ:  ", ["Tu","Noi","Ei", "Voi"], "Noi"), 
    new Question("‚ÄěThey‚ÄĚ √ģnseamnńÉ", ["Ea", "Tu", "Ei", "El"], "Ei")
  ];
  var greetings_uk = [
    new Question("Cum se traduce ‚ÄěBunńÉ diminea»õa‚ÄĚ?", ["Good day", "Good morning","Hello", "Good evening"], "Good morning"),
    new Question("Cum se traduce ‚ÄúBunńÉ‚ÄĚ?", ["Hello","Good day", "Good morning", "Bye"], "Hello"),
    new Question("Cum se traduce ‚ÄěCe faci?‚ÄĚ", ["Are you ok?", "How are you?", "Hello", "I don't know"], "How are you?"),
    new Question("Cum se traduce ‚ÄěBine ai venit‚ÄĚ?", ["Hello", "Welcome", "Good day", "Good morning"], "Welcome"), 
    new Question("Cum se traduce ‚ÄěCum te nume»ôti?‚ÄĚ ", ["What's your name?","Are you ok?", "How are you?", "Bye"], "What's your name?"), 
    new Question("Cum se traduce ‚ÄěDe unde e»ôti?‚ÄĚ ", ["What's your name?","Are you ok?", "Where are you from?", "Hey"], "Where are you from?")
];
var time_uk = [
    new Question("Cum se traduce ‚ÄěDupńÉ-amiazńÉ‚ÄĚ?", ["Afternoon", "Noon" ,"Tuesday", "September"], "Afternoon"),
    new Question("__________ se traduce ‚ÄěLuni‚ÄĚ?", ["July", "Monday", "Friday", "Tuesday"], "Monday"),
    new Question("Cum se traduce ‚ÄěC√Ęt este ceasul?‚ÄĚ", ["How are you?", "What time it is?","Are you ok?", "Where are you from?"], "What time it is?"),
    new Question("‚ÄěYesterday‚ÄĚ √ģnseamnńÉ:", ["Ieri", "AstńÉzi", "Diminea»õńÉ", "M√Ęine"], "Ieri" ), 
    new Question("Cum se traduce ‚ÄěAugust‚ÄĚ?", ["March", "September", "August", "April"], "August"), 
    new Question("______________√ģnseamnńÉ ‚ÄěTomorrow‚ÄĚ ",  ["Vineri", "M√Ęine", "Septembrie", "Noi"], "M√Ęine")
  ];
  var food_uk = [
    new Question("Cum se traduce ‚ÄěCafea‚ÄĚ?", ["Coffee", "Water" , "Food", "Apple"], "Coffee"),
    new Question("Cum se traduce ‚ÄěCe dore»ôti sńÉ mńÉn√Ęnci‚ÄĚ?", ["Are you tired?", "What would you like to eat?","Are you ok?", "Where are you from?"], "What would you like to eat?"),
    new Question("Cum se traduce ‚ÄěM√Ęncare‚ÄĚ?",["Water", "Tea", "Tomato", "Food"], "Food"),
    new Question("‚ÄěWater‚ÄĚ √ģnseamnńÉ:",["SupńÉ", "Ceai", "Cafea", "ApńÉ"], "ApńÉ"), 
    new Question("Cum se traduce ‚ÄěCe √ģ»õi place sńÉ mńÉn√Ęnci?‚ÄĚ", ["Whar do you like to eat?", "What would you like to eat?","Are you ok?", "Where are you from?"], "Whar do you like to eat?"), 
    new Question("_________√ģnseamnńÉ ‚ÄěO cafea, te rog‚ÄĚ",  ["How are you?", "What time it is?", "A coffee, please", "Thank you"],"A coffee, please" )
  ]; 
  var verb_uk = [
    new Question("Cum se traduce ‚ÄěA merge‚ÄĚ?", ["To try", "To go", "To be", "to run"], "To go"),
    new Question("Ce √ģnseamnńÉ ‚ÄěTo come‚ÄĚ?", ["A merge", "A m√Ęnca", "A dormi", "A veni"], "A veni"),
    new Question("Cum se traduce ‚ÄěA merge‚ÄĚ?",["To cry", "To walk", "To eat", "To see"], "To walk"),
    new Question("‚ÄěTo fly‚ÄĚ √ģnseamnńÉ:",["A dormi", "A merge", "A zbura", "A pl√Ęnge"], "A zbura"), 
    new Question("Cum se traduce ‚ÄěA r√Ęde‚ÄĚ?", ["To fly", "To watch", "To cry", "To laugh"], "To laugh"), 
    new Question("‚ÄěTo be‚ÄĚ √ģnseamnńÉ",  ["A avea", "A merge", "A fi", "A trńÉi"], "A fi")
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
    test_title="SalutńÉri";
    test_name_db="SalutńÉri Sp";
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
    test_title="M√Ęncare";
    test_name_db="M√Ęncare Sp";
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
    test_title="SalutńÉri";
    test_name_db="SalutńÉri Fr";
  }else if(test_name=="food_french"){
    var questions = food_french;
    test_title="M√Ęncare";
    test_name_db="M√Ęncare Fr";
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
    test_title="SalutńÉri";
    test_name_db="SalutńÉri Ge";
  }else if(test_name=="food_german"){
    var questions = food_german;
    test_title="M√Ęncare";
    test_name_db="M√Ęncare Ge";
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
    test_title="SalutńÉri";
    test_name_db="SalutńÉri En";
  }else if(test_name=="food_uk"){
    var questions = food_uk;
    test_title="M√Ęncare";
    test_name_db="M√Ęncare En";
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
        element.innerHTML = "RńÉspuns corect";
    }else{
        var element = document.getElementById("correct");
        document.getElementById("correct").style.color="red";
        element.innerHTML = "Gre»ôit.RńÉspunsul corect era: " + quiz.getQuestionIndex().answer;
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
