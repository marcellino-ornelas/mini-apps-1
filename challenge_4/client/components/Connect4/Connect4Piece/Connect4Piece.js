import React, { Component } from 'react';
import './Connect4Piece.css';

class Connect4Piece extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.teams = ['red', 'black'];
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    var classes = 'c4-piece';

    classes += (' ' +  this.teams[ this.props.team ] );

    return (
      <div className={ classes }></div>
    );
  }
}

export default Connect4Piece;
