var totalHP = 50;
var currentHP = 50;
var pctHP = currentHP/totalHP * 100;
setInterval(update, 100);
function update() {
  pctHP = currentHP/totalHP * 100;
  get("hp").style.width = pctHP + "%";
  get("hpText").innerHTML = currentHP + "/" + totalHP + "HP";
}
function get(id) {
  return document.getElementById(id);
}