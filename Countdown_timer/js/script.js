
// Document elems
const bg_image = document.querySelector('.bg-img img');
const bg_cover = document.querySelector('.bg-cover');
const bg_cover_image = document.querySelector('.bg-cover img');
const bg_1 = document.querySelector('.bg_1');
const bg_2 = document.querySelector('.bg_2');
const bg_3 = document.querySelector('.bg_3');
const bg_4 = document.querySelector('.bg_4');
const bg_5 = document.querySelector('.bg_5');


const bg_container = document.querySelector('.bg-container');
const bg_all_imgs = document.querySelectorAll('.bg_img_btn');
const bg_cont = document.querySelector('.bg_cont');
const bg_btn = document.querySelector('.bg_btn');

const time_numbers = document.querySelectorAll('.counter_container p');
const all_elms = document.querySelectorAll('i');


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


const time_zone = document.querySelector('.time-zone');
const time = document.querySelector('.time');
const time_clr_button = document.querySelector('.time-clear');
const time_icon = document.querySelector('.timer-icon');

const today_notif = document.querySelector('.today');
const tomorow_notif = document.querySelector('.tomorrow');
const time_err = document.querySelector('.time_err');
const date_err = document.querySelector('.date_err');



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
let celebTime = "00:00";
time_numbers.forEach(el => {
    el.classList.add(`bg_1_active`); // Shadow color of main numbers
});
all_elms.forEach(el => {
    el.classList.add(`bg_1_act`); // Color of main btns
});
// console.log(myCelebration);

const currentDate = new Date();

date_input_area.value = currentDateShort()[0];
time.value = celebTime;


// Local storage handling
chekingData();
function chekingData(){
    if (localStorage.getItem('bg_picture')){
        const bg_pic_num = localStorage.getItem('bg_picture');
        bg_image.src = `img/${bg_pic_num}.jpg`;
        bgActivation(bg_pic_num);
    };
    if (localStorage.getItem('celeb_title')){
        const title = localStorage.getItem('celeb_title');
        celebName.innerText = title;
        input_area.value = title;
    };
    if (localStorage.getItem('celeb_date')){
        myCelebration = localStorage.getItem('celeb_date');
        recordCurrDate();
        date_input_area.value = myCelebration;
    };
    if (localStorage.getItem('celeb_time')){
        celebTime = localStorage.getItem('celeb_time');
        time.value = celebTime;
    };
};




// Heart beats of the timer
let secondInterval = setInterval(countdown, 1000);
countdown();


// Countdown timer algorithm
function countdown(){
    const currentDate = new Date();
    // console.log(myCelebration);
    const myCelebrationDate = new Date(myCelebration).setHours(celebTime.split(':')[0], celebTime.split(':')[1]);
    let resultDate = myCelebrationDate - currentDate;
    if (resultDate < 0) resultDate = 0;
    
    // Timing calculation
    const totalSeconds = Math.floor(resultDate / 1000);
    
    const resultDays = Math.floor(totalSeconds / 60 / 60 / 24);
    let resultHours = Math.floor(totalSeconds / 60 / 60) % 24;
    if (resultHours < 0) resultHours = 0;
    const resultMinutes = Math.floor(totalSeconds / 60) % 60;
    const resultSeconds = Math.floor(totalSeconds) % 60;
    // console.log(totalSeconds);
    
    // console.log(resultDays, resultHours, resultMinutes, resultSeconds);
    htmlWriter(resultDays, resultHours, resultMinutes, resultSeconds);
    if (resultDays + resultHours + resultMinutes + resultSeconds === 0){ 
        last_seconds.classList.remove('notZeros');
        clearInterval(secondInterval);
        setTimeout(finishFun, 500);
    }else last_seconds.classList.add('notZeros');
    // setTimeout(finishFun, 5000);

    today_activation();

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

    let tomorrow_day = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).getDate();
    return [`${year}-${month}-${day}`, `${year + 27}-${month}-${day}`, `${year}-${month}-${tomorrow_day}`];
};


// Ban on the use of past dates in calendar
function dateLimits(){
    minDate = currentDateShort()[0];
    maxDate = currentDateShort()[1];

    if (date_input_area.getAttribute('min') != minDate){
        date_input_area.setAttribute('min', minDate);
        date_input_area.setAttribute('max', maxDate);
    };
};


