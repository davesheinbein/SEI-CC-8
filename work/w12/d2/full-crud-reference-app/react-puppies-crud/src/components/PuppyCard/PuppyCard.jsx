import React from 'react';
import {Link} from 'react-router-dom';

function PuppyCard({puppy}) { 
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{puppy.name}</h3>
      </div>
      <div className='panel-body'>
        <dl>
          <dt>Breed</dt>
          <dd>{puppy.breed}</dd>
          <dt>Age</dt>
          <dd>{puppy.age}</dd>
        </dl>
      </div>
      <div className='panel-footer'>
        <Link to='/'>RETURN TO LIST</Link>
      </div>
    </div>
  );
}

export default PuppyCard;