var config = {
  apiKey: "AIzaSyCT-QMSSlQGSLmP-LJjyH6qk8KE336At08",
  authDomain: "lang-mmp2.firebaseapp.com",
  databaseURL: "https://lang-mmp2.firebaseio.com",
  projectId: "lang-mmp2",
  storageBucket: "lang-mmp2.appspot.com",
  messagingSenderId: "178927936496"
};


firebase.initializeApp(config);


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


function whichTest(){
    let page_url        = window.location,
        page_attr       = page_url.toString().split('?'),
        attr_test       = page_attr[1].toString().split('='),
        test_name       = attr_test[1];
  
      return test_name;
  }
  
  let test_name = whichTest();

var correctCards = 0;
var score=8;
$( init );
var words_first;
var answer;
var test_db=null;

var colors_spanish_words=
['first', 'Verde', 'Amarillo', 'Azul', 'Rojo', 'Negro', 'Rosado', 'Morado', 'Blanco'];
var colors_spanish_answer=
['Verde', 'Galben', 'Albastru', 'Roșu', 'Negru', 'Roz', 'Mov', 'Alb'];

var animals_spanish_words=
['first', 'Abeja', 'Cisne', 'Gato', 'Jirafa', 'Perro', 'Conejo', 'León', 'Zorro'];
var animals_spanish_answer=
['Albină', 'Lebădă', 'Pisică', 'Girafă', 'Câine', 'Iepure', 'Leu', 'Vulpe'];

var colors_french_words=
['first', 'Vert', 'Jaune', 'Bleu', 'Rouge', 'Noir', 'Rosa', 'Pourpre', 'Blanc'];
var colors_french_answer=
['Verde', 'Galben', 'Albastru', 'Roșu', 'Negru', 'Roz', 'Mov', 'Alb'];

var animals_french_words=
['first', 'Abeille', 'Lapin', 'Chat', 'Requin', 'Chien', 'Serpent', 'Lion', 'Renard'];
var animals_french_answer=
['Albină', 'Iepure', 'Pisică', 'Rechin', 'Câine', 'Șarpe', 'Leu', 'Vulpe'];

var colors_german_words=
['first', 'Grün', 'Gelb', 'Blau', 'Rot', 'Schwarz', 'Rosa', 'Lila', 'Silber'];
var colors_german_answer=
['Verde', 'Galben', 'Albastru', 'Roșu', 'Negru', 'Roz', 'Mov', 'Argintiu'];

var animals_german_words=
['first', 'Biene', 'Hase', 'Katze', 'Giraffe', 'Hund', 'Schlange', 'Löwe', 'Fuchs'];
var animals_german_answer=
['Albină', 'Iepure', 'Pisică', 'Girafă', 'Câine', 'Șarpe', 'Leu', 'Vulpe'];

var colors_uk_words=
['first', 'Green', 'Yellow', 'Blue', 'Red', 'Black', 'Pink', 'Purple', 'White'];
var colors_uk_answer=
['Verde', 'Galben', 'Albastru', 'Roșu', 'Negru', 'Roz', 'Mov', 'Alb'];

var animals_uk_words=
['first', 'Bee', 'Swan', 'Cat', 'Giraffe', 'Parrot', 'Snake', 'Lion', 'Fox'];
var animals_uk_answer=
['Albină', 'Lebădă', 'Pisică', 'Girafă', 'Câine', 'Șarpe', 'Leu', 'Vulpe'];

if(test_name=="animals_spanish"){
    words_first=animals_spanish_words;
    answer=animals_spanish_answer;
    test_db="Animale Sp";
  }else if(test_name=="colors_spanish"){
    words_first=colors_spanish_words;
    answer=colors_spanish_answer;
    test_db="Culori Sp";
  }else if(test_name=="colors_french"){
    words_first=colors_french_words;
    answer=colors_french_answer;
    test_db="Culori Fr";
  }else if(test_name=="animals_french"){
    words_first=animals_french_words;
    answer=animals_french_answer;
    test_db="Animale Fr";
  }else if(test_name=="animals_uk"){
    words_first=animals_uk_words;
    answer=animals_uk_answer;
    test_db="Animale En";
  }else if(test_name=="colors_uk"){
    words_first=colors_uk_words;
    answer=colors_uk_answer;
    test_db="Culori En";
  }else if(test_name="animals_german"){
    words_first=animals_german_words;
    answer=animals_german_answer;
    test_db="Animale Ge";
  }else if(test_name="colors_german"){
    words_first=colors_german_words;
    answer=colors_german_answer;
    test_db="Culori Ge";
  }

function init() {

  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset button
  correctCards = 0;
  score=8;
  document.getElementById("show_score").innerHTML="Încercări rămase: " +score;
 
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Randomise
  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
  var words_before=words_first;
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<8; i++ ) {
    $('<div>' + words_before[numbers[i]] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Card slots
  var words = answer;
  for ( var i=1; i<=8; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );
  
  
    if ( slotNumber == cardNumber ) {
      ui.draggable.addClass( 'correct' );
      ui.draggable.draggable( 'disable' );
      $(this).droppable( 'disable' );
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      ui.draggable.draggable( 'option', 'revert', false );
      correctCards++;
    }else{
        score--;
        document.getElementById("show_score").innerHTML="Încercări rămase: " +score;
    }
    
   
    if ( correctCards == 8 || score== 0) {
      $('#successMessage').show();
      $('#successMessage').animate( {
        left: '380px',
        top: '200px',
        width: '400px',
        height: '300px',
        opacity: 1
      } );
      document.getElementById("score").innerHTML="Scorul este: " +score+" din 8.";
      
      var counter = 1;
    firebase.database().ref('/scores/'+user_uid).once('value').then(function(count_data){
    count_data = count_data.val();
    if(count_data!=null)
      while(count_data[counter]!=null){
        counter++;
      }
  }).then(function(){
    firebase.database().ref('/scores/'+user_uid+"/"+counter+"/").set({
      score : `${score}_8`,
      testname : test_db
    });
  });
    }
  
  }
