const myCelebration = "4 Sept 2022";

function countdown(){
  const currentDate = new Date();
  const myCelebrationDate = new Date(myCelebration);
  const resultDate = myCelebrationDate - currentDate;

  const resultSeconds = Math.floor(resultDate / 1000);
  const resultDays = Math.floor(resultSeconds / 60 / 60 / 24);
  const resultHours = Math.floor(resultSeconds / 60 / 60 );
  const resultMinutes = Math.floor(resultSeconds / 60);
 
 
  console.log(resultDays);
  console.log(resultHours);
  console.log(resultMinutes);
  console.log(resultSeconds);
}

countdown();