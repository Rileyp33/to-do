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
    this.deleteList = this.deleteList.bind(this)
  }

  setSelectedList(listId) {
    this.setState({ selectedList: listId })
  }

  toggleNew() {
    this.setState({ newListVisible: !this.state.newListVisible })
  }

  deleteList(listId) {
    fetch(`/lists/${listId}`, {
      'method': 'DELETE',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'list': { 'id': listId }
      })
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        console.log(body);
        this.props.updateListData(body)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let lists = this.props.data.map(l => {
      let handleClick = () => {
        this.props.selectorFunction(l.id)
        this.setSelectedList(l.id)
      }
      let handleDelete = () => {
        this.deleteList(l.id)
      }
      return(
        <ListTile
          key={l.id}
          selectedList={this.state.selectedList}
          listData={l}
          handleClick={handleClick}
          handleDelete={handleDelete}
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
