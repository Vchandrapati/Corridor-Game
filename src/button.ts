let myButtons = [];
let skipArr: string[] = [];
let rotate = false, mOut = false;
let count = 0;
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        myButtons[count] = document.getElementById(`b${i}${j}`) as HTMLElement; 
        myButtons[count].addEventListener("contextmenu", () => {

            console.log("hi");
            if(rotate)
            rotate = false;
            else
            rotate = true;
            
            clear();
            preview("red");
        });
        myButtons[count].addEventListener("click", () => {
            console.log("hi");
            document.getElementById(`b${i}${j}`)!.style.display = "none";
            mOut = true;
            if(rotate) {
                console.log(rotate);
                document.getElementById(`c${i}${j}`)!.style.borderRightColor = "red";
                document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "red";
                document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "red";
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "red";
            } else {
                console.log(rotate);
                document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "red";
                document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "red";
                document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "red";
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "red";
            }
        }); 
        
        myButtons[count].addEventListener("mouseover", () => {
            preview("red");
        });
        
        myButtons[count].addEventListener("mouseout", () => {
            if(!mOut)
                preview("black");
            
            mOut = false;
        });
        
        function preview(colour:String)
        {           
            if(!rotate) {
                document.getElementById(`c${i}${j}`)!.style.borderBottomColor = `${colour}`;
                document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = `${colour}`;
                document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = `${colour}`;
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = `${colour}`;
            } else {
                document.getElementById(`c${i}${j}`)!.style.borderRightColor = `${colour}`;
                document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = `${colour}`;
                document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = `${colour}`;
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = `${colour}`;
            }
        }

        function clear()
        {
            document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "black";
            document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "black";
            document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "black";
            document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "black";
            document.getElementById(`c${i}${j}`)!.style.borderRightColor = "black";
            document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "black";
            document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "black";
            document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "black";    
        }

        count++;
    }  
}

