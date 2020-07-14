import React from 'react';
import PuppyCard from '../../components/PuppyCard/PuppyCard';

function PuppyDetailPage(props) {
  // Refer to PuppyListItem to see how puppy is being passed via the <Link>
  const puppy = props.location.state.puppy;
  return (
    <>
      <h1>Puppy Details</h1>
      <PuppyCard
        key={puppy._id}
        puppy={puppy}
      />
    </>
  );
}

export default PuppyDetailPage;