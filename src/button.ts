let myButtons = []
let myCellsClick= []
let skipArr: string[] = []
let rotate = false, mOut = false, vertOnly = false, horzOnly = false
let count = 0;
let color = "rgba(255, 0, 0, 0.7)";
for(let i = 0; i < 9; i++){
    for(let j = 0;j < 9;j++ ){
        myCellsClick[count] = document.getElementById(`cc${i}${j}`) as HTMLElement; 

        myCellsClick[count].addEventListener("click", () => {
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
            checkInvalidButtons()

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
            checkInvalidBlocks()
            if(!rotate) { //if horizontal 
                if(!vertOnly) {
                    document.getElementById(`c${i}${j}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = `${colour}`;
                    document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = `${colour}`;
                }
            } 
            else if(rotate){ //if vertical
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
                document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "black"; //bottom
                document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "black";    //top
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "black";  //bottom
            }
            if(rotate && !vertOnly) {
                document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "black";      //left
                document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "black";      // left
                document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "black";  //right
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "black";  //right
            }
        }

        //checks whether a block can be placed by seeing if the adjacent blocks are red or not
        function checkInvalidBlocks()
        {
            if(rotate) { 
                if(document.getElementById(`c${i}${j}`)!.style.borderRightColor == "red" || document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor == "red") {
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

        function checkInvalidButtons() {
            for(let x = 0; x < 8; x++){
                for(let y = 0; y < 8; y++){
                    if((document.getElementById(`c${x}${y}`)!.style.borderRightColor == "red" || document.getElementById(`c${x + 1}${y}`)!.style.borderRightColor == "red")
                    && (document.getElementById(`c${x}${y}`)!.style.borderBottomColor == "red" || document.getElementById(`c${x}${y + 1}`)!.style.borderBottomColor == "red")) {
                        document.getElementById(`b${x}${y}`)!.style.display = "none";
                    }
                }
            }
        }

        count++;
    }  
}