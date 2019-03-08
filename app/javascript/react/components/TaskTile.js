import React from 'react';

const TaskTile = (props) => {
  let selectedTask;
  let taskName = "task-name";
  let notes;
  if (props.selectedTask === props.data.id) {
    selectedTask = "selected-task"
    taskName = "selected-task-name"
    if (props.data.notes) {
      notes = <div className="small-12 columns callout task-notes">{props.data.notes}</div>
    }
  }

  return(
    <div>
      <div
        className={"small-12 columns callout button task-tile " + selectedTask}
        onClick={props.handleClick}>
          <div className={"small-8 columns " + taskName}>{props.data.name}</div>
          <div className="small-4 columns task-button-area">
            <div
              className="small-2 columns task-crud">
              ✎
            </div>
            <div className="small-1 columns spacer">.</div>
            <div
              className="small-2 columns task-crud"
              onClick={props.handleDelete}>
              ✘
            </div>
            <div className="small-1 columns spacer">.</div>
            <div
              className="small-4 columns task-crud">
              ✓
            </div>
          </div>
          {notes}
      </div>
    </div>
  )
}

export default TaskTile
