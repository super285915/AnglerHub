import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { MapPin, Compass } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '80vh' },
        minHeight: { xs: '450px', md: '600px' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: theme.palette.mode === 'dark' ? 'brightness(0.4)' : 'brightness(0.6)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '60%' },
            color: 'white',
            position: 'relative',
            zIndex: 1,
            py: 5,
            px: { xs: 3, md: 5 },
            backdropFilter: 'blur(5px)',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,40,0.7) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,40,0.5) 100%)',
            borderRadius: 4,
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
              zIndex: -1,
            }
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
              mb: 2,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              background: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Discover Your Perfect Fishing Adventure
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              fontWeight: 400,
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              opacity: 0.9,
              maxWidth: '90%',
              lineHeight: 1.5,
            }}
          >
            Find the best fishing spots, learn expert techniques, and connect with fellow anglers.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MapPin />}
              component={RouterLink}
              to="/map"
              sx={{
                py: 1.8,
                px: 4,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '1rem',
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                boxShadow: '0 5px 20px rgba(0, 97, 255, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(0, 97, 255, 0.5)',
                  background: 'linear-gradient(45deg, #0052d6 30%, #40cfff 90%)',
                }
              }}
            >
              Explore Fishing Map
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/species"
              sx={{
                py: 1.8,
                px: 4,
                fontWeight: 600,
                fontSize: '1rem',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: '2px',
                borderRadius: '12px',
                textDecoration: 'none',
                backdropFilter: 'blur(5px)',
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                },
              }}
              startIcon={<Compass />}
            >
              Browse Fish Species
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;