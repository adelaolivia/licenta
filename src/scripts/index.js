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

let user_uid = null;

/* COMMON FUNCTIONS
------------------------------*/

function userStuff(){
	isUserAuth();
}

function isUserAuth(){
	if(window.localStorage){
		var locUrl = window.location;
		var locParts = locUrl.toString().split('/');

		if(sessionStorage.getItem('user') == null){
			//console.log('User not logged');
			if(!(locParts[locParts.length-1] =='login.html'))
				window.location='login.html';
		}else{
			//console.log('Welcome: ' + sessionStorage.getItem('user'));
			user_uid = sessionStorage.getItem('user');
			if(!(locParts[locParts.length-1] =='login.html'))
				askUserName();
		}
	}
}

function askUserName(){
	let user_label  = document.getElementById('user_label'),
		text 		= '<i class="material-icons">perm_identity</i> ';

	firebase.database().ref('/user/'+user_uid).once('value').then(function(user_data){
		let data = user_data.val();
		if(data.username==null){
			user_label.innerHTML = text + data.email;
		}else{
			user_label.innerHTML = text + data.username;
		}
	});
}

function logoutUser(){
	sessionStorage.clear();
	window.location = 'login.html';
}

function controlResponsiveBar(){
	let bar = document.getElementById('navbar'),
		btn = document.getElementById('mobile_menu_button'),
		txt = document.getElementById('text_mobile_menu_button');

	if(btn.getAttribute('status')=='hidden'){
		bar.classList.remove('display_none');
		bar.classList.add('display_inline');
		bar.classList.add('responsive_inline');
		txt.textContent = "close";
		btn.setAttribute('status', 'show');
	}else{
		bar.classList.remove('display_inline');
		bar.classList.add('display_none');
		txt.textContent = "menu";
		btn.setAttribute('status', 'hidden');
	}
}

/* INDEX PAGE
---------------------------------------------*/
function loadIndex(){
	var queries = document.getElementsByClassName('feed_question');

	for(var i=0; i<queries.length; i++){
		var element = queries[i];

		hideAnsweredQuestions(element, i);
	}
}

function hideAnsweredQuestions(element, i){

	console.log(`For ${i}: ${element.id}`);
	firebase.database().ref('/questions/'+user_uid+`/${element.id}`).once('value').then(function(query_data){
		query_data = query_data.val();

		console.log(query_data);
		if(query_data!=null){
			firebase.database().ref(`/questions_title/${element.id}`).once('value').then(function(title){
				title = title.val();
				console.log(title);

				var answer = query_data.answer;

				element.classList.remove('feed_question');
				element.classList.add('feed_question_answered');

				element.innerHTML = `<div class="answered"><div class="answered_body"><h3 class="answered_title">${title}</h3><p class="answered_text">Ai ales ${answer}!</p></div>`;
				console.log(element.innerHTML);
			});
		}
	});
}

function submitQuestion(elem){
	var form_id = elem.getAttribute("id"),
		answer  = null,
		inputs  = elem.children[1].getElementsByTagName('input');


	for(let i=0; i<inputs.length; i++){
		if(inputs[i].checked){
			answer = inputs[i].value;
		}
	}

	if (answer!=null) {
		console.log(form_id + ": " + answer);
		firebase.database().ref('/questions/'+user_uid+`/${form_id}/`).set({
			answer: answer
		}).then(function(response){
			console.log('/questions/'+user_uid+`/${form_id}`);
			loadIndex();
		});
	}
}

/* LOGIN PAGE
--------------------------------------------*/

function loginUser(){
	let username = document.getElementById('usr').value,
		password = document.getElementById('pwd').value,
		errormsg = document.getElementById('error_message');

	//Check if user/pwd is correct
	firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
		//If error in login
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
		errormsg.textContent = errorMessage;
	}).then(function(info){
		//Create a sessionStorage
		sessionStorage.setItem('user', info.user.uid);
		if(info!=null)
			window.location = 'index.html';
	});

}

