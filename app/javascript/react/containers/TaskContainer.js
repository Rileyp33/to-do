import React, { Component } from 'react';
import TaskTile from '../components/TaskTile'

class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: null
    }
    this.setSelectedTask = this.setSelectedTask.bind(this)
  }

  setSelectedTask(taskId) {
    this.setState({ selectedTask: taskId })
  }

  render() {
    let listName = "Task Manager"
    if (this.props.data) {
      listName = this.props.data.name
    }
    let tasks;
    if (this.props.data) {
      tasks = this.props.data.tasks.map(t => {
        let handleClick = () => {
          this.setSelectedTask(t.id)
        }
        return(
          <TaskTile
            key={t.id}
            data={t}
            selectedTask={this.state.selectedTask}
            handleClick={handleClick}
          />
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
