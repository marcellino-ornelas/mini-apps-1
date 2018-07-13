import React, { Component } from 'react';
import './ConnectCol.css';

import Connect4Piece from '../Connect4Piece';

class ConnectCol extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSelected() {
    this.props.placePiece( this.props.colNumber )
  }

  render() {
    return (
     <div className="c4-col" onClick={ this.handleSelected }>
        { this.props.col.map((team, key) => {
          return <Connect4Piece team={team} key={key} />
        }) }
     </div>
    );
  }
}

export default ConnectCol;
