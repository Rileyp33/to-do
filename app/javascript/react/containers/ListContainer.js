import React, { Component } from 'react';
import ListTile from '../components/ListTile'
import NewListContainer from './NewListContainer'

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      newListVisible: false,
      editShowId: null
    }
    this.setSelectedList = this.setSelectedList.bind(this)
    this.toggleNew = this.toggleNew.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  setSelectedList(listId) {
    this.setState({ selectedList: listId })
  }

  toggleNew() {
    this.setState({ newListVisible: !this.state.newListVisible })
  }

  toggleEdit(listId) {
    if (this.state.editShowId === listId) {
      this.setState({ editShowId: null })
    }
    else {
      this.setState({ editShowId: listId })
    }
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
        this.props.selectorFunction(null)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let orderedLists = this.props.data.sort((a,b) => b.id - a.id)

    let lists = orderedLists.map(l => {
      let handleSelect = () => {
        this.props.selectorFunction(l.id)
        this.setSelectedList(l.id)
      }
      let handleDelete = () => {
        this.deleteList(l.id)
      }
      let handleEdit = () => {
        this.toggleEdit(l.id)
      }
      return(
        <ListTile
          key={l.id}
          selectedList={this.state.selectedList}
          listData={l}
          handleSelect={handleSelect}
          handleDelete={handleDelete}
          editShowId={this.state.editShowId}
          handleEdit={handleEdit}
          updateListData={this.props.updateListData}
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
