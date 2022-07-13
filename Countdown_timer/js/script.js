// Default date (12.00) 
const nextYear = new Date().getFullYear() + 1;
const newYear = `${nextYear}-01-1`;
let myCelebration = newYear;

// Document elems
const input_area = document.querySelector('.input_area');
const button = document.querySelector('.input_btn');
const input_cont = document.querySelector('.text_container');
const clr_button = document.querySelector('.clear_btn');
const celebName = document.querySelector('h1');
const text_confirm_button = document.querySelector('.text_confirm');

const date_input_area = document.querySelector('.date_input_area');
const date_button = document.querySelector('.date_input_btn');
const date_input_cont = document.querySelector('.date_container');
const date_clr_button = document.querySelector('.date_clear_btn');
const date_confirm_button = document.querySelector('.date-confirm');



const date_number = document.querySelector('.date_number');

const bg_image = document.querySelector('.bg-image');
const ok_reset = document.querySelector('.ok_btn');
const ok_reset_i = document.querySelector('.ok_btn_i');
const reload_btn = document.querySelector('.reload_btn');
const reset_text = document.querySelector('.reset_text');
const reload_cont = document.querySelector('.reload_container');

const confetti_cont = document.querySelector('.confetti_container');

// date_input_area.value = newYear;

// Local storage handling
// let celeb_title
// let celeb_date

// localStorage.clear();

chekingData();
function chekingData(){
    if (localStorage.getItem('celeb_title')){
        celebName.innerText = localStorage.getItem('celeb_title');
        input_area.value = localStorage.getItem('celeb_title');
    };
    if (localStorage.getItem('celeb_date')){
        myCelebration = localStorage.getItem('celeb_date');
        recordCurrDate();
        date_input_area.value = localStorage.getItem('celeb_date');
    };
};

const currentDate = new Date();

pastDateCancel();

// Heart beats of the timer
countdown();
let secondInterval = setInterval(countdown, 1000);


// Countdown timer algorithm
function countdown(){
    const currentDate = new Date();
    const myCelebrationDate = new Date(myCelebration);
    let resultDate = myCelebrationDate - currentDate;
    if (resultDate < 0) resultDate = 0;
    

    //Hour cheking for night mode
    nightMode();
    
    // Timing calculation
    const totalSeconds = Math.floor(resultDate / 1000);
    
    const resultDays = Math.floor(totalSeconds / 60 / 60 / 24);
    let resultHours = Math.floor(totalSeconds / 60 / 60) % 24 - 3;
    if (resultHours < 0) resultHours = 0;
    const resultMinutes = Math.floor(totalSeconds / 60) % 60;
    const resultSeconds = Math.floor(totalSeconds) % 60;
    
    htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds);
    if (resultDays + resultHours + resultMinutes + resultSeconds === 0){ 
        clearInterval(secondInterval);
        setTimeout(finishFun, 500);
    }
    // setTimeout(finishFun, 5000);
}; 


// Writer of numbers in HTML from timer
function htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds){
    const dayNumber = document.querySelector('.days p');
    const hoursNumber = document.querySelector('.hours p');
    const minutesNumber = document.querySelector('.minutes p');
    const secondsNumber = document.querySelector('.seconds p');
    
    
    dayNumber.innerText = zeroAdding(resultDays);
    hoursNumber.innerText = zeroAdding(resultHours);
    minutesNumber.innerText = zeroAdding(resultMinutes);
    secondsNumber.innerText = zeroAdding(resultSeconds);
};

function zeroAdding(number){
    if (number < 10) number = "0" + number;
    return number;
};


//Calculation short form of current date
function currentDateShort(){
    year = currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate() + 1;
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    // console.log(day);
    return [`${year}-${month}-${day}`, `${year + 27}-${month}-${day}`];
};


// Ban on the use of past dates in calendar
function pastDateCancel(){
    minDate = currentDateShort()[0];
    maxDate = currentDateShort()[1];
    document.querySelector('.date_input_area').setAttribute('min', minDate);
    document.querySelector('.date_input_area').setAttribute('max', maxDate);
};


//Dive into the night
function nightMode(){
    const currentHour = String(new Date()).slice(15,18);
    // console.log(currentHour);
    if (currentHour > 19 || currentHour < 7)
    bg_image.classList.add('night-mode');
    else bg_image.classList.remove('night-mode');
};

// Input area cleaning
function inputCleaning(){
    input_area.value = "";
    input_area.focus();
    celebName.innerText = 'Until the new year';
    if (localStorage.getItem('celeb_title')) 
        localStorage.removeItem('celeb_title');
};

function date_inputCleaning(){
    date_input_area.value = "";
    // myCelebration = newYear;
};


// Input openning and closing 
function toggleOfBtn(){
    input_area.classList.toggle('active');
    button.classList.toggle('rotation');
    clr_button.classList.toggle('active');
    text_confirm_button.classList.toggle('active');
    if (input_area.classList.contains('active')) 
    input_area.focus() // focus on input
    else input_area.blur(); // focus deleting from input
};

