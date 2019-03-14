import React, { Component } from 'react';
import EditTaskTextField from '../components/EditTaskTextField'
import EditTaskTextArea from '../components/EditTaskTextArea'

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: this.props.data.name,
      notesText: this.props.data.notes
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleNameTextChange = this.handleNameTextChange.bind(this);
    this.handleNotesTextChange = this.handleNotesTextChange.bind(this);
    this.handleCompleteSubmit = this.handleCompleteSubmit.bind(this)
  }

  handleClearForm() {
    this.setState({ nameText: "", notesText: "" })
  }

  handleEditSubmit(event) {
    event.preventDefault();
    let formPayload = {task: {
      list_id: `${this.props.data.list_id}`,
      task_id: `${this.props.data.id}`,
      name: `${this.state.nameText}`,
      notes: `${this.state.notesText}`
    }};
    fetch(`/lists/${this.props.data.list_id}/tasks/${this.props.data.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
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
        console.log(response);
        this.handleClearForm();
        this.props.updateListData(response)
        this.props.handleEdit()
        this.props.selectList(this.props.data.list_id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleCompleteSubmit(event) {
    event.preventDefault();
    let completeFormPayload = {task: {
      list_id: `${this.props.data.list_id}`,
      task_id: `${this.props.data.id}`,
      completed: ""
    }};
    fetch(`/lists/${this.props.data.list_id}/tasks/${this.props.data.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(completeFormPayload),
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
        console.log("From edit container:");
        console.log(this.props.data.list_id);
        console.log(this.props.data.id);
        console.log(response);
        this.props.updateListData(response)
        this.props.selectList(this.props.data.list_id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleNameTextChange(event) {
    this.setState({ nameText: event.target.value })
  }

  handleNotesTextChange(event) {
    this.setState({ notesText: event.target.value })
  }

  render() {
    return(
      <div className={"small-12 columns callout button task-tile"}>
        <div className="small-8 columns edit-task-wrapper">
          <form className="small-12 columns edit-form-container edit-task-form"
                onSubmit={this.handleEditSubmit}>
            <EditTaskTextField
              label='Task'
              name='name'
              content={this.state.nameText}
              handlerFunction={this.handleNameTextChange}
            />
            <EditTaskTextArea
              label='Notes'
              name='notes'
              content={this.state.notesText}
              handlerFunction={this.handleNotesTextChange}
            />
            <div className='input-group-button'>
              <input type='submit' className='small-2 columns callout button submit-edit-task' value='Save' />
            </div>
          </form>
        </div>

        <div className="small-4 columns task-button-area">
          <div
            className="small-2 columns task-crud"
            onClick={this.props.handleEdit}>
            ✎
          </div>
          <div className="small-1 columns spacer">.</div>
          <div
            className="small-2 columns task-crud"
            onClick={this.props.handleDelete}>
            ✘
          </div>
          <div className="small-1 columns spacer">.</div>
          <div
            className="small-4 columns task-crud check-button"
            onClick={this.handleCompleteSubmit}>
            ✓
          </div>
        </div>
      </div>
    )
  }
}

export default EditTaskContainer
