let myButtons = [], myCellsClick= [], visited: any[] = [];
let maze = new Array(18).fill(0);
let tmpMtx = new Array(18).fill(0)
for (let i = 0; i < tmpMtx.length; i++) {
    tmpMtx[i] = new Array(18).fill(0);
}
let rotate = false, mOut = false, vertOnly = false, horzOnly = false;
let count = 0, wallCount = 1, wallLimit = 10, funcCount = 0;
let color = "rgba(255, 0, 0, 0.7)";
let blacklist: any[] = [];
instaniateGrid();


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
            console.log(beforePos)
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
            preview(color)
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

                calcRoute();
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
function calcRoute() {
    mapBoard();
    
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze.length; x++) {
            tmpMtx[y][x] = 0;   
        }
    }
    
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze.length; x++) {
            if(maze[y][x] == 2) {
                tmpMtx[y][x] = 1
                visited.push([y, x]);
            }
        }
    }
    
    if(step() == 1) {
        funcCount = 0;
        step();
    }
    //debugging
    const opened = window.open("");
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 18; j++)    {
            opened!.document.write(tmpMtx[i][j] + " ");
        }
        opened!.document.write("<br>");
    }
}

function step() {
    let y = visited[visited.length - 1][0];
    let x = visited[visited.length - 1][1];
    
    if(maze[y][x] == 3) {
        return 0;
    }
    else if(funcCount == 30) {
        return 1;
    }
    else if(!(blacklist.includes(maze[y - 1][x])) && maze[y - 1][x] == 0) {
        tmpMtx[y - 1][x] = 1;
        visited.push([y - 1, x]);
        funcCount++;
        step();
    }
    else if(!(blacklist.includes(maze[y][x - 1])) && maze[y][x - 1] == 0) {
        tmpMtx[y][x - 1] = 1;
        visited.push([y, x - 1]);
        funcCount++;
        step();
    }
    else if(!(blacklist.includes(maze[y][x + 1])) && maze[y][x + 1] == 0) {
        tmpMtx[y][x + 1] = 1;
        visited.push([y, x + 1]);
        funcCount++;
        step();
    }
    else {
        blacklist.push([y, x]);
        visited.pop();
        funcCount++;
        step();
    }
    
    
}
function mapBoard()
{
    //creates gridmap for board
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if(document.getElementById(`c${y}${x}`)!.style.borderBottomColor == "red"){
                maze[2 * y + 1][2 * x + 1] = 1;
                maze[2 * y + 1][2 * x] = 1;
            }
            if(document.getElementById(`c${y}${x}`)!.style.borderLeftColor == "red"){
                maze[y][2 * x] = 1;
                maze[2 * y + 1][2 * x] = 1;
                maze[2 * y][2 * x] = 1;
            }
        }
    }
}

function instaniateGrid() {
    for (let i = 0; i < maze.length; i++) {
        maze[i] = new Array(18).fill(0);
    }

    maze[16][9] = 2;

    for (let i = 0; i < maze.length; i++) {
        maze[0][i] = 3;
    }

    for (let i = 0; i < maze.length; i++) {
        maze[17][i] = 1;
    }

    for (let i = 0; i < maze.length; i++) {
        maze[i][0] = 1;
    }
}
