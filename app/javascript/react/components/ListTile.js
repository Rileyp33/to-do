import React from 'react';

const ListTile = (props) => {
  let selectedList;
  if (props.selectedList === props.listData.id) {
    selectedList = "selected-list"
  }
  return(
    <div
      onClick={props.handleClick}
      className={"small-12 columns callout button list-tile " + selectedList}>
        <div className="small-8 columns list-text">{props.listData.name}</div>
        <div className="small-4 columns button-area">
          <div className="small-5 columns list-delete">✎</div>
          <div
            className="small-5 columns list-delete"
            onClick={props.handleDelete}
            >
            ✘
          </div>
        </div>
    </div>
  )
}

export default ListTile
