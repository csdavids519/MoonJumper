const howToPlayText = document.querySelector(".splash_howtoplay");
const welcomeText = document.querySelector(".splash_welcome");
const gamePreview = document.querySelector(".splash_overview");
const backButton = document.querySelector(".backButton");
const howToButton = document.querySelector(".howToButton");
const previewButton = document.querySelector(".gamePreviewButton");

const howToButtonEl = document.getElementById("howToButton");
const gamePreviewButtonEl = document.getElementById("gamePreviewButton");
const backButtonEl = document.getElementById("backButton");

// click how to play button display new text and back button, hide welcome text and how to button
howToButtonEl.addEventListener('click', () => {
    howToPlayText.classList.add('active');
    previewButton.classList.add('active');
    backButton.classList.add('active');
    welcomeText.classList.remove('active');
    howToButton.classList.remove('active');
});

// click game preview button 
gamePreviewButtonEl.addEventListener('click', () => {
    howToPlayText.classList.remove('active');
    previewButton.classList.remove('active');
    gamePreview.classList.add('active');
    backButton.classList.add('active');
});

// click back button 
backButtonEl.addEventListener('click', () => {
    howToPlayText.classList.remove('active');
    backButton.classList.remove('active');
    previewButton.classList.remove('active');
    gamePreview.classList.remove('active');
    welcomeText.classList.add('active');
    howToButton.classList.add('active');



});