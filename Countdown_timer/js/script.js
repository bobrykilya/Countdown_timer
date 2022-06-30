const myCelebration = "4 Sept 2022"; //12.00

function countdown(){
  const currentDate = new Date();
  const myCelebrationDate = new Date(myCelebration);
  const resultDate = myCelebrationDate - currentDate;

  const totalSeconds = Math.floor(resultDate / 1000);
  const resultDays = Math.floor(totalSeconds / 60 / 60 / 24);
  const resultHours = Math.floor(totalSeconds / 60 / 60 - resultDays * 24);
  const resultMinutes = Math.floor(totalSeconds / 60 - resultDays * 24 * 60 - resultHours * 60);
  const resultSeconds = Math.floor(totalSeconds - resultDays * 24 * 60 * 60 - resultHours * 60 * 60 - resultMinutes * 60);
 
  // console.log("Days: " + resultDays);
  // console.log("Hours: " + resultHours);
  // console.log("Minutes: " + resultMinutes);
  // console.log("Seconds: " + resultSeconds);
  // console.log("---------");

  htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds);
}; 

function htmlwriter(resultDays, resultHours, resultMinutes, resultSeconds){
  const dayNumber = document.querySelector('.days p')
  console.log(dayNumber)
}
// setInterval(countdown, 1000);