function date_toggleOfBtn(){
    date_input_area.classList.toggle('active');
    date_button.classList.toggle('rotation');
    date_clr_button.classList.toggle('active');
    date_confirm_button.classList.toggle('active');
    // console.log(date_input_area.value);
    // console.log(myCelebration);
    if (date_input_area.value != myCelebration) 
    setTimeout(() => {date_input_area.value = myCelebration}, 200);
};

function reset_toggleOfBtn(){
    ok_reset.classList.toggle('active');
    reload_btn.classList.toggle('rotation');
    reset_text.classList.toggle('active');
};


// Resetting data on the doc
function reset_doc(){
    localStorage.clear();
    myCelebration = newYear;
    date_number.innerText = 'bobrikilya';
    input_area.value = "";
    input_area.blur();
    date_inputCleaning();
    celebName.innerText = 'Until the new year';
};

function highlithError(class_name){
    class_name.classList.add('error')
    setTimeout(() => {
        class_name.classList.remove('error');
        },500);
};

// Clicking on the button 
button.addEventListener('click', toggleOfBtn);
clr_button.addEventListener('click', inputCleaning);
text_confirm_button.addEventListener('click', () => {
    if (input_area.value != "") {
        celebName.innerText = input_area.value;
        localStorage.setItem('celeb_title', input_area.value);
        toggleOfBtn();
    } else {
    highlithError(input_cont);
    // highlithError(button);
    }
});


date_button.addEventListener('click',  date_toggleOfBtn);
date_clr_button.addEventListener('click', () => {
    date_inputCleaning();
    // recordCurrDate();
});
date_confirm_button.addEventListener('click', () => {
    // if (date_input_area.value > currentDateShort()[1] || 
    // date_input_area.value < currentDateShort()[0]) {
    //     highlithError(date_input_cont);
    //     highlithError(date_button);
    //     return;
    // };
    // console.log(date_input_area.value);
    if (date_input_area.value != "") {
        myCelebration = date_input_area.value;
        localStorage.setItem('celeb_date', myCelebration);
        date_toggleOfBtn();
        recordCurrDate();
    };
});


reload_btn.addEventListener('click', reset_toggleOfBtn);
ok_reset_i.addEventListener('click', () =>{
    reset_toggleOfBtn();
    reset_doc();
});

// Date signature calculation
function recordCurrDate(){
    const myCelebrationDate = new Date(myCelebration);
    year = myCelebrationDate.getFullYear();
    month = myCelebrationDate.toLocaleString('eng', {month: 'short'});
    day = myCelebrationDate.getDate();
    date_number.innerText = `${day} ${month} ${year}`;
};


// Writer of celebration name from text area and cleaning of area
document.addEventListener('keyup', (event) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
        input_area.classList.contains('active')) {
        if (input_area.value == ""){
            highlithError(input_cont);
            return;
        };
        celebName.innerText = input_area.value;
        localStorage.setItem('celeb_title', input_area.value);
        toggleOfBtn();
    };
});


// Date'Enter' confirmation of  
document.addEventListener('keyup', (event) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
        date_input_area.classList.contains('active')) {
        date_input_area.blur();
        date_confirm_button.focus();
        if (date_input_area.value > currentDateShort()[1] || 
            date_input_area.value < currentDateShort()[0]) {
            highlithError(date_input_cont);
            highlithError(date_button);
            return;
        };
        if (date_input_area.value != ""){
            myCelebration = date_input_area.value;
            localStorage.setItem('celeb_date', myCelebration);
            date_toggleOfBtn();
            recordCurrDate();
            date_confirm_button.blur();
        }else {
            highlithError(date_input_cont);
            highlithError(date_button);
        };
    };
});


//Escape tap handling
document.addEventListener('keyup', (event) => {
    if (event.code === 'Escape' &
        input_area.classList.contains('active')) toggleOfBtn();
    if (event.code === 'Escape' &
        date_input_area.classList.contains('active')) date_toggleOfBtn()
    if (event.code === 'Escape' &
        ok_reset.classList.contains('active')) reset_toggleOfBtn()
});


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
    const insideInput3 = event.composedPath().includes(reload_cont);
    
    if (!insideInput1 & input_area.classList.contains('active')) toggleOfBtn();
    if (!insideInput2 & date_input_area.classList.contains('active')) date_toggleOfBtn();
    if (!insideInput3 & ok_reset.classList.contains('active')) reset_toggleOfBtn();
});


// Notification of timer finish
function finishFun(){
    confetti_cont.classList.add('active');
    bg_image.classList.remove('night-mode');
    const celebName = document.querySelector('h1');
    setTimeout(alertReset, 1500);
    function alertReset(){
        if (!alert(`Bro, your timer \"${celebName.innerText}\" has been finished. Good luck!!!`)) {
            confetti_cont.classList.remove('active');
            inputCleaning();
            date_inputCleaning();
            reset_doc();
            secondInterval = setInterval(countdown, 1000);
            // window.location.reload();
        };
    };
};