//Dive into the night
function nightMode(){
    const currentHour = String(new Date()).slice(15,18);
    // console.log(currentHour);
    if (currentHour > 19 || currentHour < 7){
        bg_image.classList.add('night-mode');
        bg_cover_image.classList.add('night-mode');
    } else {
        bg_image.classList.remove('night-mode');
        bg_cover_image.classList.remove('night-mode');
    };
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

function today_activation(){
    if (date_input_area.value == currentDateShort()[0])
        today_notif.classList.add('active')
    else today_notif.classList.remove('active');

    if (date_input_area.value == currentDateShort()[2])
        tomorow_notif.classList.add('active')
    else tomorow_notif.classList.remove('active');
};

function highlightError(class_name){
    class_name.classList.add('error');
    setTimeout(() => {
        class_name.classList.remove('error');
        },500);
};

function notificError(notif_name){
    notif_name.classList.add('active');
    setTimeout(() => {
        notif_name.classList.remove('active');
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

function bg_toggleOfBtn(){
    bg_all_imgs.forEach(bg => bg.classList.toggle('active'));
    bg_cont.classList.toggle('active');
    bg_btn.classList.toggle('rotation');
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
    time.value = "00:00";
};

function dateConfirm(){
    // Inputs and date limits control
    if (date_input_area.value > currentDateShort()[1] || 
    date_input_area.value < currentDateShort()[0] || String(date_input_area.value.split('-')[0]).length > 4) {
        // console.log(date_input_area.value);
        if (time.value === "") {
            highlightError(time_icon);
            notificError(time_err);
        };
        highlightError(date_input_cont);
        highlightError(calen_icon);
        notificError(date_err);
        highlightError(date_button);
        return;
    };
    if (time.value === "") {
        highlightError(date_input_cont);
        highlightError(time_icon);
        notificError(time_err);
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
            highlightError(date_input_cont);
            highlightError(time_icon);
            notificError(time_err);
            return;
        };
    };


    // Success 
    if (date_input_area.value != "" & time.value != "") {
        myCelebration = date_input_area.value;
        celebTime = time.value;
        localStorage.setItem('celeb_date', myCelebration);
        if (time.value != "00:00") localStorage.setItem('celeb_time', celebTime);
        date_toggleOfBtn();
        recordCurrDate();
        date_confirm_button.blur();
        // console.log(time.value);
    };
};

function bgActivation(bg_num){

    bg_1.classList.remove('selected');
    bg_2.classList.remove('selected');
    bg_3.classList.remove('selected');
    bg_4.classList.remove('selected');
    bg_5.classList.remove('selected');
    eval(bg_num).classList.add('selected');

    all_elms.forEach(el => {
        el.classList.remove('bg_1_act', 'bg_2_act', 
                            'bg_3_act', 'bg_4_act', 
                            'bg_5_act');

        el.classList.add(`${bg_num}_act`);
    });

    time_numbers.forEach(el => {
        el.classList.remove('bg_1_active', 'bg_2_active', 
                            'bg_3_active', 'bg_4_active', 
                            'bg_5_active');

        el.classList.add(`${bg_num}_active`);
    });
};


function mainColors(){
    
    console.log(myColors);
    return myColors;
};

function bgChanging(bg_num){
    bg_cover_image.setAttribute('src', bg_image.getAttribute('src'));
    // console.log(bg_image.setAttribute('src'));
    bg_cover.style.display = 'block';
    setTimeout(() => {
        bg_image.setAttribute('src' ,`img/${bg_num}.jpg`);
        bg_image.addEventListener('load', () => {
            bg_cover.classList.add('active');
            setTimeout(() => {
                bg_cover.style.display = 'none';
                bg_cover.classList.remove('active');
            }, 650);
        });
    }, 10);
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
    highlightError(input_cont);
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

bg_btn.addEventListener('click', bg_toggleOfBtn);

bg_1.addEventListener('click', () =>{clickOnBg(1)});
bg_2.addEventListener('click', () =>{clickOnBg(2)});
bg_3.addEventListener('click', () =>{clickOnBg(3)});
bg_4.addEventListener('click', () =>{clickOnBg(4)});
bg_5.addEventListener('click', () =>{clickOnBg(5)});

function clickOnBg(bg){
    let bg_num = `bg_${bg}`;
    if (bg_num != localStorage.getItem('bg_picture')){
        bgChanging(bg_num);
        bgActivation(bg_num);
        localStorage.setItem('bg_picture', bg_num);
    };
};

// Date signature calculation
function recordCurrDate(){
    const myCelebrationDate = new Date(myCelebration);
    year = myCelebrationDate.getFullYear();
    month = myCelebrationDate.toLocaleString('eng', {month: 'short'});
    day = myCelebrationDate.getDate();
    date_number.innerText = `${day} ${month} ${year}`;
};


// Writer of celebration name from text area and cleaning of area
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') &
        input_area.classList.contains('active')) {
        if (input_area.value === ""){
            highlightError(input_cont);
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
date_input_area.addEventListener('input', today_activation);


//Escape tap handling
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' &
        input_area.classList.contains('active')) toggleOfBtn();
    if (event.code === 'Escape' &
        date_input_area.classList.contains('active')) date_toggleOfBtn()
    if (event.code === 'Escape' &
        ok_reset.classList.contains('active')) reset_toggleOfBtn()
    if (event.code === 'Escape' &
        bg_cont.classList.contains('active')) bg_toggleOfBtn()
});


// Inputs closing by click outside 
document.addEventListener('click', (event) => {
    const insideInput1 = event.composedPath().includes(input_cont);
    const insideInput2 = event.composedPath().includes(date_input_cont);
    const insideInput3 = event.composedPath().includes(reload_cont);
    const insideInput4 = event.composedPath().includes(bg_container);
    
    if (!insideInput1 & input_area.classList.contains('active')) toggleOfBtn();
    if (!insideInput2 & date_input_area.classList.contains('active')) date_toggleOfBtn();
    if (!insideInput3 & ok_reset.classList.contains('active')) reset_toggleOfBtn();
    if (!insideInput4 & bg_cont.classList.contains('active')) bg_toggleOfBtn();
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
        };
    };
};
