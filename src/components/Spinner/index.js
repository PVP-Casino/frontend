import React from 'react';
import './index.css';
const Spinner = () => {
  return (
    <div className='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Spinner;
