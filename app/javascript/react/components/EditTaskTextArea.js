import React from 'react';

const EditTaskTextArea = props => {
  return (
    <div className='input-group edit-task-text-area'>
      <div className="small-2 columns callout edit-task-label">{props.label}</div>
      <textarea className="small-10 columns text-area"
        name={props.name}
        onChange={props.handlerFunction}
        value={props.content} />
    </div>
  );
}

export default EditTaskTextArea;
