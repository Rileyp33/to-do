import React from 'react';
import EditListContainer from '../containers/EditListContainer'

const ListTile = (props) => {
  let selectedList;
  if (props.selectedList === props.listData.id) {
    selectedList = "selected-list"
  }

  let completedListText;
  let completedListBackground;
  let completionArray = []
  props.listData.tasks.forEach(t => {
    completionArray.push(t.completed)
  })
  if (!completionArray.includes(false) && completionArray.length >= 1) {
    completedListText = "completed-list-text"
    completedListBackground = "completed-list-background"
  }

  let nameOrEdit;
  if (props.editShowId === props.listData.id) {
    nameOrEdit = <EditListContainer
      name={props.listData.name}
      id={props.listData.id}
      handleEdit={props.handleEdit}
      updateListData={props.updateListData}
      handleSelect={props.handleSelect}
      />
  }
  else {
    nameOrEdit = <div className={"small-8 columns list-text " + completedListText}>{props.listData.name}</div>
  }

  return(
    <div
      onClick={props.handleSelect}
      className={"small-12 columns callout button list-tile " + completedListBackground + " " + selectedList}>
        {nameOrEdit}
        <div className="small-4 columns button-area">
          <div
            className="small-5 columns list-delete"
            onClick={props.handleEdit}>
            ✎
          </div>
          <div
            className="small-5 columns list-delete"
            onClick={props.handleDelete}>
            ✘
          </div>
        </div>
    </div>
  )
}

export default ListTile
