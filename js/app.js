// stores page hashes
var pages = {
  signin: "one",
  labelOne: "two",
  labelTwo: "three",
  app: "four"
}

var inputWon  = document.getElementById('won')
var inputLost = document.getElementById('lost');

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
  };
})
