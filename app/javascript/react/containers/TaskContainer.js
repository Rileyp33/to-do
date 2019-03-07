import React, { Component } from 'react';
import TaskTile from '../components/TaskTile'
import NewTaskContainer from './NewTaskContainer'

class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: null,
      newTaskVisible: false,
      editShowId: null
    }
    this.setSelectedTask = this.setSelectedTask.bind(this)
    this.toggleNew = this.toggleNew.bind(this)
  }

  setSelectedTask(taskId) {
    this.setState({ selectedTask: taskId })
  }

  toggleNew() {
    if (this.props.data) {
      this.setState({ newTaskVisible: !this.state.newTaskVisible })
    }
  }

  render() {
    let listName = "Task Manager"
    if (this.props.data) {
      listName = this.props.data.name
    }


    let tasks;
    if (this.props.data) {
      let orderedTasks = this.props.data.tasks.sort((a,b) => b.id - a.id)
      tasks = orderedTasks.map(t => {
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

    let newTaskForm;
    if (this.state.newTaskVisible === true) {
      newTaskForm = <NewTaskContainer
        updateListData={this.props.updateListData}
        toggleNew={this.toggleNew}
        listData={this.props.data}
        selectorFunction={this.props.selectorFunction}
      />
    }

    let newTaskButton;
    if (this.props.data) {
      newTaskButton =
      <div
        className="small-1 columns list-header-new"
        onClick={this.toggleNew}>
        +
      </div>
    }

    return(
      <div className="small-8 columns task-wrapper">
        <div className="small-12 columns callout task-header">
          <div className="small-11 columns list-header-text">{listName}</div>
          {newTaskButton}
        </div>
        <div className="small-12 columns callout task-bar">
          {newTaskForm}
          {tasks}
        </div>
      </div>
    )
  }
}

export default TaskContainer
