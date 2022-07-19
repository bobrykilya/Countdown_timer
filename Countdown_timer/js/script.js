
// Document elems
const bg_image = document.querySelector('.bg-image');
const celebName = document.querySelector('h1');
const last_seconds = document.querySelector('#second-pair_last');


const input_area = document.querySelector('.input_area');
const button = document.querySelector('.input_btn');
const input_cont = document.querySelector('.text_container');
const clr_button = document.querySelector('.clear_btn');
const text_confirm_button = document.querySelector('.text_confirm');


const date_input_area = document.querySelector('.date_input_area');
const date_button = document.querySelector('.date_input_btn');
const date_input_cont = document.querySelector('.date_container');
const date_clr_button = document.querySelector('.date_clear_btn');
const date_confirm_button = document.querySelector('.date-confirm');
const calen_zone = document.querySelector('.calen-zone');
const calen_icon = document.querySelector('.calen-icon');
const today_notif = document.querySelector('.today-notif');


const time_zone = document.querySelector('.time-zone');
const time = document.querySelector('.time');
const time_clr_button = document.querySelector('.time-clear');
const time_icon = document.querySelector('.timer-icon');


const ok_reset = document.querySelector('.ok_btn');
const ok_reset_i = document.querySelector('.ok_btn_i');
const reload_btn = document.querySelector('.reload_btn');
const reset_text = document.querySelector('.reset_text');
const reload_cont = document.querySelector('.reload_container');

const date_number = document.querySelector('.date_number');

const confetti_cont = document.querySelector('.confetti_container');

// Default date (12.00) 
const nextYear = new Date().getFullYear() + 1;
const newYear = `${nextYear}-01-01`;
let myCelebration = newYear;
// console.log(myCelebration);

const currentDate = new Date();

date_input_area.value = currentDateShort()[0];
time.value = "00:00";


// Local storage handling
chekingData();
function chekingData(){
    if (localStorage.getItem('celeb_title')){
        celebName.innerText = localStorage.getItem('celeb_title');
        input_area.value = localStorage.getItem('celeb_title');
    };
    if (localStorage.getItem('celeb_date')){
        myCelebration = localStorage.getItem('celeb_date');
        recordCurrDate();
        date_input_area.value = myCelebration;
    };
};




// Heart beats of the timer
let secondInterval = setInterval(countdown, 1000);
countdown();


// Countdown timer algorithm
function countdown(){
    const currentDate = new Date();
    const myCelebrationDate = new Date(myCelebration);
    let resultDate = myCelebrationDate - currentDate;
    if (resultDate < 0) resultDate = 0;
    
    // Timing calculation
    const totalSeconds = Math.floor(resultDate / 1000);
    
    const resultDays = Math.floor(totalSeconds / 60 / 60 / 24);
    let resultHours = Math.floor(totalSeconds / 60 / 60) % 24 - 3;
    if (resultHours < 0) resultHours = 0;
    const resultMinutes = Math.floor(totalSeconds / 60) % 60;
    const resultSeconds = Math.floor(totalSeconds) % 60;
    

    htmlWriter(resultDays, resultHours, resultMinutes, resultSeconds);
    if (resultDays + resultHours + resultMinutes + resultSeconds === 0){ 
        last_seconds.classList.remove('notZeros');
        clearInterval(secondInterval);
        setTimeout(finishFun, 500);
    }else last_seconds.classList.add('notZeros');
    // setTimeout(finishFun, 5000);

    if (date_input_area.value == currentDateShort()[0])
        today_notif.classList.add('active')
    else today_notif.classList.remove('active');

    // Hour cheking for night mode
    nightMode();

    // Setting date limits
    dateLimits();

    return String(new Date()).slice(16,21);
}; 


// Writer of numbers in HTML from timer
function htmlWriter(resultDays, resultHours, resultMinutes, resultSeconds){
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
    // tomorrow = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1; // Сounting from zero
    day = new Date().getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return [`${year}-${month}-${day}`, `${year + 27}-${month}-${day}`];
};


// Ban on the use of past dates in calendar
function dateLimits(){
    minDate = currentDateShort()[0];
    maxDate = currentDateShort()[1];
    date_input_area.setAttribute('min', minDate);
    date_input_area.setAttribute('max', maxDate);
};


//Dive into the night
function nightMode(){
    const currentHour = String(new Date()).slice(15,18);
    // console.log(currentHour);
    if (currentHour > 19 || currentHour < 7)
    bg_image.classList.add('night-mode');
    else bg_image.classList.remove('night-mode');
};


if (getBrowserId() == 0){
    date_input_area.classList.add('forFirefox');
    calen_zone.classList.add('forFirefox');
    time_zone.classList.add('forFirefox');
    time.classList.add('forFirefox');
    calen_icon.classList.add('forFirefox');
    time_icon.classList.add('forFirefox');
    date_button.classList.add('forFirefox');
};


