import React from 'react';

const EditTaskTextField = props => {
  return (
    <div className='input-group'>
      <div className="small-2 columns callout edit-task-label">{props.label}</div>
      <input className="small-10 columns"
        className='input-group-field edit-task-field'
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content} />
    </div>
  );
}

export default EditTaskTextField;
