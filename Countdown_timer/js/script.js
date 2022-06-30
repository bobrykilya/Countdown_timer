const myCelebration = "1 Jan 2023"; //12.00

const nameOfHoliday = document.querySelector('.nameOfHoliday');
const button = document.querySelector('.input_btn');
const input_cont = document.querySelector('.input_container');

//Countdown timer algorithm
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

//Writer of numbers in HTML from timer
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
    nameOfHoliday.value = "";
};

//Input openning and closing 
function toggleOfBtn(){
    nameOfHoliday.classList.toggle('active');
    nameOfHoliday.focus();
    if (!nameOfHoliday.classList.contains('active')) nameOfHoliday.blur();
};

//Writing without opened input
/*
document.addEventListener('keydown', function(event){
    if (!nameOfHoliday.classList.contains('active')){
        toggleOfBtn()
    };
});
*/

//Clicking on the button 
button.addEventListener('click', toggleOfBtn);

//Writer of celebration name from text area and cleaning of area
document.addEventListener('keyup', function(event){
    if (event.code === 'Enter' & nameOfHoliday.value != "") {
        const celebName = document.querySelector('h1');
        celebName.innerText = nameOfHoliday.value;
        inputCleaning();
        toggleOfBtn ();
        nameOfHoliday.blur(); //focus deleting from input
    };
    if (event.code === 'Escape' &
        nameOfHoliday.classList.contains('active')) toggleOfBtn()
});

document.addEventListener("DOMContentLoaded", function(){
    inputCleaning();
    nameOfHoliday.blur();
});

//Heart of the timer
setInterval(countdown, 1000);