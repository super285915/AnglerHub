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
  Divider,
  TextField,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Link,
  Fade,
  useTheme
} from '@mui/material';
import {
  FileText,
  DollarSign,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  ExternalLink,
  MapPin,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Fish,
  Leaf,
  Globe
} from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Mock data for fishing licenses by state
const licenseData = [
  {
    state: 'Washington',
    annualFee: '$29.50',
    requirements: 'All anglers 15 years and older must have a license',
    validPeriod: '365 days from purchase date',
    website: 'https://wdfw.wa.gov/licenses/fishing',
    additionalInfo: 'Catch record card required for certain species',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    state: 'Oregon',
    annualFee: '$44.00',
    requirements: 'All anglers 12 years and older must have a license',
    validPeriod: 'Calendar year (Jan 1 - Dec 31)',
    website: 'https://myodfw.com/fishing/licensing-info',
    additionalInfo: 'Columbia River Basin endorsement required in some areas',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    state: 'California',
    annualFee: '$52.66',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: 'Calendar year (Jan 1 - Dec 31)',
    website: 'https://wildlife.ca.gov/Licensing/Fishing',
    additionalInfo: 'Report card required for certain species',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    state: 'Idaho',
    annualFee: '$30.50',
    requirements: 'All anglers 14 years and older must have a license',
    validPeriod: 'Calendar year (Jan 1 - Dec 31)',
    website: 'https://idfg.idaho.gov/licenses',
    additionalInfo: 'Salmon/steelhead permit required for those species',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  },
  {
    state: 'Montana',
    annualFee: '$25.00',
    requirements: 'All anglers 12 years and older must have a license',
    validPeriod: 'March 1 - February 28/29',
    website: 'https://fwp.mt.gov/buyandapply/fishinglicenses',
    additionalInfo: 'Conservation license required in addition to fishing license',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg'
  }
];

// FAQ data
const faqData = [
  {
    question: 'Do I need a fishing license?',
    answer: 'In most states, anyone over a certain age (typically 12-16 years) needs a fishing license to fish in public waters. Some states offer free fishing days or exemptions for certain groups like seniors, veterans, or disabled individuals. Always check your state regulations for specific requirements.'
  },
  {
    question: 'How do I get a fishing license?',
    answer: 'Fishing licenses can be purchased online through your state\'s fish and wildlife agency website, at sporting goods stores, bait shops, or sometimes at convenience stores. Many states now offer mobile apps where you can purchase and store your digital license.'
  },
  {
    question: 'What types of fishing licenses are available?',
    answer: 'Most states offer several types of licenses including: annual licenses, short-term licenses (1-day, 3-day, 7-day), resident vs. non-resident licenses, freshwater vs. saltwater licenses, and sometimes specialized licenses for certain species or fishing methods.'
  },
  {
    question: 'Do I need a separate license to fish in different states?',
    answer: 'Yes, fishing licenses are issued by individual states and are generally only valid in the state where they were purchased. If you plan to fish in multiple states, you\'ll need a license for each state. Some states have reciprocal agreements with neighboring states for certain boundary waters.'
  },
  {
    question: 'Are there any exemptions from needing a fishing license?',
    answer: 'Common exemptions include: children under a certain age, seniors over a certain age (in some states), military veterans with disabilities, fishing on private property (if you own the land), and fishing on designated "free fishing days." Exemptions vary widely by state.'
  }
];

const FishingLicensePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const theme = useTheme();

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedState(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLicenses = licenseData.filter(license => {
    if (selectedState && license.state !== selectedState) {
      return false;
    }

    if (searchQuery) {
      return license.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
             license.requirements.toLowerCase().includes(searchQuery.toLowerCase()) ||
             license.additionalInfo.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

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
              Fishing License Information
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
              Find information about fishing licenses, requirements, and how to obtain them in your state.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.2) 0%, rgba(0, 97, 255, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(96, 239, 255, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 97, 255, 0.2)',
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
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
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
                    color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                  }}
                >
                  Why Do You Need a Fishing License?
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
                  Fishing licenses help fund conservation efforts, habitat restoration, and fisheries management.
                  Your license purchase directly contributes to protecting and enhancing the waters you fish in.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                  <Chip
                    icon={<CheckCircle size={18} />}
                    label="Supports Conservation"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.2)' : 'rgba(0, 97, 255, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.3)' : 'rgba(0, 97, 255, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main },
                    }}
                  />
                  <Chip
                    icon={<CheckCircle size={18} />}
                    label="Funds Habitat Restoration"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.2)' : 'rgba(0, 97, 255, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.3)' : 'rgba(0, 97, 255, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main },
                    }}
                  />
                  <Chip
                    icon={<CheckCircle size={18} />}
                    label="Improves Fishing Access"
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.2)' : 'rgba(0, 97, 255, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(0, 97, 255, 0.3)' : 'rgba(0, 97, 255, 0.2)',
                      py: 1.5,
                      px: 1,
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main },
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Search and Filter */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 5,
              borderRadius: '16px',
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
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by state or requirement"
                  InputProps={{
                    startAdornment: (
                      <Search size={20} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                    ),
                    sx: {
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.3)'
                          : 'rgba(0, 97, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '1px',
                      }
                    }
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select State"
                  value={selectedState}
                  onChange={handleStateChange}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.3)'
                          : 'rgba(0, 97, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '1px',
                      }
                    }
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <MenuItem value="">All States</MenuItem>
                  {licenseData.map((license) => (
                    <MenuItem key={license.state} value={license.state}>
                      {license.state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* License Cards */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                borderRadius: '2px',
              }
            }}
          >
            License Information by State
          </Typography>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            {filteredLicenses.length > 0 ? (
              filteredLicenses.map((license) => (
                <Grid item xs={12} md={6} key={license.state}>
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
                        height="160"
                        image={license.imageUrl}
                        alt={`${license.state} fishing`}
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
                      {/* State badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                          color: 'white',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0, 97, 255, 0.3)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {license.state}
                        </Typography>
                      </Box>
                      {/* Fee badge */}
                      <Chip
                        label={license.annualFee}
                        icon={<DollarSign size={14} color="white" />}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          mb: 3,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                          borderBottom: '2px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(0, 97, 255, 0.3)'
                            : 'rgba(0, 97, 255, 0.2)',
                          pb: 1,
                          display: 'inline-block'
                        }}
                      >
                        License Details
                      </Typography>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 3,
                          borderRadius: '12px',
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 97, 255, 0.03)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 97, 255, 0.1)',
                        }}
                      >
                        <List dense disablePadding>
                          <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <FileText size={20} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main} />
                            </ListItemIcon>
                            <ListItemText
                              primary={license.requirements}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>

                          <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Calendar size={20} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main} />
                            </ListItemIcon>
                            <ListItemText
                              primary={license.validPeriod}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>

                          <ListItem disableGutters sx={{ px: 0, py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <AlertCircle size={20} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main} />
                            </ListItemIcon>
                            <ListItemText
                              primary={license.additionalInfo}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>
                        </List>
                      </Paper>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1.2,
                          borderRadius: '10px',
                          background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                          boxShadow: '0 4px 12px rgba(0, 97, 255, 0.2)',
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #0052d6 30%, #40cfff 90%)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 15px rgba(0, 97, 255, 0.3)',
                          }
                        }}
                        endIcon={<ExternalLink size={18} />}
                        component="a"
                        href={license.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Website
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: '16px',
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
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Search size={40} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    No licenses found matching your criteria
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Try adjusting your search or filter
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedState('');
                    }}
                    sx={{
                      borderRadius: '10px',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : theme.palette.primary.main,
                      color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 97, 255, 0.05)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 97, 255, 0.1)',
                      }
                    }}
                  >
                    Clear Filters
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>

          {/* How to Get a License */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                borderRadius: '2px',
              }
            }}
          >
            How to Get a Fishing License
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 6,
              borderRadius: '16px',
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
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: '12px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(0, 97, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 97, 255, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 97, 255, 0.2)'
                      : 'rgba(0, 97, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                    }}
                  >
                    <Clock size={22} style={{ marginRight: '12px', color: theme.palette.mode === 'dark' ? '#60efff' : '#0061ff' }} />
                    Online (Fastest Method)
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: '1rem',
                      fontWeight: 500,
                    }}
                  >
                    Most states offer online license purchasing through their fish and wildlife department websites.
                    You can typically print a temporary license immediately and may receive a physical card in the mail.
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                    }}
                  >
                    Benefits:
                  </Typography>
                  <List dense sx={{ mt: 'auto' }}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Available 24/7"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Immediate access to license"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Can be done from anywhere"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: '12px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(0, 97, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 97, 255, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 97, 255, 0.2)'
                      : 'rgba(0, 97, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                    }}
                  >
                    <MapPin size={22} style={{ marginRight: '12px', color: theme.palette.mode === 'dark' ? '#60efff' : '#0061ff' }} />
                    In-Person Locations
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: '1rem',
                      fontWeight: 500,
                    }}
                  >
                    Fishing licenses can be purchased at various retail locations including:
                  </Typography>
                  <List dense sx={{ mt: 'auto' }}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Sporting goods stores"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Bait and tackle shops"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Some convenience stores and gas stations"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle size={18} color={theme.palette.mode === 'dark' ? '#60efff' : theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary="State fish and wildlife offices"
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 3, opacity: 0.6 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                  }}
                >
                  What You'll Need:
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '12px',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(0, 97, 255, 0.03)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 97, 255, 0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                            : '0 8px 20px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Identification
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6
                        }}
                      >
                        Valid government-issued ID (driver's license, passport, etc.)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '12px',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(0, 97, 255, 0.03)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 97, 255, 0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                            : '0 8px 20px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Personal Information
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6
                        }}
                      >
                        Name, address, date of birth, and sometimes SSN
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '12px',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(0, 97, 255, 0.03)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 97, 255, 0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                            : '0 8px 20px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Payment Method
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6
                        }}
                      >
                        Credit/debit card, cash (for in-person purchases)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '12px',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(0, 97, 255, 0.03)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 97, 255, 0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                            : '0 8px 20px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Previous License (Optional)
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6
                        }}
                      >
                        If renewing, your previous license number may help
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* FAQ Section */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 6,
              borderRadius: '16px',
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
            }}
          >
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                disableGutters
                elevation={0}
                sx={{
                  '&:before': { display: 'none' },
                  borderBottom: index < faqData.length - 1 ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}` : 'none',
                  background: 'transparent',
                  mb: 1,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(0, 97, 255, 0.2)'
                          : 'rgba(0, 97, 255, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(0, 97, 255, 0.3)'
                            : 'rgba(0, 97, 255, 0.2)',
                        }
                      }}
                    >
                      <ChevronDown size={18} />
                    </Box>
                  }
                  aria-controls={`faq-panel-${index}-content`}
                  id={`faq-panel-${index}-header`}
                  sx={{
                    py: 2,
                    '&.Mui-expanded': {
                      minHeight: 'auto',
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      '&.Mui-expanded': {
                        margin: 0,
                      }
                    }
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '1.1rem',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(0, 97, 255, 0.2)'
                          : 'rgba(0, 97, 255, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main,
                      }}
                    >
                      <HelpCircle size={18} />
                    </Box>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3, pl: 7 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          {/* Additional Resources */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Additional Resources
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Link
                href="https://www.takemefishing.org/fishing-license/"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'block', height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(0, 97, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 97, 255, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 97, 255, 0.2)'
                      : 'rgba(0, 97, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                        : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 97, 255, 0.4)'
                        : 'rgba(0, 97, 255, 0.3)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle, rgba(96, 239, 255, 0.2) 0%, rgba(96, 239, 255, 0) 70%)',
                      zIndex: 0,
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 2,
                        borderBottom: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                          boxShadow: '0 4px 12px rgba(0, 97, 255, 0.2)',
                          mr: 2,
                        }}
                      >
                        <Fish size={22} color="white" />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Take Me Fishing
                      </Typography>
                      <ExternalLink
                        size={16}
                        style={{
                          marginLeft: '8px',
                          color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.palette.text.secondary,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      Comprehensive resource for fishing license information across all 50 states.
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link
                href="https://www.fws.gov/program/fisheries-and-aquatic-conservation"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'block', height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(0, 97, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 97, 255, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 97, 255, 0.2)'
                      : 'rgba(0, 97, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                        : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 97, 255, 0.4)'
                        : 'rgba(0, 97, 255, 0.3)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle, rgba(96, 239, 255, 0.2) 0%, rgba(96, 239, 255, 0) 70%)',
                      zIndex: 0,
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 2,
                        borderBottom: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                          boxShadow: '0 4px 12px rgba(0, 97, 255, 0.2)',
                          mr: 2,
                        }}
                      >
                        <Leaf size={22} color="white" />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        U.S. Fish & Wildlife
                      </Typography>
                      <ExternalLink
                        size={16}
                        style={{
                          marginLeft: '8px',
                          color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.palette.text.secondary,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      Federal information on fishing regulations and conservation efforts.
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link
                href="https://www.fishingworks.com/licenses/"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'block', height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 97, 255, 0.1) 0%, rgba(0, 97, 255, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 97, 255, 0.05) 0%, rgba(96, 239, 255, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 97, 255, 0.2)'
                      : 'rgba(0, 97, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                        : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 97, 255, 0.4)'
                        : 'rgba(0, 97, 255, 0.3)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle, rgba(96, 239, 255, 0.2) 0%, rgba(96, 239, 255, 0) 70%)',
                      zIndex: 0,
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 2,
                        borderBottom: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                          boxShadow: '0 4px 12px rgba(0, 97, 255, 0.2)',
                          mr: 2,
                        }}
                      >
                        <Globe size={22} color="white" />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Fishing Works
                      </Typography>
                      <ExternalLink
                        size={16}
                        style={{
                          marginLeft: '8px',
                          color: theme.palette.mode === 'dark' ? '#60efff' : theme.palette.primary.main
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.palette.text.secondary,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      State-by-state guide to fishing license requirements and fees.
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          </Grid>
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

export default FishingLicensePage;
