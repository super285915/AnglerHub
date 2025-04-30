import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
  fullScreen?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  message = 'Loading...',
  fullScreen = false,
  transparent = false,
  children
}) => {
  if (!loading && children) {
    return <>{children}</>;
  }
  
  return (
    <Fade in={loading} timeout={300}>
      <Box
        sx={{
          position: fullScreen ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: transparent ? 'rgba(255, 255, 255, 0.7)' : 'background.paper',
          zIndex: fullScreen ? 9999 : 1,
          p: 3,
        }}
      >
        <CircularProgress size={48} color="primary" />
        {message && (
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontWeight: 'medium',
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Fade>
  );
};

export default LoadingOverlay;
