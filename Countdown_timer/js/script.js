// Default date (12.00) 
const nextYear = new Date().getFullYear() + 1;
const newYear = `1 Jan ${nextYear}`;
let myCelebration = newYear;

// Document elems
const input_area = document.querySelector('.input_area');
const button = document.querySelector('.input_btn');
const input_cont = document.querySelector('.text_container');
const clr_button = document.querySelector('.clear_btn');

const date_input_area = document.querySelector('.date_input_area');
const date_button = document.querySelector('.date_input_btn');
const date_input_cont = document.querySelector('.date_container');
const date_clr_button = document.querySelector('.date_clear_btn');
const confirm_button = document.querySelector('.confirm_btn');

const date_number = document.querySelector('.date_number');


// Countdown timer algorithm
function countdown(){
    const currentDate = new Date();
    const myCelebrationDate = new Date(myCelebration);
    let resultDate = myCelebrationDate - currentDate;
    if (resultDate < 0) resultDate = 0;
    if (resultDate === 0) finishFun();

    // Date signature calculation
    year = new Date(myCelebration).getFullYear();
    month = new Date(myCelebration);
    day = new Date(myCelebration).getDay() + 1;
    date_number.innerText = `${day} ${month.toLocaleString('eng', {month: 'short'})} ${year}`;

    // Timing calculation
    const totalSeconds = Math.floor(resultDate / 1000);

    const resultDays = Math.floor(totalSeconds / 60 / 60 / 24);
    const resultHours = Math.floor(totalSeconds / 60 / 60) % 24;
    const resultMinutes = Math.floor(totalSeconds / 60) % 60;
    const resultSeconds = Math.floor(totalSeconds) % 60;

    htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds);
}; 


// Writer of numbers in HTML from timer
function htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds){
    const dayNumber = document.querySelector('.days p');
    const hoursNumber = document.querySelector('.hours p');
    const minutesNumber = document.querySelector('.minutes p');
    const secondsNumber = document.querySelector('.seconds p');

    dayNumber.innerText = resultDays;
    hoursNumber.innerText = resultHours;
    minutesNumber.innerText = resultMinutes;
    secondsNumber.innerText = resultSeconds;
};

// Heart beats of the timer
setInterval(countdown, 1000);


// Input area cleaning
function inputCleaning(){
    input_area.value = "";
    input_area.focus();
};

function date_inputCleaning(){
    date_input_area.value = "";
    myCelebration = newYear;
};


// Input openning and closing 
function toggleOfBtn(){
    input_area.classList.toggle('active');
    button.classList.toggle('rotation');
    clr_button.classList.toggle('active');
    if (input_area.classList.contains('active')) 
    input_area.focus() // focus deleting from input
    else input_area.blur(); // focus on input
};

function date_toggleOfBtn(){
    date_input_area.classList.toggle('active');
    date_button.classList.toggle('rotation');
    date_clr_button.classList.toggle('active');
    confirm_button.classList.toggle('active');
};


// Clicking on the button 
button.addEventListener('click', toggleOfBtn);
clr_button.addEventListener('click', inputCleaning);

date_button.addEventListener('click',  date_toggleOfBtn);
date_clr_button.addEventListener('click',  date_inputCleaning);

confirm_button.addEventListener('click', () => {
    date_toggleOfBtn();
    date_number.innerText = myCelebration;
    if (date_input_area.value != "") myCelebration = date_input_area.value;
});

// Writer of celebration name from text area and cleaning of area
document.addEventListener('keyup', (event) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
    input_area.value != "" & 
    input_area.classList.contains('active')) {
        const celebName = document.querySelector('h1');
        celebName.innerText = input_area.value;
        toggleOfBtn ();
    };
    if (event.code === 'Escape' &
        input_area.classList.contains('active')) toggleOfBtn()
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Escape' &
        date_input_area.classList.contains('active')) date_toggleOfBtn()});


// Areas cleaning after reload
/*
document.addEventListener("DOMContentLoaded", () => {
    inputCleaning();
    input_area.blur();
    date_inputCleaning();
    const currentDate = new Date();
    date_input_area.value = currentDate;
});
*/


// Inputs closing by click outside 
document.addEventListener('click', (event) => {
    const insideInput1 = event.composedPath().includes(input_cont);
    const insideInput2 = event.composedPath().includes(date_input_cont);
    if (!insideInput1 & input_area.classList.contains('active')) toggleOfBtn();
    if (!insideInput2 & date_input_area.classList.contains('active')) date_toggleOfBtn();
});


// Notification of timer finish
function finishFun(){
    const celebName = document.querySelector('h1');
    if (!alert(`Bro, your timer \"${celebName.innerText}\" has been finished. Good luck!!!`)) {
        window.location.reload();
        inputCleaning();
        date_inputCleaning();
    }
};
