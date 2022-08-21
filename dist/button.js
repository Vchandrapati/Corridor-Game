"use strict";
/*
const myButton = document.getElementById("b00") as HTMLElement;
myButton.addEventListener("click", () => {
    if (document.getElementById("c00")!.style.borderBottomColor != "red") {
        document.getElementById("c00")!.style.borderBottomColor = "red";
        document.getElementById("c01")!.style.borderBottomColor = "red";
        document.getElementById("c10")!.style.borderTopColor = "red";
        document.getElementById("c11")!.style.borderTopColor = "red";
        myButton.style.display = "none";
    }
});
*/
function click(buttonID) {
    if (document.getElementById("c00").style.borderBottomColor != "red") {
        document.getElementById("c00").style.borderBottomColor = "red";
        document.getElementById("c01").style.borderBottomColor = "red";
        document.getElementById("c10").style.borderTopColor = "red";
        document.getElementById("c11").style.borderTopColor = "red";
    }
}
