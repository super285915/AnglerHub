import React from 'react';
import NotFoundPage from './NotFoundPage';

const FishingSpotNotFoundPage: React.FC = () => {
  return (
    <NotFoundPage 
      title="Fishing Spot Not Found"
      message="The fishing spot you're looking for doesn't exist in our database or has been moved."
      backLink="/map"
      backText="Explore Fishing Map"
    />
  );
};

export default FishingSpotNotFoundPage;
