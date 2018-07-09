/*
 * document on ready
*/
document.addEventListener("DOMContentLoaded", function() {

  var board = document.getElementById('board');
  var reset = document.getElementById('reset');
  var cols = board.getElementsByClassName('col');
  
  var promptMessage = 'what is your name?';
  
  // get names for players
  var users = [ prompt('X: ' + promptMessage), prompt('O: ' + promptMessage) ];
  
  // display names
  for ( let i = 0; i < 2; i++ ) {
    let el = document.getElementById('user' + (i + 1) );
    appendText( el, '( ' + users[i] + ' )' );
  }
  
  var game = {
    turn: 0,
    pieces: ['x', 'o'],
    scores: [0, 0],
    users: users,
    board: [],
    BOARD_MAX_LENGTH: 9,
    BOARD_MAX_COL_LENGTH: 3,
    hasEnded: false,

    getId: function( el ) {
      return el.id.split('')[1];
    },
    changeTurn: function () {
      return this.turn = +!this.turn;
    },

    addToBoard: function(square) {
      var id = this.getId(square);

      var piece = this.getPiece();
      this.board[ id ] = piece;

      appendText( square, piece );
    },

    getPiece: function (opp) {
      return this.pieces[ this.turn ];
    },
    
    gameOver: function (tie) {
      this.hasEnded = true;
      

      if ( tie ) {
        alert('tie game, please restart game');
      } else {
        var user = this.users[ this.turn ] || this.getPiece();
        alert( user + ' has won the game');
        var score = ++this.scores[ this.turn ];
        var userScoreCard = document.getElementById('score-' + this.getPiece() );

        appendText(userScoreCard, score);
      }
    },

    checkRows: function(piece) {
      // rows
      for(let i = 0; i < this.BOARD_MAX_LENGTH; i += 3 ) {
        
        let level = true;
        for(let j = 0, idx = i; j < this.BOARD_MAX_COL_LENGTH; j++, idx++) {
          
          if( piece !== this.board[idx] ){ 
            level = false; 
            break; 
          }

        }
        
        if(level) { return true; }
      }

      return false;


    },
    checkCols: function(piece) {

      // cols 
      for(let i = 0; i < game.BOARD_MAX_COL_LENGTH; i++) {

        let level = true;
        for(let idx = i; idx < game.BOARD_MAX_LENGTH; idx+= 3){
          
          if ( piece !== this.board[idx] ){ 
            level = false; 
            break; 
          }

        }
        if(level) { return true; }
      }
      return false;
    },

    checkDiagnoals: function( piece ) {

      var compare = function(item) {return game.board[item] === piece; }

      return every( [0, 4, 8], compare ) || every( [2, 4, 6], compare );
    },

    checkGame: function() {
      var type = null;
      var piece = this.getPiece();
      
      var isTie = this.board.length === 9 && every( this.board );

      if( isTie ){ return this.gameOver(true) }

      if ( this.checkRows(piece) || this.checkCols(piece) || this.checkDiagnoals(piece) ){
        this.gameOver();
      }

      return this.hasEnded;
    },
  };




  /*
   * events 
  */

  board.addEventListener('click', function(e) {
    var square = event.target;
    
    // stop click event if its not a square or a piece is on square
    if( 
      game.hasEnded || 
      !square.classList.contains('col') || 
      square.innerHTML
    ){ return; }

    game.addToBoard( square );
    
    // check game return game status
    !game.checkGame() && game.changeTurn();
    
  });
  
  // RESET GAME
  reset.addEventListener('click', function() {
    
    if( !game.hasEnded ){
      // make turn back to x there was no winner from last game
      game.turn = 0;
    }
    
    // clear board
    game.board = [];

    // clear UI
    Array.prototype.forEach.call(cols, function(el){
      el.innerHTML = '';
    });
    
    // start game
    game.hasEnded = false;

  });


  /*
   * Helper functions
  */
  function every(arr, fn) {
  
    for(var i = 0; i < arr.length; i++) {
      var cantPass = fn ? !fn( arr[i] ) : !arr[i]
      if( cantPass ){ return false; }
    }

    return true;
  }

  function appendText(el, text){
    el.innerHTML = '';
    text = document.createTextNode(text);
    el.appendChild(text);
  }

});