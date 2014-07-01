// stores page hashes
var pages = {
  signin: "one",
  labelOne: "two",
  labelTwo: "three",
  app: "four"
}

var inputWon  = document.getElementById('won')
var inputLost = document.getElementById('lost');

var lostCount;
var wonCount;

// hide preloader, goto signin page
document.querySelector('body').classList.add('active')
window.location.hash = pages.signin;

// On sign in
addEventListener('google-signin-success', function(e) {
  var wonLabel = localStorage.getItem('won-label');
	var lostLabel = localStorage.getItem('lost-label');

	if (wonLabel && lostLabel) {
		window.location.hash = pages.app;
	} else {
		window.location.hash = pages.labelOne;
		inputLost.focus();
	}
})


// Listen for a keydown event on label input fields.
// When enter is pressed, save label name in localStorage
// and move to the next screen. Focus on next input field.
// After collecting label names move to app page.
inputLost.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    localStorage.setItem('lost-label', e.target.value)
    window.location.hash = pages.labelTwo; // goto second label page
    inputWon.focus() // set focus on second label input
  };
})

inputWon.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    localStorage.setItem('won-label', e.target.value)
    window.location.hash = pages.app;
    getGmailData()
  };
})


// When on App page get Gmail data
var getGmailData = function() {

	// show page preloader 
  document.body.classList.remove('active');

	gapi.client.load('gmail', 'v1', function(e) {
		var gmail = gapi.client.gmail;

		// get lost leads
		var requestLostEmails = gmail.users.threads.list({
			userId: 'me',
			q: 'label:' + localStorage.getItem('lost-label')
		})

		requestLostEmails.execute(function(response) {
			// set counter
			lostCount = response.threads ? response.threads.length : 0;

			// if other request is already finished
			// then update view
			if (wonCount !== undefined) {
				updateView();
			};
		})

		// get won leads
		var requestWonEmails = gmail.users.threads.list({
			userId: 'me',
			q: 'label:' + localStorage.getItem('won-label')
		})

		requestWonEmails.execute(function(response) {
			// set counter
			wonCount = response.threads ? response.threads.length : 0;

			if (lostCount !== undefined) {
				updateView();
			};
		})

	})
}


// All the data is ready, update app view
var updateView = function() {
	// get app component
	var app = document.querySelector('gmail-conversions');

	// update component view
	app.won = wonCount;
	app.lost = lostCount;
	app.wonLabel = localStorage.getItem('won-label');
	app.lostLabel = localStorage.getItem('lost-label');

	// hide preloader
	document.body.classList.add('active');
}