function registerUser(){
	document.getElementById("side_div").style.backgroundColor="#f7f7ff";
	document.getElementById("login_title").innerHTML="Creează un cont nou";
	document.getElementById("login_btn").style.visibility="hidden";
	let username = document.getElementById('usr').value,
		password = document.getElementById('pwd').value,
		errormsg = document.getElementById('error_message');

	firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
		//If error in register
		var errorCode = error.code;
		var errorMessage = error.message;
	 	errormsg.textContent = errorMessage;
	}).then(function(info){
		if(info!=null){
			sessionStorage.setItem('user', info.user.uid);
			firebase.database().ref('/user/' + info.user.uid).set({
			    username: null,
			    email: username,
			}).then(function(data){
				window.location = 'index.html';
			});

		}
	});
}

function enterListener(){
	document.getElementById('pwd').addEventListener("keypress", function(event){
		if(event.keyCode==13)
			document.getElementById("login_btn").click();
	});
}

/* TESTS_PAGE
--------------------------------------------*/

function goToTest(obj){
	window.location = `test_mul.html?test=${obj.getAttribute("test")}`;
}

function goToTestComplete(obj){
	window.location = `test_complete.html?test_complete=${obj.getAttribute("test_complete")}`;
}

function goToTestDragDrop(obj){
	window.location = `test_3.html?test_3=${obj.getAttribute("test_3")}`;

}

/* USER SETTINGS
----------------------------------*/

function userSettings(){
	let email_label = document.getElementById('email_label'),
		user_txt 	= document.getElementById('us_username');

	firebase.database().ref('/user/'+user_uid).once('value').then(function(user_data){
		let data = user_data.val();
		email_label.textContent = data.email;
		if(data.username!=null){
			user_txt.value = data.username;
		}else{
			user_txt.value = "";
		}
	});
}

function showChangePassword(){
	let content = document.getElementById('us_side_bar'),
		i = 0;

	let showing = setInterval(function(){
		content.style.top = `${i}em`;
		content.style.opacity = (i*10)/100;
		i += 0.1;
		if(i>10)
			clearInterval(showing);
	}, 1);
}

function deleteAccount(){
	let user 		= firebase.auth().currentUser,
		nulldata 	= {};

	user.delete().then(function() {
		sessionStorage.clear();
		firebase.database().ref('/user/'+user_uid).set({});
		window.location = 'login2.html';
	}).catch(function(error) {
		console.log(error);
	});
}

function hideDelete(){
	let delete_warning = document.getElementById('delete_warning_bg');
	delete_warning.style.display = 'none';
}

function showDelete(){
	let delete_warning = document.getElementById('delete_warning_bg');
	delete_warning.style.display = 'block';
}

function changePassword(){
	let old_pwd 		= document.getElementById('old_password'),
		new_pwd 		= document.getElementById('new_password'),
		new_pwd_again 	= document.getElementById('new_password_again'),
		pwd_message 	= document.getElementById('password_message'),
		user 			= firebase.auth().currentUser;

	if(new_pwd.value == new_pwd_again.value){
		firebase.auth().signInWithEmailAndPassword(user.email, old_pwd.value).catch(function(error){
			pwd_message.style.color = "#F20006";
			pwd_message.textContent = "Current password is not correct";
		}).then(function(info){
			if(info!=null){
				user.updatePassword(new_pwd.value).then(function() {
					pwd_message.style.color = "#57CA31";
					pwd_message.textContent = "Successfully updated!";
				}).catch(function(error) {
					pwd_message.textContent = error;
					pwd_message.style.color = "#F20006";
					console.log(error);
				});
			}
		});
	}else{
		pwd_message.style.color = "#F20006";
		pwd_message.textContent = "New password are different";
	}

}

function updateProfile(){
	let user_txt 	= document.getElementById('us_username'),
		user_email	= null;

	firebase.database().ref('/user/'+user_uid).once('value').then(function(user_data){
		user_email = user_data.val().email;
	}).then(function(){
		firebase.database().ref('/user/'+user_uid).set({
		    username: user_txt.value,
		    email: user_email
		}).then(function(){
			window.location = 'index.html';
		});
	});


}

/* RESULTS PAGE
------------------------------------------------*/

