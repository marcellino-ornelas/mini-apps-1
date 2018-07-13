import React, { Component } from 'react';
import _ from 'lodash';

import Connect4Col from './ConnectCol'

import './Connect4.css';

class Connect4 extends Component {
  constructor(props){
    super(props);

    this.MAX_COLUMN_LENTGH = 7;
    this.MAX_ROW_LENTGH = 6;

    this.state = {
      turn: 0,
      isOver: false
    };
    
    for (let i = 0; i < this.MAX_COLUMN_LENTGH; i++ ){
      this.state[i] = [];
    }

    console.log(this.state)

    this.placePiece = this.placePiece.bind(this);
  }

  placePiece(col) {

    var newState = {};

    var stateCol = this.state[col]

    if( stateCol.length >= this.MAX_ROW_LENTGH ) {
      return;
    }

    newState[col] = stateCol.concat(this.state.turn);

    // newState['turn'] = +!this.state.turn;

    // change turn
    this.setState(newState, () => {
      this.setState({ isOver: this.checkForWin(), turn: +!this.state.turn })
    });
  }

  checkSetOfFour(arr, team) {
    return arr && arr.every((item) => { return item === team });
  }

  checkSetsOfFour(arr, team) {
    for ( let idx = 0; idx < arr.length - 3; idx++) {
      if( this.checkSetOfFour( arr.slice(idx, idx + 4), team ) ){
        return true;
      }
    }

    return false
  }

  getEndPoints() {
    var endPointsOfGame = [];
    
    // top ends
    for (let row = 1; row < this.MAX_ROW_LENTGH - 3; row++ ) {
      endPointsOfGame.push([0,row]);
      endPointsOfGame.push([6,row])
    }
    
    // top columns
    for (let col = 0; col < this.MAX_COLUMN_LENTGH; col++) {
      endPointsOfGame.push( [col, 0] )
    }

    return endPointsOfGame;

  }

  makeDiagnalRow([col, row], incCol, incRow) {
    let spot;
    let diagnal = [];

      while( (spot = this.state[ col  ][ row ]) !== undefined ){
        
        col += incCol;
        row += incRow;

        diagnal.push(spot);
      }

    return diagnal;
  }

  checkDiagnals() {

    var endPoints = this.getEndPoints();

    var diagnals = [];

    for (let i = 0; i < endPoints.length; i++) {
      
      let endPoint = endPoints[i];
      // console.log('end point: ', endPoint);
      
      var validDiagnals = [ 
        this.makeDiagnalRow(endPoint, 1, 1), 
        this.makeDiagnalRow(endPoint, 1, -1) 
      ].filter(function( diagnal ) {
        return diagnal.length > 3;
      });

      for(var idx = 0; idx < validDiagnals.length; idx++) {
        
        var diagnal = validDiagnals[idx];
        console.log('after filter: ', diagnal);

        if( this.checkSetsOfFour( diagnal, this.state.turn ) ) {
          return true;
        }
      }
    }
    return false;
  }

  checkCols() {
    var neededToWin = this.state.turn;

    for( let col = 0; col < this.MAX_COLUMN_LENTGH; col++ ) {

      console.log(neededToWin, this.state[col])
      if( this.state[col].length < 4 ) { continue; }


      if( this.checkSetsOfFour( this.state[col], neededToWin ) ){
        return true
      }

    }

    return false
  }

  checkRows() {
    var neededToWin = +!this.state.turn;

    for( let row = 0; row < this.MAX_ROW_LENTGH; row++ ) {

      var rowData = [];


      // get data from row
      for(let col = 0; col < this.MAX_COLUMN_LENTGH; col++) {
        rowData.push(this.state[col][row]);
      }
      
      // if not 4 in row then we can skip
      if( rowData.length < 4 ) { continue; }

      if( this.checkSetsOfFour( rowData, neededToWin ) ) {
        return true;
      }

    }

    return false
  }

  checkForWin() {
    console.log(this.state.turn)
    return this.checkCols() || this.checkRows() || this.checkDiagnals();

  }

  render() {
    var cols = _.range( this.MAX_COLUMN_LENTGH );
    
    return (
      <div className="c4-board">
        { this.state.isOver === false &&
          cols.map(( col, key ) => {
            return <Connect4Col col={ this.state[key] } colNumber={ key } key={key} placePiece={ this.placePiece } />
          })
        }

        {
          this.state.isOver && <div> {this.state.turn} </div>
        }
      </div>
    );
  }
}

export default Connect4;
