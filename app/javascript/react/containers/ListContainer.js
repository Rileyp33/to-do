import React, { Component } from 'react';
import ListTile from '../components/ListTile'

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return(
      <div className="small-4 columns list-wrapper">
        <div className="small-12 columns callout list-header">My Lists</div>
        <div className="small-12 columns callout list-bar">
          <ListTile />
          <ListTile />
          <ListTile />
          <ListTile />
        </div>
      </div>
    )
  }
}

export default ListContainer
