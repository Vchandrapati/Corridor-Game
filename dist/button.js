"use strict";
function buttonPress() {
    window.alert("yes");
    if (document.getElementById("c00").style.borderBottomColor != "red") {
        document.getElementById("c00").style.borderBottomColor = "red";
        document.getElementById("c01").style.borderBottomColor = "red";
        document.getElementById("c10").style.borderTopColor = "red";
        document.getElementById("c11").style.borderTopColor = "red";
    }
    else {
        document.getElementById("c00").style.borderBottomColor = "black";
        document.getElementById("c01").style.borderBottomColor = "black";
        document.getElementById("c10").style.borderTopColor = "black";
        document.getElementById("c11").style.borderTopColor = "black";
    }
}
