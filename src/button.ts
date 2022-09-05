let colour = "rgba(255, 0, 0, 0.7)";
let myButtons = [], myCellsClick= [], visited: any[] = [];
let rotate = false, mOut = false, vertOnly = false, horzOnly = false;
let count = 0, wallCount = 1, wallLimit = 10, funcCount = 0;
let color = "rgba(255, 0, 0, 0.7)";

let Searched = new Array(9).fill(false);
let AdjUp = new Array(9).fill("0");
//let AdjDown: string[][];
let AdjLeft = new Array(9).fill("0");
let AdjRight = new Array(9).fill("0");
for(let i = 0; i < AdjUp.length; i++){
    Searched[i] = new Array(9).fill(false);
    AdjUp[i] = new Array(9).fill("0");
    //let AdjDown: string[][];
    AdjLeft[i] = new Array(9).fill("0"); 
    AdjRight[i] = new Array(9).fill("0");

}
let fringe = new Array(0);

for(let i = 0; i < 9; i++){
    for(let j = 0;j < 9;j++ ){
        myCellsClick[count] = document.getElementById(`cc${i}${j}`) as HTMLElement; 

        myCellsClick[count].addEventListener("click", () => {
            validMove()
            //winning condition
            let pos = parseInt(document.getElementById("p1")?.parentElement?.id.slice(1)!)
            if(pos >= 80 && pos <= 88) {
                //red wins
                console.log("red wins")
                console.log(pos)
            }
        });

        function validMove() {
            //position of previous button
            let idBefore = document.getElementById("p1")?.parentElement?.id.slice(1)
            let beforePos = parseInt(idBefore!)

            //position of current button
            let idAfter = document.getElementById(`c${i}${j}`)?.id.slice(1)
            let afterPos = parseInt(idAfter!)

            //find direction
            let posDiff = afterPos - beforePos
            //console.log(beforePos)
            if((posDiff == -1 && document.getElementById(`c${idBefore}`)!.style.borderLeftColor != "red") || //left
                (posDiff == 1 && document.getElementById(`c${idBefore}`)!.style.borderRightColor != "red") || //right
                (posDiff == -10 && document.getElementById(`c${idBefore}`)!.style.borderTopColor != "red") || //top
                (posDiff == 10 && document.getElementById(`c${idBefore}`)!.style.borderBottomColor != "red"))  //bottom
            {
                document.getElementById(`c${i}${j}`)?.appendChild(<Node>document.getElementById("p1"));
            }
        }
    }
}
//#region buttons

for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        myButtons[count] = document.getElementById(`b${i}${j}`) as HTMLElement; 
        //add listener for right click for the buttons
        myButtons[count].addEventListener("contextmenu", () => {
            rotate = !rotate;
            clear()
            preview(colour)
        });
        //add listener for left click for the buttons
        myButtons[count].addEventListener("click", () => {
            if(wallCount <= wallLimit) {
                mOut = true;
                wallCount++;
                    

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

                if(wallCount > wallLimit)
                {
                    for(let x = 0; x < 8; x++){
                        for(let y = 0; y < 8; y++){
                            document.getElementById(`b${x}${y}`)!.style.display = "none";         
                        }
                    }
                }
                populateAdj();
                search();
               
            }
        }); 
        //mouse hover over listener for buttons
        myButtons[count].addEventListener("mouseover", () => {
            preview(colour);
        });
        
        //mouse unhover listener for buttons
        myButtons[count].addEventListener("mouseout", () => {
            if(!mOut)
                preview("black");
            
            mOut = false;
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
                horzOnly = document.getElementById(`c${i}${j}`)!.style.borderRightColor == "red" || document.getElementById(`c${i + 1}${j}`)!.style.borderRightColor == "red";
                }
                else {
                vertOnly = document.getElementById(`c${i}${j}`)!.style.borderBottomColor == "red" || document.getElementById(`c${i}${j + 1}`)!.style.borderBottomColor == "red";
            }
        }

        function checkInvalidButtons() {
            for(let x = 0; x < 8; x++){
                for(let y = 0; y < 8; y++){
                    if (document.getElementById(`c${x}${y}`)!.style.borderRightColor == "red" || document.getElementById(`c${x + 1}${y}`)!.style.borderRightColor == "red") {
                        if (document.getElementById(`c${x}${y}`)!.style.borderBottomColor == "red" || document.getElementById(`c${x}${y + 1}`)!.style.borderBottomColor == "red") {
                        document.getElementById(`b${x}${y}`)!.style.display = "none";
                    }
                }
            }
        }
        }

        count++;
    }  
}

//#endregion
//#region pathfindingalgo
function populateAdj(){
    for(let i = 0; i < 9; i++){       
        for(let j = 0; j < 9; j++){
            if(document.getElementById(`c${j}${i}`)!.style.borderRightColor != "red"){
                if(i + 1 < 9){
                    AdjRight[i][j] = `${i + 1}${j}`;
                }
            }else{
                if(i + 1 < 9){
                    AdjRight[i][j] = `0`;
                }
            }
            if(document.getElementById(`c${j}${i}`)!.style.borderTopColor != "red"){
                if(j - 1 >= 0){
                    AdjUp[i][j] = `${i}${j - 1}`;
                    console.log("Trigger");
                }  
                
            }else{
                if(j - 1 >= 0){
                    AdjUp[i][j] = `0`;
                } 
            }
            if(document.getElementById(`c${j}${i}`)!.style.borderLeftColor != "red"){
                if(i - 1 >= 0){
                    AdjLeft[i][j] = `${i - 1}${j}`;
                }
            } else{
                if(i - 1 >= 0){
                    AdjLeft[i][j] = `0`;
                }
            }                    
        }
    }
}

function search(){
    /*
    let d = "";
    for(let i = 0; i < AdjUp.length; i++){
        for(let j = 0; j < AdjUp[0].length; j++){
            d = d + " " + AdjUp[j][i];
        }
        console.log(d);
        d = "";
    }
    */
    for(let i = 0; i < Searched.length; i++){
        for(let j = 0; j < Searched.length; j++){
            Searched[i][j] = false;
        }       
    }
    fringe = [];
    let PathExists: boolean = false;
    Searched[4][8] = true; 

    addToFringe(4, 8);
    removeAdj(4, 8);
    printFringe();
    outer: while(fringe.length > 0){
        let currentCell = fringe.shift();
        //console.log(currentCell);
        let y = currentCell%10;
        currentCell -= currentCell%10;
        let x = currentCell/10;

        //console.log(`${x} ${y}`);
        Searched[x][y] = true;
        addToFringe(x, y);
        removeAdj(x, y);
        printFringe();
        if(y == 0){
            PathExists = true;
            break outer;           
        }
    }
    console.log(PathExists);
    return PathExists;

}
function printFringe(){
    let full: String = "";
    for(let i = 0; i < fringe.length; i++){
        let currentCell = fringe[i];
        let y = currentCell%10;
        currentCell -= currentCell%10;
        let x = currentCell/10;
        full = full + " " + `${y}${x}`;
    }
    console.log(full);
}

function removeAdj(x: number, y: number){   
    AdjRight[x][y] = `0`;
    AdjLeft[x][y] = `0`;
    AdjUp[x][y] = `0`;
}

function addToFringe(x: number, y: number){
    if(AdjLeft[x][y] != 0){
        fringe.unshift(AdjLeft[x][y]);
    }
    if(AdjRight[x][y] != 0){
        fringe.unshift(AdjRight[x][y]);
    }
    if(AdjUp[x][y] != 0){
        fringe.unshift(AdjUp[x][y]);
    }
    
}
//#endregion