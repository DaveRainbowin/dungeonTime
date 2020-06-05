var totalHP = 50;
var currentHP = 50;
var pctHP = currentHP/totalHP * 100;
var secLeft = 300;
var minLeft = 5;
var timerTemp = `5:00`;
setInterval(update, 100);
var speed = 1000;
var timing = setInterval(null, 1000);
var timerRunning = false;
var timerFinished = false;
var timeStops = 0;
var shopOpen = false;
function update() {
  pctHP = currentHP/totalHP * 100;
  get("hp").style.width = pctHP + "%";
  get("hpText").innerHTML = `${currentHP}/${totalHP}HP`;
  if (secLeft == 0 && !timerFinished) {
    stopTimer();
  }
  if (timeStops % 3 == 0 && timeStops != 0 && !shopOpen) {
    openShop();
    shopOpen = true;
    return;
  }
}
function startTimer() {
  if (!timerRunning) {
    timing = setInterval(timer, speed);
    timerRunning = true;
    timerFinished = false;
  }
}
function stopTimer() {
  clearInterval(timing);
  timerRunning = false;
  secLeft = 0;
  minLeft = 0;
  timerTemp = `0:00`;
  timerFinished = true;
  get("timer").innerHTML = timerTemp;
  timeStops++;
}
function timer() {
  if (timerRunning) {
    secLeft--;
    minLeft = Math.floor(secLeft / 60);
    if (secLeft % 60 == 0 && secLeft != 0) {
      timerTemp = `${minLeft}:00`;
    } else if (secLeft - (60 * minLeft) < 10 & secLeft - (60 * minLeft) > 0) {
      timerTemp = `${minLeft}:0${secLeft - (60 * minLeft)}`;
    } else {
      timerTemp = `${minLeft}:${secLeft - (60 * minLeft)}`;
    }
    get("timer").innerHTML = timerTemp;
  } else if (timerFinished) {
    timerTemp = `0:00`;
    get("timer").innerHTML = timerTemp;
  }
}
function accelerate() {
  if (speed > 500) {
    speed -= 100;
    timing = setInterval(timer, speed);
  }
}
function openShop() {
  createElement("p", "Welcome to the shop!", "shop");
}
function get(id) {
  return document.getElementById(id);
}
function createElement(type, content, area) {
  let tempType = document.createElement(type);
  tempType.innerHTML = content;
  get(area).appendChild(tempType);
}