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
var alive = true;
var spawning = false;
var potions = 10;
function update() {
  pctHP = currentHP/totalHP * 100;
  get("hp").style.width = pctHP + "%";
  get("hpText").innerHTML = `${currentHP}/${totalHP} HP`;
  if (currentHP == 0 && alive) {
    createElement("p", "Game Over!", "map", "id", "gameOver");
    alive = false;
    stopTimer();
  }
  if (secLeft == 0 && !timerFinished) {
    stopTimer();
  }
  if (timeStops % 3 == 0 && timeStops != 0 && !shopOpen) {
    openShop();
    shopOpen = true;
  }
  if (timerRunning) {
    if (zombAct >= 5) {
      clearInterval(spawner);
      spawning = false;
    } else if (zombAct <= 0 && !spawning) {
      spawner = setInterval(spawnZombie, 2000);
      spawning = true;
    }
  }
  get("potionsLeft").innerHTML = `${potions} potions left`;
}
function startTimer() {
  if (!timerRunning && !timerFinished) {
    timing = setInterval(timer, speed);
    timerRunning = true;
    timerFinished = false;
    spawner = setInterval(spawnZombie, 2000);
    spawning = true;
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
  if (!shopButton) {
    let shopButton = document.createElement("button");
    shopButton.innerHTML = "Open shop";
    document.body.insertBefore(shopButton, get("accelerateButton"));
    shopButton.setAttribute("onclick", "openShop()");
    shopButton = true;
  }
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
  if (speed > 100) {
    clearInterval(timing);
    speed -= 100;
    timing = setInterval(timer, speed);
  }
}
function openShop() {
  if (!shopOpen) {
    createElement("p", "Welcome to the shop!", "shop");
    createElement("p", "Health Potion <br /> 1$", "shop");
  }
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
    case 69:
      kill();
      break;
    case 81:
      heal();
      break;
  }
}
function onKeyUp(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68:
      keyD = false;
      break;
    case 83:
      keyS = false;
      break;
    case 65:
      keyA = false;
      break;
    case 87:
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
    }
    if (keyS && tickX <= 590) {
      tickX += 10;
      player.top = `${tickX}px`;
      console.log("s pressed");
    }
    if (keyD && tickY >= 10) {
      tickY -= 10;
      player.right = `${tickY}px`;
      console.log("d pressed");
    }
    if (keyA && tickY <= 1290) {
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
var zombAct = 0;
var spawner = null;
setInterval(moveZombie, 100);
function spawnZombie() {
  if (timerRunning) {
    zombAct++;
    let zombProp = `_${zombNum}`;
    let zombID = `zomb${zombNum}`;
    let randomX = getRandom(500);
    let randomY = getRandom(1300);
    zombies[zombProp] = {};
    zombies[zombProp].hp = 3;
    zombies[zombProp].alive = true;
    zombies[zombProp].x = randomX;
    zombies[zombProp].y = randomY;
    zombies[zombProp].id = zombID;
    zombies[zombProp].playerRadius = false;
    createElement("img", null, "map", "src", "sprites/zombie_right.png", "id", zombID);
    get(zombID).style.position = "absolute";
    get(zombID).style.top = `${randomX}px`;
    get(zombID).style.right = `${randomY}px`;
    zombNum++;
  }
}
function moveZombie() {
  for (var zombie in zombies) {
    if (zombies[zombie] != null && timerRunning) {
      if (zombies[zombie].hp <= 0) {
        let zombieElement = get(zombies[zombie].id);
        zombieElement.parentNode.removeChild(zombieElement);
        zombies[zombie] = null;
        zombAct--;
        console.log("Zombie killed and deleted");
      }
      if (zombies[zombie] != null && zombies[zombie].hp >= 0) {
        if (zombies[zombie].x > tickX) {
          zombies[zombie].x -= 5;
        } else if (zombies[zombie].x < tickX) {
          zombies[zombie].x += 5;
        }
        if (zombies[zombie].y > tickY) {
          zombies[zombie].y -= 5;
        } else if (zombies[zombie].y < tickY) {
          zombies[zombie].y += 5;
        }
        if (zombies[zombie].y < tickY + 10 && zombies[zombie].y > tickY - 10 && zombies[zombie].x < tickX + 10 && zombies[zombie].x > tickX - 10) {
          zombies[zombie].playerRadius = true;
        } else {
          zombies[zombie].playerRadius = false;
        }
        get(zombies[zombie].id).style.top = `${zombies[zombie].x}px`;
        get(zombies[zombie].id).style.right = `${zombies[zombie].y}px`;
      }
    }
  }
}
function kill() {
  for (var zombie in zombies) {
    if (zombies[zombie] != null) {
      if (zombies[zombie].playerRadius) {
        zombies[zombie].hp -= 1;
      }
    }
  }
}
setInterval(attack, 1000);
function attack() {
  for (var zombie in zombies) {
    if (zombies[zombie] != null) {
      if (zombies[zombie].playerRadius && currentHP > 0) {
        currentHP--;
        if (currentHP <= 0) {
          currentHP = 0;
        }
      }
    }
  }
}
function heal() {
  if (potions > 0 && timerRunning && totalHP - 3 >= currentHP) {
    potions--;
    currentHP += 3;
    update();
  }
}