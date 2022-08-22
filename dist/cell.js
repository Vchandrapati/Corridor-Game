"use strict";
const table = document.getElementById("table");
let width = 8;
for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= width; j++) {
        if (i <= width - 1 && j <= width - 1) {
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\"><div class=\"button\" id=\"b${i}${j}\"></div>${i}${j}</div>`;
        }
        else {
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\">${i}${j}</div>`;
        }
    }
    table.style.gridTemplateColumns += " auto";
}
document.getElementById("c00").style.borderRadius = "15px 0px 0px 0px";
document.getElementById(`c0${width}`).style.borderRadius = "0px 15px 0px 0px";
document.getElementById(`c${width}0`).style.borderRadius = "0px 0px 0px 15px";
document.getElementById(`c${width}${width}`).style.borderRadius = "0px 0px 15px 0px";
