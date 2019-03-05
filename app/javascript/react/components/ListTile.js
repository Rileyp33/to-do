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
      {props.listData.name}
    </div>
  )
}

export default ListTile
