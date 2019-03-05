import React from 'react';

const TextField = props => {
  return (
    <div className='input-group'>
      <input
        className='input-group-field'
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content} />
      <div className='input-group-button'>
        <input type='submit' className='submit-new' value='+' />
      </div>
    </div>
  );
}

export default TextField;
