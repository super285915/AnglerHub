import React from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Divider, useTheme } from '@mui/material';
import { ChevronRight, MapPin, Compass, BookOpen, Award } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FishingSpotCard from '../components/FishingSpotCard';
import ArticleCard from '../components/ArticleCard';
import FishSpeciesCard from '../components/FishSpeciesCard';
import InteractiveFishingMap from '../components/InteractiveFishingMap';
import { fishingSpots } from '../data/fishingSpots';
import { articles } from '../data/articles';
import { fishSpeciesData } from '../data/fishSpecies';

const HomePage: React.FC = () => {
  const theme = useTheme();
  return (
    <Box>
      <HeroSection />

      {/* Featured Fishing Spots */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Featured Fishing Spots
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Discover the perfect location for your next fishing adventure
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/map"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            View All Spots
          </Button>
        </Box>

        <Grid container spacing={3}>
          {fishingSpots.map((spot) => (
            <Grid item key={spot.id} xs={12} sm={6} md={3}>
              <FishingSpotCard spot={spot} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/map"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            View All Spots
          </Button>
        </Box>
      </Container>

      {/* Interactive Fishing Map */}
      <Box sx={{ bgcolor: 'background.default', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Find Fishing Spots Near You
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Explore our interactive map of fishing locations
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MapPin />}
              component={RouterLink}
              to="/map"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Full Map
            </Button>
          </Box>

          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <InteractiveFishingMap spots={fishingSpots} />
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MapPin />}
              component={RouterLink}
              to="/map"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              Full Map
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Fish Species Guide */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Fish Species Guide
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Learn about different fish species, their habitats, and fishing techniques
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/species"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Browse All Species
          </Button>
        </Box>

        <Grid container spacing={3}>
          {fishSpeciesData.slice(0, 4).map((species) => (
            <Grid item key={species.id} xs={12} sm={6} md={3}>
              <FishSpeciesCard species={species} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/species"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            Browse All Species
          </Button>
        </Box>
      </Container>

      {/* Features Highlight */}
      <Box
        sx={{
          position: 'relative',
          py: 10,
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="rgba(255,255,255,.05)" fill-rule="evenodd"/%3E%3C/svg%3E")',
            backgroundSize: '20px 20px',
            opacity: 0.5,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Everything You Need For Your Fishing Journey
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Our comprehensive platform provides all the tools and information you need to plan and enjoy your perfect fishing adventure.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.2)',
                    mb: 3,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <MapPin
                    size={40}
                    strokeWidth={1.5}
                    color="white"
                  />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Fishing Locations
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Discover the best fishing spots with detailed information about each location.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.2)',
                    mb: 3,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Compass
                    size={40}
                    strokeWidth={1.5}
                    color="white"
                  />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Interactive Maps
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Navigate with our detailed maps showing the best fishing spots and conditions.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.2)',
                    mb: 3,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <BookOpen
                    size={40}
                    strokeWidth={1.5}
                    color="white"
                  />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Expert Guides
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Learn fishing techniques and tips from our comprehensive guides and tutorials.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.2)',
                    mb: 3,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Award
                    size={40}
                    strokeWidth={1.5}
                    color="white"
                  />
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Species Database
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Access detailed information about fish species, habits, and catching techniques.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Latest Articles */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Latest Articles
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Fishing tips, techniques, and conservation news
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/articles"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Read All Articles
          </Button>
        </Box>

        <Grid container spacing={3}>
          {articles.slice(0, 3).map((article) => (
            <Grid item key={article.id} xs={12} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            component={RouterLink}
            to="/articles"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            Read All Articles
          </Button>
        </Box>
      </Container>

      {/* Newsletter Signup */}
      <Box
        sx={{
          py: 12,
          position: 'relative',
          backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(20, 20, 40, 0.8)'
                : 'rgba(255, 255, 255, 0.85)',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.5)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0,
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  textAlign: 'center',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)'
                    : 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Stay Updated with Fishing News
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 5,
                  textAlign: 'center',
                  maxWidth: '700px',
                  mx: 'auto',
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                Subscribe to our newsletter to receive fishing tips, new spot alerts, and exclusive content delivered straight to your inbox.
              </Typography>

              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: '600px',
                mx: 'auto',
                position: 'relative',
              }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -10,
                      left: -10,
                      right: -10,
                      bottom: -10,
                      background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                      borderRadius: '16px',
                      opacity: 0.5,
                      filter: 'blur(15px)',
                      zIndex: -1,
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 97, 255, 0.2)',
                      fontSize: '16px',
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.9)',
                      color: theme.palette.text.primary,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 97, 255, 0.5)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 97, 255, 0.2)';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.transform = 'scale(1.02)';
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 97, 255, 0.2)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.transform = 'scale(1)';
                      }
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: { xs: 1.8, sm: 2 },
                    whiteSpace: 'nowrap',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1rem',
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
                  Subscribe
                </Button>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 3,
                  color: theme.palette.text.secondary,
                  opacity: 0.8
                }}
              >
                We respect your privacy. Unsubscribe at any time.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;