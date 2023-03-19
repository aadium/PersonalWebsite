const secH = document.querySelector('.sech');
const minH = document.querySelector('.minh');
const hrH = document.querySelector('.hrh');

let prevSecondsDegrees = 90; // initialize previous secondsDegrees to 90 degrees

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  let secondsDegrees = ((seconds / 60) * 360) + 90;
  
  // check if secondsDegrees is less than previous secondsDegrees
  if (secondsDegrees < prevSecondsDegrees) {
    secondsDegrees += 360; // add 360 degrees to start from correct angle
  }
  
  secH.style.transform = `rotate(${secondsDegrees}deg)`;
  prevSecondsDegrees = secondsDegrees; // update prevSecondsDegrees

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minH.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hrH.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
