import React from 'react'
import ListContainer from '../containers/ListContainer'

export const App = (props) => {
  let height = window.outerHeight
  let style = {
    height: height * .75,
    width: "100%",
    backgroundColor: "#E0DFD5"
  }
  return (
    <div>
      <div className="spacer-row"></div>
      <div className="row">
        <div style={style} className="callout">
          <ListContainer />
        </div>
      </div>
    </div>
  )
}

export default App