function loadStats(){

	let donetests = 0,
		av_score  = 0,
		perfects  = 0;

	firebase.database().ref('/scores/'+user_uid).once('value').then(function(score_data){
		score_data = score_data.val();
		let counter = 1;
		while(score_data[counter]!=null){
			let score_str = score_data[counter].score,
				score_arr = score_str.split('_');
			av_score += ((score_arr[0] / score_arr[1])*100);
			if(score_arr[0] == score_arr [1])
				perfects++;
			counter++;
		}
		donetests = counter-1;
		av_score = av_score/donetests;
	}).then(function(data){
		let label_donetests = document.getElementById('done_tests'),
			label_avscore 	= document.getElementById('av_score'),
			label_perfects 	= document.getElementById('perfects');

		let dt_time = 1, dt_speed = 1000/(donetests/dt_time), dt_count = 0,
			as_time = 2, as_speed = 1000/(av_score/as_time), as_count = 0,
			p_time = 1.5, p_speed = 1000/(perfects/p_time), p_count = 0;

		var dt_writer = setInterval(function(){
			label_donetests.textContent = dt_count;
			dt_count += 1;
			if (dt_count>donetests)
				clearInterval(dt_writer);
		}, dt_speed);

		var as_writer = setInterval(function(){
			label_avscore.textContent = `${as_count}%`;
			as_count += 1;
			if (as_count>av_score)
				clearInterval(as_writer);
		}, as_speed);

		var p_writer = setInterval(function(){
			label_perfects.textContent = p_count;
			p_count += 1;
			if (p_count>perfects)
				clearInterval(p_writer);
		}, p_speed);
	});
}

function loadGraphics(){
	let score_graphic 	= document.getElementById('score_graphic'),
		p_20 		 	= document.getElementById('percent_20'),
		p_40			= document.getElementById('percent_40'),
		p_60			= document.getElementById('percent_60'),
		p_80 			= document.getElementById('percent_80'),
		p_100 			= document.getElementById('percent_100');


	let total_height = 200, p20h = 0, p40h = 0, p60h = 0, p80h = 0, p100h =0,
		total_count  = 0  , p20c = 0, p40c = 0, p60c = 0, p80c = 0, p100c =0;

	//getting score data
	firebase.database().ref('/scores/'+user_uid).once('value').then(function(score_data){
		score_data = score_data.val();
		let i=1;
		while(score_data[i]!=null){
			let score 	= score_data[i].score.split('_'),
				percent = ((score[0] / score[1])*100 );

			if(percent<80){
				if(percent<60){
					if(percent<40){
						if(percent<20){
							p20c++;
						}else{
							p40c++;
						}
					}else{
						p60c++;
					}
				}else{
					p80c++;
				}
			}else{
				p100c++;
			}

			i++;
		}
	}).then(function(info){
		total_count = p20c + p40c + p60c + p80c + p100c;

		p20h = (p20c/total_count)*total_height;
		p40h = (p40c/total_count)*total_height;
		p60h = (p60c/total_count)*total_height;
		p80h = (p80c/total_count)*total_height;
		p100h = (p100c/total_count)*total_height;

		let j=0, it=100, h20c = 0, h40c = 0, h60c = 0, h80c = 0, h100c = 0;
			graphic_grow = setInterval(function(){
				h20c += (p20h/it);
				p_20.style.height = `${h20c}px`;
				h40c += (p40h/it);
				p_40.style.height = `${h40c}px`;
				h60c += (p60h/it);
				p_60.style.height = `${h60c}px`;
				h80c += (p80h/it);
				p_80.style.height = `${h80c}px`;
				h100c += (p100h/it);
				p_100.style.height = `${h100c}px`;
				if(j>it)
					clearInterval(graphic_grow);
				j++;
		}, 10);
	});
}

function showDetailedView(){
	let view = document.getElementById('hidden_details_view');

	view.style.display = 'flex';
}

function loadDetails(){
	firebase.database().ref('/scores/'+user_uid).once('value').then(function(score_data){
		let counter = 1, 
			details = document.getElementById('hidden_details_view');

		score_data = score_data.val();
		while(score_data[counter]!=null){
			let score_str  = score_data[counter].score,
				score_arr  = score_str.split('_'),
				testname   = score_data[counter].testname,
				percentage = Math.round(((score_arr[0] / score_arr[1])*100 ) * 100) / 100;

			details.innerHTML+= `<div class="test_details"><p class="test_title">${testname}</p><p class="test_score">${score_arr[0]} din ${score_arr[1]}</p><p class="test_score">${percentage}%</p></div>`;
			counter++;
		}
	});
}
