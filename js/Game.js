class Game{
  constructor(){
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }
  //returns active player
  get activePlayer(){
    return this.players.find(player => player.active);
  }

  createPlayers(){
    const players = [new Player('Player 1', 1, '#e15258', true),
                     new Player('Player 2', 2, '#e59a13')];
    // for(let i =0; i<number; i++){
    //   let player = new Player(i, this);
    //   players.push(player);
    // } to let it add more players
    return players;
  }

  //gets game ready to be played
  startGame(){
    //whos turn, game set up, ready Treehouse
    this.board.drawHTMLBoard()
    this.activePlayer.activeCounters.drawHTMLCounter()
    this.ready = true;
  }
//whos turn it is
  // what happens when you press the keys
  handleKeydown(e){
    //checks if the ready property is set to true
    if (this.ready){
      if (e.key === "ArrowLeft"){
        //moves the active counter left
        this.activePlayer.activeCounters.moveLeft();
      } else if (e.key === "ArrowRight"){
        this.activePlayer.activeCounters.moveRight(this.board.columns);
      }else if (e.key === "ArrowDown"){
        this.playCounter();
      }
    }
  }
//finds space object to drop counter into, drops counter
  playCounter(){
    let spaces = this.board.spaces;
    let activeCounter = this.activePlayer.activeCounters;
    let targetColumn = spaces[activeCounter.columnLocation];
    let targetSpace = null;

    //finds targetSpace if null means the space is empty then , i.e. to be targetted will hold the lowest empty space in the column
    for (let space of targetColumn){
      if (space.counter === null){
        targetSpace = space;
      }
    }
    //finds out that the target column is full
    if (targetSpace !== null){
      const game = this;
      game.ready = false;

    //this callbacks
    activeCounter.drop(targetSpace, function(){
      game.updateGameState(activeCounter, targetSpace);
    });
  }
}
  /**
  * Checks if there a winner on the board after each token drop.
  * @param   {Object}    Targeted space for dropped token.
  * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
  */
  checkForWin(target){//this repeats after every move
      const owner = target.counter.owner;
      //game is not won
      let win = false;
      // vertically checks if one owner has got 4 counters vertically
      for (let x = 0; x < this.board.columns; x++ ){
          for (let y = 0; y < this.board.rows - 3; y++){
              if (this.board.spaces[x][y].owner === owner &&
                  this.board.spaces[x][y+1].owner === owner &&
                  this.board.spaces[x][y+2].owner === owner &&
                  this.board.spaces[x][y+3].owner === owner) {
                    //if conditions are met then game is won
                      win = true;
              }
          }
      }

      // horizontally checks if one owner has got 4 counters horizontally
      for (let x = 0; x < this.board.columns - 3; x++ ){
          for (let y = 0; y < this.board.rows; y++){
              if (this.board.spaces[x][y].owner === owner &&
                  this.board.spaces[x+1][y].owner === owner &&
                  this.board.spaces[x+2][y].owner === owner &&
                  this.board.spaces[x+3][y].owner === owner) {
                      win = true;
              }
          }
      }
      // diagonally checks if one owner has got 4 counters diagonally
      for (let x = 3; x < this.board.columns; x++ ){
          for (let y = 0; y < this.board.rows - 3; y++){
              if (this.board.spaces[x][y].owner === owner &&
                  this.board.spaces[x-1][y+1].owner === owner &&
                  this.board.spaces[x-2][y+2].owner === owner &&
                  this.board.spaces[x-3][y+3].owner === owner) {
                      win = true;
              }
          }
      }
      // diagonal checks if one owner has got 4 counters diagonally
      for (let x = 3; x < this.board.columns; x++ ){
          for (let y = 3; y < this.board.rows; y++){
              if (this.board.spaces[x][y].owner === owner &&
                  this.board.spaces[x-1][y-1].owner === owner &&
                  this.board.spaces[x-2][y-2].owner === owner &&
                  this.board.spaces[x-3][y-3].owner === owner) {
                      win = true;
              }
          }
      }
      return win;
  }

  switchPlayers(){
    for(let player of this.players){
      // checks if it is true then if it passes return false, if not return true
       player.active = player.active === true ? false : true;
      }
    }

//id game-over
  gameOver(message){
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').textContent= message;
  }
//updates game state after counter is dropped
  updateGameState(counter, target){
    //associate the space object with a dropped token
    target.mark(counter); //this will set the target space's token property to the dropped token object

    //checks if the last move is a winning statement
    if (!this.checkForWin(target)){
      this.switchPlayers();//switches player
      if (this.activePlayer.checkCounters()){//checks amount of counters left
          this.activePlayer.activeCounters.drawHTMLCounter();//renders new counter
          this.ready = true;
      } else {
        this.gameOver('No more counters');
      }
    } else {
      this.gameOver(`${target.owner.name}wins!`)
    }

  }


}
