const table = document.getElementById("table") as HTMLElement; 
let width = 8;

for(let i = 0; i <= width; i++)
{
    for(let j = 0; j <= width; j++)
    {
        if(i <= width - 1 && j <= width - 1){
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\"><div class=\"button\" id=\"b${i}${j}\"></div>${i}${j}</div>`;
        }else{
            table.innerHTML += `<div class=\"item\" id = \"c${i}${j}\">${i}${j}</div>`;
        }
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
player1.style.top = size/2 + "%";
player1.style.left = size/2 + "%";
player1.style.backgroundColor = "red";
player1.style.borderRadius = "50% 50% 50% 50%"
document.getElementById(`c04`)?.appendChild(player1);

const player2 = document.createElement("div");
player2.id = "p2";
player2.style.position = "absolute";
player2.style.height = max - size + "%";
player2.style.width = max - size + "%";
player2.style.top = size/2 + "%";
player2.style.left = size/2 + "%";
player2.style.backgroundColor = "blue";
player2.style.borderRadius = "50% 50% 50% 50%"
document.getElementById(`c84`)?.appendChild(player2);

document.getElementById("c00")!.style.borderRadius = "15px 0px 0px 0px";
document.getElementById(`c0${width}`)!.style.borderRadius = "0px 15px 0px 0px";
document.getElementById(`c${width}0`)!.style.borderRadius = "0px 0px 0px 15px";
document.getElementById(`c${width}${width}`)!.style.borderRadius = "0px 0px 15px 0px";