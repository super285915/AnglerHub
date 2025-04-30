import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Home, ArrowLeft } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface NotFoundPageProps {
  title?: string;
  message?: string;
  backLink?: string;
  backText?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  backLink = "/",
  backText = "Back to Home"
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            py: 4
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: { xs: '5rem', md: '8rem' },
              color: 'primary.main',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              color: 'text.primary'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              maxWidth: '600px', 
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            {message}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to={backLink}
              startIcon={<Home />}
              sx={{ px: 3, py: 1 }}
            >
              {backText}
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={handleGoBack}
              startIcon={<ArrowLeft />}
              sx={{ px: 3, py: 1 }}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
