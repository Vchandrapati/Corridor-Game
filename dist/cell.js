"use strict";
const table = document.getElementById("table");
const width = 3;
for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= width; j++) {
        if (i <= width - 1 && j <= width - 1) {
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\">${i}${j}<div class=\"button\" id=\"b${i}${j}\"></div></div>`;
        }
        else {
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\">${i}${j}</div>`;
        }
    }
    table.style.gridTemplateColumns += " auto";
}
table.style.left = `${(document.body.clientWidth / 2) - (table.clientWidth / 2)}` + 'px';
table.style.top = `${(document.body.clientHeight / 2) + (table.clientHeight / 1.5)}` + 'px';
