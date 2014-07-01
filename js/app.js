// stores page hashes
var pages = {
  signin: "one",
  labelOne: "two",
  labelTwo: "three",
  app: "four"
}

// hide preloader, goto signin page
document.querySelector('body').classList.add('active')
window.location.hash = pages.signin;