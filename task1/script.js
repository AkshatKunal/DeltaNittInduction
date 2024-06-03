let moveNo = 0;
let playerPieces = [];//Fill these two arrays at first to match with the html pieces
let opponentPieces = [];
let cacheList = [];
//Do piece placement first and add ids to them for piece name
let arr = [
    "s11","s12","s13","s14","s15","s16","s17","s18",
    "s21","s22","s23","s24","s25","s26","s27","s28",
    "s31","s32","s33","s34","s35","s36","s37","s38",
    "s41","s42","s43","s44","s45","s46","s47","s48",
    "s51","s52","s53","s54","s55","s56","s57","s58",
    "s61","s62","s63","s64","s65","s66","s67","s68",
    "s71","s72","s73","s74","s75","s76","s77","s78",
    "s81","s82","s83","s84","s85","s86","s87","s88"
]
let fullBoard = arr.slice();

const boardSquare = document.querySelectorAll(".squ");

const oppTank = document.querySelector(".oppTank");
oppTank.innerText = "Tank";
const oppTitan = document.querySelector(".oppTitan");
oppTitan.innerText = "Titan";
const oppCanon = document.querySelector(".oppCanon");
oppCanon.innerText = "Canon";

const plyTank = document.querySelector(".plyTank");
plyTank.innerText = "Tank";
const plyTitan = document.querySelector(".plyTitan");
plyTitan.innerText = "Titan";
const plyCanon = document.querySelector(".plyCanon");
plyCanon.innerText = "Canon";

const convertNumListBack = (movableSquareList) =>{// 11 to s11
     for (let index = 0; index < movableSquareList.length ; index++) {
         let element = 's' + (movableSquareList[index]).toString();
         movableSquareList.splice(index,1,element);
     }
     return movableSquareList;
}

const movableSquareFn = (selectedSquare)=>{
    let movableSquareList = [];//movableSquareList.push("s11")
    //append nearby elements
    if (selectedSquare === "s11" || selectedSquare === "s18" || selectedSquare === "s81" || selectedSquare === "s88" ){
        const squareNum = Number(selectedSquare.slice(1,3));
        if (squareNum === 11){
            return["s12","s22","s21"];
        }else if (squareNum === 18){
            return["s17","s27","s28"];
        }else if (squareNum === 81){
            return["s71","s72","s82"];
        }else if(squareNum === 88){
            return["s77","s78","s87"];
        }
    }else if(selectedSquare[1] === "1" || selectedSquare[1] === "8" || selectedSquare[2] === "1" || selectedSquare[2] === "8"){
        if (selectedSquare[1] === "1"){
            const squareNum = Number(selectedSquare.slice(1,3));
            movableSquareList.push(squareNum+1,squareNum-1,squareNum+10,squareNum+9,squareNum+11);
            movableSquareList = convertNumListBack(movableSquareList);
        }else if(selectedSquare[1] === "8"){
            const squareNum = Number(selectedSquare.slice(1,3));
            movableSquareList.push(squareNum+1,squareNum-1,squareNum-10,squareNum-9,squareNum-11);
            movableSquareList = convertNumListBack(movableSquareList);
        }else if(selectedSquare[2] === "1"){
            const squareNum = Number(selectedSquare.slice(1,3));
            movableSquareList.push(squareNum+10,squareNum+1,squareNum-10,squareNum-9,squareNum+11);
            movableSquareList = convertNumListBack(movableSquareList);
        }else if(selectedSquare[2] === "8"){
            const squareNum = Number(selectedSquare.slice(1,3));
            movableSquareList.push(squareNum+10,squareNum-10,squareNum-1,squareNum+9,squareNum-11);
            movableSquareList = convertNumListBack(movableSquareList);
        }
        return movableSquareList;
    }else{
        let movableSquareList = [];
        const squareNum = Number(selectedSquare.slice(1,3));
        movableSquareList.push(squareNum+1,squareNum-1,squareNum+10,squareNum+9,squareNum+11,squareNum-10,squareNum-9,squareNum-11);
        movableSquareList = convertNumListBack(movableSquareList);
        return movableSquareList;
    }
}

const highlightSquares = (movableSquare) =>{
    let fullBoard = arr.slice();
    movableSquare.forEach((square)=>{
        const highSqu = document.getElementById(square);
        if (highSqu.classList.length === 1){
            highSqu.style.backgroundColor =  "#081b31";
        };
    })
    fullBoard = fullBoard.filter(function(val){
        return movableSquare.indexOf(val) == -1;
    })
    fullBoard.forEach((square)=>{
        const highSqu = document.getElementById(square);
        if (highSqu.classList.length === 1){
            highSqu.style.backgroundColor =  "#f5f5f5";
        };
    }) 
}

const moveSquare = (movableSquare)=> {
    movableSquare.forEach((square)=>{
        const squareElement = document.getElementById(square);
        squareElement.addEventListener("click",() =>{
            squareElement.classList.add();//name of piece
        })
    })
}

const playSquare = (square) => {
    const selectedSquare = square.getAttribute("Id");
    const movableSquare = movableSquareFn(selectedSquare);//Get a list of movable squares
    highlightSquares(movableSquare);//highlight the movable squares
    moveSquare(movableSquare,square,square.classList);//moves the selected piece and uptdate time
    //shoot canon
    moveNo++;
    console.log(moveNo);
};

const plyPlayableSquares = document.querySelectorAll(".ply");
plyPlayableSquares.forEach((square)=>{
    square.addEventListener("click",() =>{
        if (moveNo%2 === 0) {
            playSquare(square);
        } else {
            //pass
        }
    })
})
const oppPlayableSquares = document.querySelectorAll(".opp");
oppPlayableSquares.forEach((square)=>{
    square.addEventListener("click",() =>{
    if (moveNo%2 === 0) {
        //pass
    } else {
        playSquare(square);
    }
})
})
