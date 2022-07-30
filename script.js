const dial = document.querySelector('.dial');

const radius = dial.offsetWidth / 2;
const rect = dial.getBoundingClientRect();
const dialX = rect.left + radius;
const dialY = rect.top + radius;

let currentRotation = 45;
let lastRotation = currentRotation;

function getDegress(x, y) {
  const radians = Math.atan2(x - dialX, y - dialY);
  const degrees = Math.round(radians * (180 / Math.PI) * -1 + 100);

  return degrees;
}

function getPosition(event) {
  console.log(event);
  const x = event.touches ? event.changedTouches[0].pageX * -100 : event.pageX;
  const y = event.touches ? event.changedTouches[0].pageY * -100 : event.pageY;

  return { x, y };
}

function setDegrees(event) {
  currentRotation = getDegress(...Object.values(getPosition(event))) - lastRotation;
}

function setRotation(degrees) {
  dial.style.transform = `rotate(${degrees}deg)`;
}

function rotate(event) {
  const degrees = getDegress(...Object.values(getPosition(event))) - currentRotation;

  setRotation(degrees);

  lastRotation = degrees;
}

setRotation(currentRotation);

dial.addEventListener('mousedown', event => {
  setDegrees(event);

  document.addEventListener('mousemove', rotate);
});

dial.addEventListener('touchstart', event => {
  setDegrees(event, true);

  document.addEventListener('touchmove', rotate);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', rotate);
});

document.addEventListener('touchend', () => {
  document.removeEventListener('touchmove', rotate);
});