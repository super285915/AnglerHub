import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  Fade,
  useTheme
} from '@mui/material';
import {
  Leaf,
  Droplets,
  Fish,
  Heart,
  ExternalLink,
  ChevronRight,
  Award,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Mock data for conservation initiatives
const conservationInitiatives = [
  {
    id: 1,
    title: 'Habitat Restoration Project',
    description: 'Restoring critical spawning grounds and improving water quality in the Columbia River Basin.',
    organization: 'Pacific Northwest Conservation Alliance',
    location: 'Columbia River, WA/OR',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'Habitat Restoration',
    impact: '2,500 acres of habitat restored, 15% increase in salmon population',
    website: 'https://example.com/pnca'
  },
  {
    id: 2,
    title: 'Clean Water Initiative',
    description: 'Reducing pollution and improving water quality in lakes and streams across the Midwest.',
    organization: 'Great Lakes Conservation Trust',
    location: 'Great Lakes Region',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'Water Quality',
    impact: '30% reduction in harmful pollutants, improved habitat for 12 native fish species',
    website: 'https://example.com/glct'
  },
  {
    id: 3,
    title: 'Native Fish Reintroduction',
    description: 'Reintroducing native trout species to streams where they were previously extirpated.',
    organization: 'Trout Unlimited',
    location: 'Rocky Mountain Region',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'Species Recovery',
    impact: 'Successfully reintroduced 3 native trout species to 28 stream miles',
    website: 'https://example.com/tu'
  },
  {
    id: 4,
    title: 'Sustainable Fishing Education',
    description: 'Teaching anglers about sustainable fishing practices and proper catch-and-release techniques.',
    organization: 'Angler Conservation Network',
    location: 'Nationwide',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'Education',
    impact: 'Educated over 10,000 anglers, resulting in improved fish survival rates',
    website: 'https://example.com/acn'
  }
];

// Mock data for sustainable practices
const sustainablePractices = [
  {
    title: 'Catch and Release',
    description: 'Learn proper techniques to ensure fish survive after release.',
    tips: [
      'Use barbless hooks to minimize injury',
      'Keep the fish in the water as much as possible',
      'Wet your hands before handling fish to protect their slime coat',
      'Support the fish horizontally and avoid squeezing',
      'Revive the fish before release by gently moving it back and forth in the water'
    ],
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    title: 'Tackle Management',
    description: 'Prevent pollution and wildlife harm through proper tackle management.',
    tips: [
      'Never leave fishing line, hooks, or other tackle behind',
      'Collect and properly dispose of any line or tackle you find',
      'Consider using lead-free sinkers to prevent lead poisoning in wildlife',
      'Opt for biodegradable tackle when available',
      'Recycle old fishing line at designated collection points'
    ],
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    title: 'Habitat Protection',
    description: 'Help preserve the environments that support healthy fish populations.',
    tips: [
      'Stay on established trails and access points',
      'Avoid trampling vegetation along shorelines',
      'Never introduce non-native species to waterways',
      'Report habitat destruction or pollution to authorities',
      'Participate in local habitat restoration projects'
    ],
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  }
];

// Mock data for volunteer opportunities
const volunteerOpportunities = [
  {
    title: 'Stream Cleanup Day',
    organization: 'River Keepers Alliance',
    date: 'June 15, 2023',
    location: 'Multiple locations',
    description: 'Join us for a day of cleaning up trash and debris from local streams and riverbanks.',
    website: 'https://example.com/cleanup'
  },
  {
    title: 'Habitat Restoration Project',
    organization: 'Trout Unlimited',
    date: 'July 8-9, 2023',
    location: 'Cedar Creek, WA',
    description: 'Help plant native vegetation and install woody debris to improve fish habitat.',
    website: 'https://example.com/habitat'
  },
  {
    title: 'Fish Population Survey',
    organization: 'State Department of Fish & Wildlife',
    date: 'August 12, 2023',
    location: 'Lake Washington, WA',
    description: 'Assist biologists with fish counting and data collection to monitor population health.',
    website: 'https://example.com/survey'
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`conservation-tabpanel-${index}`}
      aria-labelledby={`conservation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ConservationPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const theme = useTheme();

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Fade in={!pageLoading} timeout={800}>
        <Box>
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 800,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)'
                  : 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Conservation
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 5,
                maxWidth: '800px',
                fontWeight: 400,
                lineHeight: 1.5
              }}
            >
              Learn about conservation initiatives, sustainable fishing practices, and how you can help protect our aquatic resources.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(56, 142, 60, 0.2) 0%, rgba(56, 142, 60, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(56, 142, 60, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(56, 142, 60, 0.3)'
                  : 'rgba(56, 142, 60, 0.2)',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.1,
                  zIndex: 0,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle at top right, rgba(129, 199, 132, 0.2) 0%, rgba(129, 199, 132, 0) 70%)',
                  zIndex: 0,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                  }}
                >
                  Why Conservation Matters
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    maxWidth: '90%',
                    color: theme.palette.text.primary,
                  }}
                >
                  Healthy fisheries depend on clean water, intact habitat, and sustainable management.
                  By supporting conservation efforts and practicing responsible angling, you can help ensure
                  that our aquatic resources remain vibrant for generations to come.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                  <Chip
                    icon={<Leaf size={18} />}
                    label="Protect Habitats"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.3)' : 'rgba(56, 142, 60, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main },
                    }}
                  />
                  <Chip
                    icon={<Droplets size={18} />}
                    label="Clean Water"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.3)' : 'rgba(56, 142, 60, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main },
                    }}
                  />
                  <Chip
                    icon={<Fish size={18} />}
                    label="Healthy Fish Populations"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.3)' : 'rgba(56, 142, 60, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main },
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Tabs Navigation */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: '16px',
              mb: 5,
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 10px 40px rgba(0, 0, 0, 0.2)'
                : '0 10px 40px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="conservation tabs"
              sx={{
                '& .MuiTab-root': {
                  py: 2.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.7)'
                    : 'rgba(0, 0, 0, 0.7)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: theme.palette.mode === 'dark'
                      ? '#ffffff'
                      : theme.palette.success.dark,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(56, 142, 60, 0.1)'
                      : 'rgba(56, 142, 60, 0.05)',
                  },
                  '&.Mui-selected': {
                    color: theme.palette.mode === 'dark'
                      ? '#ffffff'
                      : theme.palette.success.dark,
                    fontWeight: 700,
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px',
                  background: 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)',
                }
              }}
            >
              <Tab
                label="Initiatives"
                icon={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: tabValue === 0
                        ? (theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)')
                        : 'transparent',
                      transition: 'all 0.2s ease',
                      mr: 1,
                    }}
                  >
                    <Award
                      size={20}
                      color={tabValue === 0
                        ? (theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main)
                        : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')}
                    />
                  </Box>
                }
                iconPosition="start"
                id="conservation-tab-0"
                aria-controls="conservation-tabpanel-0"
              />
              <Tab
                label="Sustainable Practices"
                icon={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: tabValue === 1
                        ? (theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)')
                        : 'transparent',
                      transition: 'all 0.2s ease',
                      mr: 1,
                    }}
                  >
                    <Heart
                      size={20}
                      color={tabValue === 1
                        ? (theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main)
                        : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')}
                    />
                  </Box>
                }
                iconPosition="start"
                id="conservation-tab-1"
                aria-controls="conservation-tabpanel-1"
              />
              <Tab
                label="Get Involved"
                icon={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: tabValue === 2
                        ? (theme.palette.mode === 'dark' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(56, 142, 60, 0.1)')
                        : 'transparent',
                      transition: 'all 0.2s ease',
                      mr: 1,
                    }}
                  >
                    <Users
                      size={20}
                      color={tabValue === 2
                        ? (theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main)
                        : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')}
                    />
                  </Box>
                }
                iconPosition="start"
                id="conservation-tab-2"
                aria-controls="conservation-tabpanel-2"
              />
            </Tabs>

            {/* Initiatives Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60px',
                      height: '4px',
                      background: 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Conservation Initiatives
                </Typography>

                <Grid container spacing={4}>
                  {conservationInitiatives.map((initiative) => (
                    <Grid item xs={12} md={6} key={initiative.id}>
                      <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                          : '0 10px 30px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                            : '0 15px 40px rgba(0, 0, 0, 0.15)',
                        },
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      }}>
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={initiative.imageUrl}
                            alt={initiative.title}
                            sx={{
                              transition: 'transform 0.5s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                          {/* Gradient overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              height: '50%',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                              zIndex: 0,
                            }}
                          />
                          {/* Category badge */}
                          <Chip
                            label={initiative.category}
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              backgroundColor: 'rgba(56, 142, 60, 0.8)',
                              color: 'white',
                              fontWeight: 600,
                              borderRadius: '8px',
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.success.dark,
                            }}
                          >
                            {initiative.title}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              mb: 3,
                              color: theme.palette.text.secondary,
                              lineHeight: 1.6,
                              fontWeight: 500,
                            }}
                          >
                            {initiative.description}
                          </Typography>

                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: '12px',
                              background: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.03)'
                                : 'rgba(56, 142, 60, 0.03)',
                              border: '1px solid',
                              borderColor: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(56, 142, 60, 0.1)',
                            }}
                          >
                            <List dense disablePadding>
                              <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <Users size={20} color={theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={initiative.organization}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    sx: { fontWeight: 600 }
                                  }}
                                />
                              </ListItem>

                              <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <MapPin size={20} color={theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={initiative.location}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    sx: { fontWeight: 600 }
                                  }}
                                />
                              </ListItem>

                              <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <Award size={20} color={theme.palette.mode === 'dark' ? '#81c784' : theme.palette.success.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={initiative.impact}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    sx: { fontWeight: 600 }
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Paper>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button
                            variant="contained"
                            size="medium"
                            endIcon={<ExternalLink size={18} />}
                            href={initiative.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              borderRadius: '10px',
                              background: 'linear-gradient(45deg, #388e3c 30%, #81c784 90%)',
                              boxShadow: '0 4px 12px rgba(56, 142, 60, 0.2)',
                              color: 'white',
                              fontWeight: 600,
                              '&:hover': {
                                background: 'linear-gradient(45deg, #2e7d32 30%, #66bb6a 90%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 15px rgba(56, 142, 60, 0.3)',
                              }
                            }}
                          >
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            {/* Sustainable Practices Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Sustainable Fishing Practices
                </Typography>

                <Typography variant="body1" paragraph>
                  Adopting sustainable fishing practices helps ensure healthy fish populations and ecosystems.
                  Here are some key practices that every angler should follow:
                </Typography>

                <Grid container spacing={4}>
                  {sustainablePractices.map((practice, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: { xs: 'column', md: 'row' },
                          gap: 3
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: '100%', md: '30%' },
                            minWidth: { md: 250 },
                            height: { xs: 200, md: 'auto' },
                            borderRadius: 1,
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                        >
                          <img
                            src={practice.imageUrl}
                            alt={practice.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center'
                            }}
                          />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {practice.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {practice.description}
                          </Typography>

                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Best Practices:
                          </Typography>
                          <List dense>
                            {practice.tips.map((tip, tipIndex) => (
                              <ListItem key={tipIndex} disableGutters>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <CheckCircle size={16} color={theme.palette.success.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={tip}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: 'warning.light',
                      color: 'warning.contrastText',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <AlertTriangle size={24} style={{ marginRight: '12px', marginTop: '2px' }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Practices to Avoid
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Some fishing practices can be harmful to fish populations and aquatic ecosystems:
                        </Typography>
                        <List dense disablePadding>
                          <ListItem disableGutters>
                            <ListItemText
                              primary="Keeping more fish than you need or exceeding legal limits"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText
                              primary="Fishing in spawning areas during breeding seasons"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText
                              primary="Using illegal fishing methods like dynamite or electrofishing"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText
                              primary="Releasing non-native species into waterways"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText
                              primary="Leaving fishing line, hooks, or other tackle in the environment"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </TabPanel>

            {/* Get Involved Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Get Involved
                </Typography>

                <Typography variant="body1" paragraph>
                  There are many ways to contribute to conservation efforts. Whether you have a little time or a lot,
                  your involvement can make a real difference in protecting our aquatic resources.
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <Users size={20} style={{ marginRight: '8px' }} />
                        Volunteer Opportunities
                      </Typography>

                      <List>
                        {volunteerOpportunities.map((opportunity, index) => (
                          <React.Fragment key={index}>
                            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                    {opportunity.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                      {opportunity.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                      <Chip
                                        icon={<Users size={14} />}
                                        label={opportunity.organization}
                                        size="small"
                                        variant="outlined"
                                      />
                                      <Chip
                                        icon={<Calendar size={14} />}
                                        label={opportunity.date}
                                        size="small"
                                        variant="outlined"
                                      />
                                      <Chip
                                        icon={<MapPin size={14} />}
                                        label={opportunity.location}
                                        size="small"
                                        variant="outlined"
                                      />
                                    </Box>
                                  </Box>
                                }
                              />
                              <Button
                                size="small"
                                endIcon={<ExternalLink size={16} />}
                                href={opportunity.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ ml: 1, mt: 1 }}
                              >
                                Details
                              </Button>
                            </ListItem>
                            {index < volunteerOpportunities.length - 1 && (
                              <Divider component="li" sx={{ my: 2 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <Heart size={20} style={{ marginRight: '8px' }} />
                        Support Conservation Organizations
                      </Typography>

                      <Typography variant="body2" paragraph>
                        These organizations work tirelessly to protect our aquatic resources. Consider supporting them through donations or membership:
                      </Typography>

                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Trout Unlimited"
                            secondary="Conserving, protecting and restoring North America's coldwater fisheries and their watersheds"
                          />
                          <Button
                            size="small"
                            endIcon={<ExternalLink size={16} />}
                            href="https://www.tu.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                          </Button>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemText
                            primary="Coastal Conservation Association"
                            secondary="Advocating for marine resources and protecting coastal environments"
                          />
                          <Button
                            size="small"
                            endIcon={<ExternalLink size={16} />}
                            href="https://ccausa.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                          </Button>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemText
                            primary="The Nature Conservancy"
                            secondary="Working to protect ecologically important lands and waters"
                          />
                          <Button
                            size="small"
                            endIcon={<ExternalLink size={16} />}
                            href="https://www.nature.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                          </Button>
                        </ListItem>
                      </List>
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <Leaf size={20} style={{ marginRight: '8px' }} />
                        Other Ways to Help
                      </Typography>

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle size={16} color={theme.palette.success.main} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Purchase a fishing license, even if not required for you"
                            secondary="License fees fund conservation efforts"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle size={16} color={theme.palette.success.main} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Participate in citizen science projects"
                            secondary="Help collect valuable data on fish populations and water quality"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle size={16} color={theme.palette.success.main} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Educate others about conservation"
                            secondary="Share sustainable fishing practices with friends and family"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle size={16} color={theme.palette.success.main} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Report pollution or habitat destruction"
                            secondary="Be the eyes and ears for environmental agencies"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle size={16} color={theme.palette.success.main} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Advocate for conservation policies"
                            secondary="Contact your representatives about issues that matter"
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>

          {/* Call to Action */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #388e3c 0%, #81c784 100%)',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 20px 80px rgba(56, 142, 60, 0.3)',
              mt: 6,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                zIndex: 0,
              },
              '&::after': {
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
                sx={{
                  mb: 3,
                  fontWeight: 800,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                Join the Conservation Movement
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  maxWidth: 800,
                  mx: 'auto',
                  fontWeight: 500,
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                Every angler can make a difference in protecting our aquatic resources.
                Start by practicing sustainable fishing, supporting conservation organizations,
                and spreading awareness about the importance of healthy waterways.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ChevronRight size={22} />}
                href="#get-involved"
                onClick={() => setTabValue(2)}
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#388e3c',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'white',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Involved Today
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Loading Skeleton */}
      {pageLoading && (
        <Box>
          <LoadingSkeleton type="detail" />
          <Box sx={{ mt: 4 }}>
            <LoadingSkeleton type="card" count={2} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ConservationPage;
