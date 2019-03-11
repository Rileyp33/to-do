import React from 'react';
import EditTaskContainer from '../containers/EditTaskContainer'

const TaskTile = (props) => {
  let selectedTask;
  let completedStrike;
  if (props.isCompleted === "completed") {
    completedStrike = "completed-strike"
  }
  let taskName = "task-name";
  let notes;
  if (props.selectedTask === props.data.id) {
    selectedTask = "selected-task"
    taskName = "selected-task-name"
    if (props.data.notes) {
      notes = <div className="small-12 columns callout task-notes">{props.data.notes}</div>
    }
  }
  let showOrEdit;
  if (props.editShowId === props.data.id) {
    showOrEdit = <EditTaskContainer
      taskName={props.data.name}
      handleEdit={props.handleEdit}
      handleDelete={props.handleDelete}
      data={props.data}
      updateListData={props.updateListData}
      selectList={props.selectList}
    />
  }
  else (
    showOrEdit = <div
      className={"small-12 columns callout button task-tile " + selectedTask + " " + props.isCompleted}
      onClick={props.handleClick}>
        <div className={"small-8 columns " + taskName + " " + completedStrike}>{props.data.name}</div>
        <div className="small-4 columns task-button-area">
          <div
            className="small-2 columns task-crud"
            onClick={props.handleEdit}>
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
            className="small-4 columns task-crud check-button"
            onClick={props.handleComplete}>
            ✓
          </div>
        </div>
        {notes}
    </div>
  )

  return(
    <div>
      {showOrEdit}
    </div>
  )
}

export default TaskTile
