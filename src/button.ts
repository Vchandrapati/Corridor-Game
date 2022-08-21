let myButtons = [];
let count = 0;
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        myButtons[count] = document.getElementById(`b${i}${j}`) as HTMLElement; 
        myButtons[count].addEventListener("click", () => {
            window.alert(`${i}${j}`);
        });
        count++;
    }  
}

