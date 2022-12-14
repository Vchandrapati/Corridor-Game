"use strict";
var _a, _b;
const table = document.getElementById("table");
let width = 8;
for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= width; j++) {
        const cell = document.createElement("div");
        cell.id = `c${i}${j}`;
        cell.className = "item";
        cell.innerHTML = `${i}${j}`;
        const clickAble = document.createElement("div");
        clickAble.id = `cc${i}${j}`;
        clickAble.className = "clickable";
        cell.appendChild(clickAble);
        if (i <= width - 1 && j <= width - 1) {
            const button = document.createElement("div");
            button.id = `b${i}${j}`;
            button.className = "button";
            cell.appendChild(button);
        }
        table.appendChild(cell);
    }
    table.style.gridTemplateColumns += " auto";
}
const max = 100;
const size = 25;
const player1 = document.createElement("div");
player1.id = "p1";
player1.style.position = "absolute";
player1.style.height = max - size + "%";
player1.style.width = max - size + "%";
player1.style.top = size / 2 + "%";
player1.style.left = size / 2 + "%";
player1.style.backgroundColor = "red";
player1.style.borderRadius = "50% 50% 50% 50%";
(_a = document.getElementById(`c04`)) === null || _a === void 0 ? void 0 : _a.appendChild(player1);
const player1Preview = document.createElement("div");
player1Preview.id = "p1p";
player1Preview.style.position = "absolute";
player1Preview.style.height = max - size + "%";
player1Preview.style.width = max - size + "%";
player1Preview.style.top = size / 2 + "%";
player1Preview.style.left = size / 2 + "%";
player1Preview.style.backgroundColor = "green";
player1Preview.style.borderRadius = "50% 50% 50% 50%";
const player2 = document.createElement("div");
player2.id = "p2";
player2.style.position = "absolute";
player2.style.height = max - size + "%";
player2.style.width = max - size + "%";
player2.style.top = size / 2 + "%";
player2.style.left = size / 2 + "%";
player2.style.backgroundColor = "blue";
player2.style.borderRadius = "50% 50% 50% 50%";
(_b = document.getElementById(`c84`)) === null || _b === void 0 ? void 0 : _b.appendChild(player2);
document.getElementById("c00").style.borderRadius = "1vw 0px 0px 0px";
document.getElementById(`c0${width}`).style.borderRadius = "0px 1vw 0px 0px";
document.getElementById(`c${width}0`).style.borderRadius = "0px 0px 0px 1vw";
document.getElementById(`c${width}${width}`).style.borderRadius = "0px 0px 1vw 0px";
