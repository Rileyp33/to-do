import React, { Component } from 'react';
import TaskTile from '../components/TaskTile'

class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let listName = "Task Manager"
    if (this.props.data) {
      listName = this.props.data.name
    }
    let tasks;
    if (this.props.data) {
      tasks = this.props.data.tasks.map(t => {
        return(
          <TaskTile data={t} />
        )
      })
    }
    return(
      <div className="small-8 columns task-wrapper">
        <div className="small-12 columns callout task-header">{listName}</div>
        <div className="small-12 columns callout task-bar">
          {tasks}
        </div>
      </div>
    )
  }
}

export default TaskContainer
