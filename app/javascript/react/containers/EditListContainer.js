import React, { Component } from 'react';
import EditTextField from '../components/EditTextField'

class EditListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleClearForm() {
    this.setState({ text: "" })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {list: {
      id: `${this.props.id}`,
      new_list_name: `${this.state.text}`
    }};
    fetch(`/lists/${this.props.id}`, {
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
        this.props.handleSelect(this.props.id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value })
    console.log(this.state.text);
  }

  render() {
    return(
      <form className="small-8 columns edit-form-container" onSubmit={this.handleFormSubmit}>
        <EditTextField
          content={this.state.text}
          name='message'
          handlerFunction={this.handleTextChange}
          />
      </form>
    )
  }
}

export default EditListContainer
