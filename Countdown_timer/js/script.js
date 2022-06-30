const myCelebration = "4 Sept 2022"; //12.00

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

function htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds){
    const dayNumber = document.querySelector('.days p');
    const hoursNumber = document.querySelector('.hours p');
    const minutesNumber = document.querySelector('.minutes p');
    const secondsNumber = document.querySelector('.seconds p');

    dayNumber.innerHTML = resultDays;
    hoursNumber.innerHTML = resultHours;
    minutesNumber.innerHTML = resultMinutes;
    secondsNumber.innerHTML = resultSeconds;
};

setInterval(countdown, 1000);
// countdown();