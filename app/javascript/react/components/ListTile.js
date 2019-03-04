import React from 'react';

const ListTile = (props) => {
  return(
    <div
      onClick={props.handleClick}
      className="small-12 columns callout button list-tile">
      {props.listData.name}
    </div>
  )
}

export default ListTile
