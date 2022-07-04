// Default date (12.00) 
const nextYear = new Date().getFullYear() + 1;
let myCelebration = `1 Jan ${nextYear}`;


// Document elems
const input_area = document.querySelector('.input_area');
const button = document.querySelector('.input_btn');
const input_cont = document.querySelector('.input_container');
const clr_button = document.querySelector('.clear_btn');

const date_input_area = document.querySelector('.date_input_area');
const date_button = document.querySelector('.date_input_btn');
const date_input_cont = document.querySelector('.date_input_container');
const date_clr_button = document.querySelector('.date_clear_btn');


// Countdown timer algorithm
function countdown(){
    const currentDate = new Date();
    const myCelebrationDate = new Date(myCelebration);
    const resultDate = myCelebrationDate - currentDate;

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


// Input area cleaning
function inputCleaning(){
    input_area.value = "";
};

function date_inputCleaning(){
    date_input_area.value = "";
};


//Input openning and closing 
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
};


// Clicking on the button 
button.addEventListener('click', toggleOfBtn);
clr_button.addEventListener('click', inputCleaning);

date_button.addEventListener('click',  date_toggleOfBtn);
date_clr_button.addEventListener('click',  date_inputCleaning);


// Writer of celebration name from text area and cleaning of area
document.addEventListener('keyup', function(event){
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
    input_area.value != "" & 
    input_area.classList.contains('active')) {
        const celebName = document.querySelector('h1');
        celebName.innerText = input_area.value;
        inputCleaning();
        toggleOfBtn ();
    };
    if (event.code === 'Escape' &
        input_area.classList.contains('active')) toggleOfBtn()
});

document.addEventListener('keyup', function(event){
    const currentDate = new Date().getDate;
    console.log(currentDate);
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
    date_input_area.classList.contains('active')) {
        myCelebration = date_input_area.value;
        celebName.innerText = date_input_area.value;
        date_inputCleaning();
        date_toggleOfBtn ();
    };
    if (event.code === 'Escape' &
        date_input_area.classList.contains('active')) date_toggleOfBtn()
});

// Areas cleaning after reload
document.addEventListener("DOMContentLoaded", function(){
    inputCleaning();
    input_area.blur();
    date_inputCleaning();
});


// Heart of the timer
setInterval(countdown, 1000);
