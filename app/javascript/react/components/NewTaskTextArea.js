import React from 'react';

const NewTaskTextArea = props => {
  return (
    <div className='input-group'>
      <textarea className="columns text-area new-task-text-area"
        name={props.name}
        onChange={props.handlerFunction}
        value={props.content} />
      <div className="columns callout new-task-label">{props.label}</div>
    </div>
  );
}

export default NewTaskTextArea;
