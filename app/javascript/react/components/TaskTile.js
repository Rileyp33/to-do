import React from 'react';

const TaskTile = (props) => {
  return(
    <div
      className="small-12 columns callout task-tile">
      {props.data.name}
    </div>
  )
}

export default TaskTile
