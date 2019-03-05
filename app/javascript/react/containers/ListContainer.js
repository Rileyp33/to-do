import React, { Component } from 'react';
import ListTile from '../components/ListTile'

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null
    }
    this.setSelectedList = this.setSelectedList.bind(this)
  }

  setSelectedList(listId) {
    this.setState({ selectedList: listId })
    console.log("selected list:");
    console.log(this.state.selectedList);
  }

  render() {
    let lists = this.props.data.map(l => {
      let handleClick = () => {
        this.props.selectorFunction(l.id)
        this.setSelectedList(l.id)
      }
      return(
        <ListTile
          key={l.id}
          selectedList={this.state.selectedList}
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
