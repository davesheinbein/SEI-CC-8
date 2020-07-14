import React from 'react';
import './PuppyListPage.css';
import PuppyListItem from '../../components/PuppyListItem/PuppyListItem';

function PuppyListPage(props) {
  return (
    <>
      <h1>Puppy List</h1>
      <div className='PuppyListPage-grid'>
        {props.puppies.map(puppy => 
          <PuppyListItem
            puppy={puppy}
            handleDeletePuppy={props.handleDeletePuppy}
            key={puppy._id}
          />
        )}
      </div>
    </>
  );
}

export default PuppyListPage;