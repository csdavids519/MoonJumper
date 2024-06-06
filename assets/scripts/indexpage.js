const howToPlayText = document.querySelector(".splash_howtoplay");
const welcomeText = document.querySelector(".splash_welcome");
const gameControls = document.querySelector(".splash_controls");
const backButton = document.querySelector(".backButton");
const howToButton = document.querySelector(".howToButton");
const gameControlsButton = document.querySelector(".gameControlsButton");

const howToButtonEl = document.getElementById("howToButton");
const gameControlsButtonEl = document.getElementById("gameControlsButton");
const backButtonEl = document.getElementById("backButton");

const modalFuel = document.querySelector(".gamehint_fuel");
const modalJump = document.querySelector(".gamehint_jump");
const modalJetJump = document.querySelector(".gamehint_jetjump");
const ModalJumpObject = document.querySelector(".gamehint_jumpobject");
const modalScore = document.querySelector(".gamehint_score");

const openModalFuel = document.querySelector(".info_box_1");
const openModalJump = document.querySelector(".info_box_2");
const openModalJetJump = document.querySelector(".info_box_3");
const openModalJumpObject = document.querySelector(".info_box_4");
const openModalScore = document.querySelector(".info_box_5");

const closeModalFuel = document.querySelector(".modalclose_fuel");
const closeModalJump = document.querySelector(".modalclose_jump");
const closeModalJetJump = document.querySelector(".modalclose_jetjump");
const closeModalJumpObject = document.querySelector(".modalclose_jumpobject");
const closeModalScore = document.querySelector(".modalclose_score");


/********************
 * Manage event listeners and add remove classes
 ********************/

// click how to play button display new text and back button, hide welcome text and how to button
howToButtonEl.addEventListener('click', () => {
    howToPlayText.classList.add('active');
    gameControlsButton.classList.add('active');
    backButton.classList.add('active');
    welcomeText.classList.remove('active');
    howToButton.classList.remove('active');
});

// click game preview button 
gameControlsButtonEl.addEventListener('click', () => {
    howToPlayText.classList.remove('active');
    gameControlsButton.classList.remove('active');
    gameControls.classList.add('active');
    backButton.classList.add('active');
});

// click back button 
backButtonEl.addEventListener('click', () => {
    howToPlayText.classList.remove('active');
    backButton.classList.remove('active');
    gameControlsButton.classList.remove('active');
    gameControls.classList.remove('active');
    welcomeText.classList.add('active');
    howToButton.classList.add('active');
});


/********************
 * Manage Modals
 ********************/
openModalFuel.addEventListener('click', () => {
    modalFuel.showModal();
});

openModalJump.addEventListener('click', () => {
    modalJump.showModal();
});

openModalJetJump.addEventListener('click', () => {
    modalJetJump.showModal();
});

openModalJumpObject.addEventListener('click', () => {
    ModalJumpObject.showModal();
});

openModalScore.addEventListener('click', () => {
    modalScore.showModal();
});

closeModalFuel.addEventListener('click', () => {
    modalFuel.close();
});

closeModalJump.addEventListener('click', () => {
    modalJump.close();
});

closeModalJetJump.addEventListener('click', () => {
    modalJetJump.close();
});

closeModalJumpObject.addEventListener('click', () => {
    ModalJumpObject.close();
});

closeModalScore.addEventListener('click', () => {
    modalScore.close();
});