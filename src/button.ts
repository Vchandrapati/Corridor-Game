let myButtons = []
let myCells= []
let skipArr: string[] = []
let rotate = false, mOut = false, vertOnly = false, horzOnly = false
let count = 0;
let color = "rgba(255, 0, 0, 0.7)";
for(let i = 0; i < 9; i++){
    for(let j = 0;j < 9;j++ ){
        myCells[count] = document.getElementById(`c${i}${j}`) as HTMLElement; 

        myCells[count].addEventListener("click", () => {
            document.getElementById(`c${i}${j}`)?.appendChild(<Node>document.getElementById("p1"));
        });
    }
}
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        myButtons[count] = document.getElementById(`b${i}${j}`) as HTMLElement; 

        //add listener for right click for the buttons
        myButtons[count].addEventListener("contextmenu", () => {
            if(rotate) {rotate = false} 
            else {rotate = true}
            clear()
            preview(color)
        });
        //add listener for left click for the buttons
        myButtons[count].addEventListener("click", () => {
            mOut = true;

            if(rotate) {
                if(!horzOnly) {
                    document.getElementById(`b${i}${j}`)!.style.display = "none";
                    document.getElementById(`c${i}${j}`)!.style.borderRightColor = "red";
                    document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "red";
                    document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "red";
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "red";
                }
            } else {
                if(!vertOnly) {
                    document.getElementById(`b${i}${j}`)!.style.display = "none";
                    document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "red";
                    document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "red";
                    document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "red";
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "red";
                }
            }

        }); 
        //mouse hover over listener for buttons
        myButtons[count].addEventListener("mouseover", () => {
            preview(color);
        });
        
        //mouse unhover listener for buttons
        myButtons[count].addEventListener("mouseout", () => {
            if(!mOut)
                preview("black");
            
            mOut = false;

            console.log(`hovered b${i}${j}`);
        });
        
        //function to set the colour of the blocks
        function preview(colour:String)
        {           
            invalid()
            if(!rotate) { //if horizontal 
                if(!vertOnly) {
                    document.getElementById(`c${i}${j}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = `${colour}`;
                    document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = `${colour}`;
                }
            } else { //if vertical
                if(!horzOnly) {
                    document.getElementById(`c${i}${j}`)!.style.borderRightColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = `${colour}`;
                    document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = `${colour}`;
                }
            }
        }
        
        //resets colours of the blocks to default
        function clear()
        {
            if(!rotate && !horzOnly) {
                document.getElementById(`c${i}${j}`)!.style.borderRightColor = "black";       //top
                document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "black";
                document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "black";    //bottom
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "black";  
            }
            else if(rotate && !vertOnly) {
                document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "black";      //left
                document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "black";
                document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "black";  //right
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "black"; 
            } 
        }

        //checks whether a block can be placed by seeing if the adjacent blocks are red or not
        function invalid()
        {
            if(rotate) {
                if(document.getElementById(`c${i}${j}`)!.style.borderRightColor == "red" || document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor == "red") {
                    horzOnly = true
                }
                else {
                    horzOnly = false
                }
            }
            else {
                if(document.getElementById(`c${i}${j}`)!.style.borderBottomColor == "red" || document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor == "red") {
                    vertOnly = true
                }
                else {
                    vertOnly = false
                }
            }
        }

        count++;
    }  
}