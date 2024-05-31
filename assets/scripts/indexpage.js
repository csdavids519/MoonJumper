const howToPlayText = document.querySelector(".splash_howtoplay");
const welcomeText = document.querySelector(".splash_welcome");
const backButton = document.querySelector(".backButton");
const howToButton = document.querySelector(".howToButton");

const howToButtonEl = document.getElementById("howToButton");
const backButtonEl = document.getElementById("backButton");

// click how to play button display new text and back button, hide welcome text and how to button
howToButtonEl.addEventListener('click', () => {
    howToPlayText.classList.add('active');
    backButton.classList.add('active');
    welcomeText.classList.remove('active');
    howToButton.classList.remove('active');
});

// click back button 
backButtonEl.addEventListener('click', () => {
    howToPlayText.classList.remove('active');
    backButton.classList.remove('active');
    welcomeText.classList.add('active');
    howToButton.classList.add('active');
});