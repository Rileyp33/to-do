import React, { Component } from 'react'
import ListContainer from '../containers/ListContainer'
import TaskContainer from '../containers/TaskContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      selectedList: null,
      selectedListData: null
    }
    this.setSelectedList = this.setSelectedList.bind(this)
    this.updateListData = this.updateListData.bind(this)
  }

  updateListData(response) {
    this.setState({ listData: response })
  }

  componentDidMount() {
    fetch('/api/v1/lists')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.text())
      .then(body => {
        return JSON.parse(body);
      })
      .then(parsedBody => {
        this.setState({ listData: parsedBody })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setSelectedList(selectedId) {
    this.setState({ selectedList: selectedId })
    console.log("Function called:");
    console.log(this.state.selectedList);
    let selectedData = this.state.listData.find(l => l.id == selectedId)
    this.setState({ selectedListData: selectedData })
    console.log("Selected data:");
    console.log(this.state.selectedListData);
  }

  render() {
    let height = window.outerHeight
    let style = {
      height: height * .75,
      width: "100%",
      backgroundColor: "#E8E9EB"
    }
    return (
      <div>
        <div className="spacer-row"></div>
        <div className="row">
          <div style={style} className="callout app-wrapper">
            <ListContainer
              data={this.state.listData}
              selectorFunction={this.setSelectedList}
              updateListData={this.updateListData}
            />
            <TaskContainer
              data={this.state.selectedListData}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
