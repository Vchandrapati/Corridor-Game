"use strict";
const table = document.getElementById("table");
const width = 4;
for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= width; j++) {
        table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\">${i}${j}</div>`;
    }
    table.style.gridTemplateColumns += " auto";
}
