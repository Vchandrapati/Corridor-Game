"use strict";
let myButtons = [];
let count = 0;
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        myButtons[count] = document.getElementById(`b${i}${j}`);
        myButtons[count].addEventListener('dblclick', () => {
            console.log(`double clicked b${i}${j}`);
        });
        myButtons[count].addEventListener("click", () => {
            console.log(`clicked b${i}${j}`);
        });
        myButtons[count].addEventListener("mouseover", () => {
            console.log(`hovered b${i}${j}`);
        });
        count++;
    }
}
