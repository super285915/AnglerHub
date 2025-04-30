import React from 'react';
import NotFoundPage from './NotFoundPage';

const FishSpeciesNotFoundPage: React.FC = () => {
  return (
    <NotFoundPage 
      title="Fish Species Not Found"
      message="The fish species you're looking for doesn't exist in our database or has been moved."
      backLink="/species"
      backText="Browse All Species"
    />
  );
};

export default FishSpeciesNotFoundPage;
