import React from 'react';

const EditTextField = props => {
  return (
    <div className='input-group edit-form'>
      <input
        className='input-group-field'
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content} />
      <div className='input-group-button'>
        <input type='submit' className='submit-edit' value='Save' />
      </div>
    </div>
  );
}

export default EditTextField;
