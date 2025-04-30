import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundRedirectProps {
  to: string;
}

/**
 * Component that redirects to a specific not found page
 */
const NotFoundRedirect: React.FC<NotFoundRedirectProps> = ({ to }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  
  return null;
};

export default NotFoundRedirect;
