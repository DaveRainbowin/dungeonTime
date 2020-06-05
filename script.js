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
  if (!timerRunning && !timerFinished) {
    timing = setInterval(timer, speed);
    timerRunning = true;
    timerFinished = false;
  } else if (!timerRunning && timerFinished){
    secLeft = 300;
    minLeft = 5;
    timerTemp = `5:00`;
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
  let shopButton = document.createElement("button");
  shopButton.innerHTML = "Open shop";
  document.body.insertBefore(shopButton, get("accelerateButton"));
  shopButton.setAttribute("onclick", "openShop()");
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
  createElement("p", "Health Potion <br /> 1$", "shop");
}
function get(id) {
  return document.getElementById(id);
}
function createElement(type, content, area, attr, info, attr2, info2) {
  var tempType = document.createElement(type);
  if (content) {
    tempType.innerHTML = content;
  }
  if (attr && info) {
    tempType.setAttribute(attr, info);
  }
  if (attr2 && info2) {
    tempType.setAttribute(attr2, info2);
  }
  get(area).appendChild(tempType);
}
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var tickX = 300;
var tickY = 650;
var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var zombies = {
};
setInterval(movePlayer, 100);
function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68:
      keyD = true;
      break;
    case 83:
      keyS = true;
      break;
    case 65:
      keyA = true;
      break;
    case 87:
      keyW = true;
      break;
  }
}
function onKeyUp(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68: //d
      keyD = false;
      break;
    case 83: //s
      keyS = false;
      break;
    case 65: //a
      keyA = false;
      break;
    case 87: //w
      keyW = false;
      break;
  }
}
function movePlayer() {
  let player = get("player").style;
  if (timerRunning) {
    if (keyW && tickX >= 10) {
      tickX -= 10;
      player.top = `${tickX}px`;
      console.log("w pressed");
    } else if (keyS && tickX <= 1290) {
      tickX += 10;
      player.top = `${tickX}px`;
      console.log("s pressed");
    } else if (keyD && tickY >= 10) {
      tickY -= 10;
      player.right = `${tickY}px`;
      console.log("d pressed");
    } else if (keyA && tickY <= 590) {
      tickY += 10;
      player.right = `${tickY}px`;
      console.log("a pressed");
    }
  }
}
function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var zombNum = 0;
function spawnZombie() {
  let zombProp = `_${zombNum}`;
  let zombID = `zomb${zombNum}`;
  let randomX = getRandom(500);
  let randomY = getRandom(1300);
  zombies[zombProp] = {};
  zombies[zombProp].hp = 3;
  zombies[zombProp].alive = true;
  zombies[zombProp].x = randomX;
  zombies[zombProp].y = randomY;
  createElement("img", null, "map", "src", "sprites/zombie_right.png", "id", zombID);
  get(zombID).style.position = "absolute";
  get(zombID).style.top = `${randomX}px`;
  get(zombID).style.right = `${randomY}px`;
  zombNum++;
}
function moveZombie() {
  // move each zombie towards the player
}