import React, { Component } from 'react';
import ListTile from '../components/ListTile'

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let lists = this.props.data.map(l => {
      let handleClick = () => {
        this.props.selectorFunction(l.id)
      }
      return(
        <ListTile
          key={l.id}
          listData={l}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className="small-4 columns list-wrapper">
        <div className="small-12 columns callout list-header">My Lists</div>
        <div className="small-12 columns callout list-bar">
          {lists}
        </div>
      </div>
    )
  }
}

export default ListContainer
