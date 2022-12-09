// Gameboard object

const gameBoard = (function(){


    let gameboard = ["","","","","","","","",""];
    return {gameboard};
})();

// Players objects

function Player(){
    
    playerMark = "X"
    let playerName = "";

    return  {playerMark, playerName};
}

playerOne = Player();
playerTwo = Player();
playerTwo.playerMark = "O";

// Display Controller object

const displayController = (function(){

    let result = undefined;
    let flag = 0;
    let board = document.querySelector('.game-board');

    // function that writes content of the gameboard to the webpage 

    function displaygameboard(){
        for(let i=0; i<9; i++){
            let div = document.querySelector(`.game-board>.spot${i+1}`);
            div.textContent = gameBoard.gameboard[i];
        }
    }


    // function that write marks in the board

    function write(e){
        let position = Array.from(e.target.classList)[0].substring(4,5);
        if(result == ""){
            if(flag == 0){
                if(gameBoard.gameboard[position-1] == ""){
                    gameBoard.gameboard[position-1] = playerOne.playerMark;
                    displayController.displaygameboard();
                }
                flag = 1;
            }
            else{
                if(gameBoard.gameboard[position-1] == ""){
                    gameBoard.gameboard[position-1] = playerTwo.playerMark;
                    displayController.displaygameboard();
                }
                flag = 0;
            }
            gameresult();
        }
    }
    // function that start the game

    function start(){
        reset();
        displaygameboard();
        board.addEventListener('click', write);
    }
    // function that determine game result

    function gameresult(){
        result = "";
        for(let i=0; i<3; i++){
            if((gameBoard.gameboard[3*i] == gameBoard.gameboard[3*i+1]) && (gameBoard.gameboard[3*i] == gameBoard.gameboard[3*i+2])){
                result = gameBoard.gameboard[3*i];
                break;
            }
            else if((gameBoard.gameboard[i] == gameBoard.gameboard[i+3]) && (gameBoard.gameboard[i] == gameBoard.gameboard[i+6])){
                result = gameBoard.gameboard[i];
                break;
            }
        } 
        if(gameBoard.gameboard[0]==gameBoard.gameboard[4]&&gameBoard.gameboard[0]==gameBoard.gameboard[8]){
            result = gameBoard.gameboard[0];
        }
        else if(gameBoard.gameboard[2]==gameBoard.gameboard[4]&&gameBoard.gameboard[2]==gameBoard.gameboard[6]){
            result = gameBoard.gameboard[2];
        }
        else if(!gameBoard.gameboard.includes("")){
            result = 'draw';
        }
        if(result != ""){
            congwinner();
            reset();
            board.removeEventListener('click', write);
        }
    }


    function reset(){
        flag = 0;
        result = "";
        gameBoard.gameboard = ["","","","","","","","",""];
    }

    function congwinner(){
        let cong = document.querySelector(".congratulation");
        cong.style.display = "flex";
        if(result == "X"){
            cong.textContent = playerOne.playerName + " is winner!"
        }
        else if(result == "O"){
            cong.textContent = playerTwo.playerName + " is winner!"
        }
        else if(result == "draw"){
            cong.textContent = "that's a draw!"
        }
        setTimeout(() => {cong.style.display = "none"}, 3500);
    }


    return {displaygameboard, start};
})();

const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", e => {
    displayController.start();
    e.target.textContent ="Restart";
});

const playerName = Array.from(document.querySelectorAll(".player-name"));
const cover = document.querySelector(".cover")
const submitBtn = document.querySelector(".submit-name");
const input = document.querySelector("input");
const askNamePage = document.querySelector(".ask-name")
let playerFlag;


// changing players name by users

playerName.forEach(p => {
    p.addEventListener("click", e => {
        cover.style.display = "flex";
        playerFlag = e.target ;
    })
})


cover.addEventListener("click", e => {
    if(e.target == cover){
        cover.style.display = "none";
    }
})


submitBtn.addEventListener("click", e => {
    if(playerFlag.id[7] == 1){
        let Pname = input.value != "" ? input.value : "Player One";
        playerOne.playerName = Pname;
        playerFlag.textContent = Pname;
    }
    else if(playerFlag.id[7] == 2){
        let Pname = input.value != "" ? input.value : "Player Two";
        playerTwo.playerName = Pname;
        playerFlag.textContent = Pname;
    }
    cover.style.display = "none";
    e.preventDefault()
})

