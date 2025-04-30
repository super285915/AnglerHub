import React from 'react';
import NotFoundPage from './NotFoundPage';

const TechniqueNotFoundPage: React.FC = () => {
  return (
    <NotFoundPage 
      title="Fishing Technique Not Found"
      message="The fishing technique you're looking for doesn't exist in our database or has been moved."
      backLink="/techniques"
      backText="Browse All Techniques"
    />
  );
};

export default TechniqueNotFoundPage;
