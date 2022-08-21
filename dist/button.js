"use strict";
let myButtons = [];
let count = 0;
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        myButtons[count] = document.getElementById(`b${i}${j}`);
        myButtons[count].addEventListener("click", () => {
            if (document.getElementById("c00").style.borderBottomColor != "red") {
                document.getElementById("c00").style.borderBottomColor = "red";
                document.getElementById("c01").style.borderBottomColor = "red";
                document.getElementById("c10").style.borderTopColor = "red";
                document.getElementById("c11").style.borderTopColor = "red";
                window.alert(`${i}${j}`);
            }
        });
        count++;
    }
}