// Browser detecting
function getBrowserId(){
    let brKeys = ["Firefox", "Safari", "MSIE", "Chrome", "Opera", "Edg"];
    // console.log(navigator.userAgent);

    brKeys.forEach(brows => { 
        // console.log(brows);        
        if (navigator.userAgent.includes(brows)) BrIndx = brKeys.indexOf(brows);
    });
    return BrIndx;
};



// Time input processing and limits
// document.addEventListener('keydown', (event) => {
//     // console.log(event.code);
//     time_val = time.value;
    
//     time_pos = time.selectionStart;
        
//     // console.log(time_pos);

//     pos = time_val.slice(0, time.selectionStart).length;
//     // console.log(pos);
//     // console.log(time_pos);


//     if (event.code == 'Backspace') {
//         console.log(event.code);
//     };
//     });

    
function highlithError(class_name){
    class_name.classList.add('error')
    setTimeout(() => {
        class_name.classList.remove('error');
        },500);
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
    date_input_area.value = currentDateShort()[0];
    today_notif.classList.add('active');
};

function timeCleaning(){
    time.value = "00:00";
    // highlithError(time_icon);
    // highlithError(date_input_cont);
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
    calen_zone.classList.toggle('active');
    date_button.classList.toggle('rotation');
    date_clr_button.classList.toggle('active');
    date_confirm_button.classList.toggle('active');
    time_zone.classList.toggle('active');
    time.classList.toggle('active');
    time_clr_button.classList.toggle('active');
    // console.log(date_input_area.value);
    // console.log(myCelebration);
    if (date_input_area.value != localStorage.getItem('celeb_date') & 
        !date_input_area.classList.contains('active')) {
            setTimeout(() => {
                date_input_area.value = localStorage.getItem('celeb_date');
            }, 200);
        };
    if (!localStorage.getItem('celeb_date') &
        !date_input_area.classList.contains('active')) 
            setTimeout(() => {
                date_input_area.value = currentDateShort()[0];
            }, 200);

    if (time.value != localStorage.getItem('celeb_time') & 
    !date_input_area.classList.contains('active')) {
        setTimeout(() => {
            time.value = localStorage.getItem('celeb_time');
        }, 200);
    };
    if (!localStorage.getItem('celeb_time') &
    !date_input_area.classList.contains('active')) 
        setTimeout(() => {
            time.value = "00:00";
        }, 200);
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
    // date_inputCleaning();
    celebName.innerText = 'Until the new year';
    date_input_area.value = currentDateShort()[0];
    time.value = "00:00";
};

function dateConfirm(){
    // Inputs and date limits control
    if (date_input_area.value > currentDateShort()[1] || 
    date_input_area.value < currentDateShort()[0] || String(date_input_area.value.split('-')[0]).length > 4) {
        // console.log(date_input_area.value);
        if (time.value === "") {
            highlithError(time_icon);
        };
        highlithError(date_input_cont);
        highlithError(calen_icon);
        highlithError(date_button);
        return;
    };
    if (time.value === "") {
        highlithError(date_input_cont);
        highlithError(time_icon);
        return;
    };


    // Time control
    val_time_h = time.value.slice(0, 2);
    val_time_m = time.value.slice(3, 5);
    curr_time_h = countdown().slice(0, 2);
    curr_time_m = countdown().slice(3, 5);
    //console.log(val_time_m);
    //console.log(current_time_m);

    if (date_input_area.value === currentDateShort()[0]){ 
        if (val_time_h < curr_time_h || 
            (val_time_h == curr_time_h & val_time_m <= curr_time_m)){ 
            highlithError(date_input_cont);
            highlithError(time_icon);
            return;
        } else if (val_time_h == curr_time_h & val_time_m < curr_time_m);
    };


    // Success 
    if (date_input_area.value != "" & time.value != "") {
        myCelebration = date_input_area.value;
        CelebTime = time.value;
        localStorage.setItem('celeb_date', myCelebration);
        localStorage.setItem('celeb_time', CelebTime);
        date_toggleOfBtn();
        recordCurrDate();
        date_confirm_button.blur();
        // console.log(time.value);
    };//else {
        // highlithError(date_input_cont);
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
date_confirm_button.addEventListener('click', dateConfirm);
time_clr_button.addEventListener('click',  timeCleaning);


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
        if (input_area.value === ""){
            highlithError(input_cont);
            return;
        };
        celebName.innerText = input_area.value;
        localStorage.setItem('celeb_title', input_area.value);
        toggleOfBtn();
    };
});


// Date'Enter' confirmation of  
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
        date_input_area.classList.contains('active')) {
        date_confirm_button.focus();
        dateConfirm();
    };
});

// Handling date input editing
window.addEventListener('input', () => {
    if (date_input_area.value == currentDateShort()[0])
        today_notif.classList.add('active')
    else today_notif.classList.remove('active');
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
