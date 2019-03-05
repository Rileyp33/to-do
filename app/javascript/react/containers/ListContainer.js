import React, { Component } from 'react';
import ListTile from '../components/ListTile'
import NewListContainer from './NewListContainer'

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      newListVisible: false
    }
    this.setSelectedList = this.setSelectedList.bind(this)
    this.toggleNew = this.toggleNew.bind(this)
  }

  setSelectedList(listId) {
    this.setState({ selectedList: listId })
  }

  toggleNew() {
    this.setState({ newListVisible: !this.state.newListVisible })
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

    let newListForm;
    if (this.state.newListVisible === true) {
      newListForm = <NewListContainer
        updateListData={this.props.updateListData}
        toggleNew={this.toggleNew}
      />
    }

    return(
      <div className="small-4 columns list-wrapper">
        <div className="small-12 columns callout list-header">
          <div className="small-10 columns list-header-text">My Lists</div>
          <div
            className="small-2 columns list-header-new"
            onClick={this.toggleNew}>
            +
          </div>
        </div>
        <div className="small-12 columns callout list-bar">
          {newListForm}
          {lists}
        </div>
      </div>
    )
  }
}

export default ListContainer
