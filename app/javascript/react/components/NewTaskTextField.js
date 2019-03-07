import React from 'react';

const NewTaskTextField = props => {
  return (
    <div className='input-group'>
      <input className="small-10 columns"
        className='input-group-field'
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content} />
      <div className="small-2 columns callout new-task-label">{props.label}</div>
    </div>
  );
}

export default NewTaskTextField;
