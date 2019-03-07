import React, { Component } from 'react';
import NewTaskTextField from '../components/NewTaskTextField'

class NewTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskText: "",
      notesText: ""
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
    this.handleNotesTextChange = this.handleNotesTextChange.bind(this);
  }

  handleClearForm() {
    this.setState({ taskText: "", notesText: "" })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      id: this.props.listData.id,
      name: this.state.taskText,
      notes: this.state.notesText
    };
    fetch(`/lists/${this.props.listData.id}/tasks`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.handleClearForm();
        this.props.updateListData(response)
        this.props.toggleNew()
        this.props.selectorFunction(this.props.listData.id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleTaskTextChange(event) {
    this.setState({ taskText: event.target.value })
  }

  handleNotesTextChange(event) {
    this.setState({ notesText: event.target.value })
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit} className="callout new-task-form">
        <NewTaskTextField
          content={this.state.text}
          name='task'
          label="Task"
          handlerFunction={this.handleTaskTextChange}
          />
        <NewTaskTextField
            content={this.state.text}
            name='notes'
            label="Notes"
            handlerFunction={this.handleNotesTextChange}
          />
        <div className='new-task-button'>
          <input type='submit' className='callout button submit-new-task' value='+' />
        </div>
      </form>
    )
  }
}

export default NewTaskContainer
