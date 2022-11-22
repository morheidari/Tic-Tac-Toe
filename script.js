// Gameboard object

const gameBoard = (function(){


    gameboard = [["X", "X", "X"],
    ["O", "O", "O"],
    ["X", "X", "X"]];
    return {gameboard};
})();

// Players objects

function Player(){
    
    return  {};
}

playerOne = Player();
playerTwo = Player();

// Display Controller object

const displayController = (function(){

    return {};
})();

for(i=0; i<3; i++){
    for(j=0; j<3; j++){
        let div = document.querySelector(`.game-board>.row${i+1}>.col${j+1}`);
        div.textContent = gameBoard.gameboard[i][j];
    }
}