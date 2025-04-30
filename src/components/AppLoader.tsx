import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { Fish } from 'lucide-react';

interface AppLoaderProps {
  message?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ message = 'Loading AnglerHub...' }) => {
  return (
    <Fade in={true} timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              mb: 3,
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              size={80}
              thickness={2}
              sx={{
                position: 'absolute',
                color: 'primary.main',
              }}
            />
            <Fish size={40} color="#1976d2" />
          </Box>
          
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'primary.main',
            }}
          >
            AnglerHub
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default AppLoader;
