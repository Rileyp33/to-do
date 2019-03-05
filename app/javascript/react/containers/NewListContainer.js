import React, { Component } from 'react';
import TextField from '../components/TextField'

class NewListContainer extends Component {
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
    let formPayload = {
      name: this.state.text
    };
    fetch('/lists', {
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
        console.log(response);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value })
    console.log(this.state.text);
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <TextField
          content={this.state.text}
          name='message'
          handlerFunction={this.handleTextChange}
          />
      </form>
    )
  }
}

export default NewListContainer
