let myButtons = []
let skipArr: string[] = []
let rotate = false, mOut = false, vertOnly = false, horzOnly = false
let count = 0;
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        myButtons[count] = document.getElementById(`b${i}${j}`) as HTMLElement; 

        //add listener for right click for the buttons
        myButtons[count].addEventListener("contextmenu", () => {
            if(rotate) {rotate = false} //
            else {rotate = true}
            clear()
            preview("red")
        });
        //add listener for left click for the buttons
        myButtons[count].addEventListener("click", () => {
            document.getElementById(`b${i}${j}`)!.style.display = "none";
            mOut = true;
            let color = "rgba(0, 99, 71, 0.5)";
            if(rotate) {
                console.log(rotate);
                document.getElementById(`c${i}${j}`)!.style.borderRightColor = "color";
                document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "red";
                document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "red";
                document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "red";
            } else {
                console.log(rotate);
                document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "color";
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

            console.log(`hovered b${i}${j}`);

        });
        
        function preview(colour:String)
        {           
            if(!rotate) {
                if(!vertOnly) {
                    document.getElementById(`c${i}${j}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = `${colour}`;
                    document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = `${colour}`;
                }
            } else {
                if(!horzOnly) {
                    document.getElementById(`c${i}${j}`)!.style.borderRightColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = `${colour}`;
                    document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = `${colour}`;
                    document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = `${colour}`;
                }
            }
        }

        function clear()
        {
            document.getElementById(`c${i}${j}`)!.style.borderBottomColor = "black";      //left
            document.getElementById(`c${i + 1}${j}`)!.style.borderTopColor = "black";
            document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor = "black";  //right
            document.getElementById(`c${i + 1}${j + 1}`)!.style.borderTopColor = "black";
            document.getElementById(`c${i}${j}`)!.style.borderRightColor = "black";       //top
            document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor = "black";
            document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor = "black";    //bottom
            document.getElementById(`c${i + 1}${j + 1}`)!.style.borderLeftColor = "black";    
        }

        //checks whether a block can be placed by seeing if the adjacent blocks are red or not
        function invalid()
        {
            if(rotate) {
                if(document.getElementById(`c${i}${j}`)!.style.borderRightColor == "red" || document.getElementById(`c${i}${j + 1}`)!.style.borderLeftColor == "red") {
                    horzOnly = true
                }
            }
            else {
                if(document.getElementById(`c${i}${j}`)!.style.borderBottomColor == "red" || document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor == "red") {
                    vertOnly = true
                }
            }
        }

        count++;
    }  
}