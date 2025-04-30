import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  useTheme,
  SelectChangeEvent,
  Tab,
  Tabs
} from '@mui/material';
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Clock,
  Info,
  Mail,
  Phone,
  Globe,
  Star,
  Filter,
  Trophy,
  Heart,
  BookOpen,
  Tent
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { fishingEvents } from '../data/fishingEvents';

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
      id={`events-tabpanel-${index}`}
      aria-labelledby={`events-tab-${index}`}
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

const EventsCalendarPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Extract unique event types and locations for filters
  const eventTypes = Array.from(new Set(fishingEvents.map(event => event.eventType)));
  const locations = Array.from(new Set(fishingEvents.map(event => {
    const state = event.location.split(',').pop()?.trim();
    return state || '';
  })));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter events based on search and filters
  const filteredEvents = fishingEvents.filter(event => {
    // Search query filter
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Event type filter
    if (selectedEventType && event.eventType !== selectedEventType) {
      return false;
    }

    // Location filter
    if (selectedLocation && !event.location.includes(selectedLocation)) {
      return false;
    }

    return true;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  // Get featured events
  const featuredEvents = sortedEvents.filter(event => event.featured);

  // Get upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  const upcomingEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate >= today && eventDate <= thirtyDaysFromNow;
  });

  const handleEventTypeChange = (event: SelectChangeEvent) => {
    setSelectedEventType(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedEventType('');
    setSelectedLocation('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get event type icon
  const getEventTypeIcon = (eventType: string) => {
    switch(eventType) {
      case 'Tournament':
        return <Trophy size={16} />;
      case 'Conservation':
        return <Heart size={16} />;
      case 'Educational':
        return <BookOpen size={16} />;
      case 'Expo':
        return <Tent size={16} />;
      case 'Community':
        return <Users size={16} />;
      case 'Fundraiser':
        return <Heart size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={!loading} timeout={800}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 800,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)'
                  : 'linear-gradient(90deg, #9c27b0 0%, #ce93d8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Fishing Events Calendar
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: '800px',
                fontWeight: 400,
                lineHeight: 1.5
              }}
            >
              Discover fishing tournaments, conservation events, expos, and more
            </Typography>
          </Box>

          {/* Search and Filters */}
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
                  label="Search Events"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by title, description, or location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} color={theme.palette.secondary.main} />
                      </InputAdornment>
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
                          : 'rgba(156, 39, 176, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.main,
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
                      color: theme.palette.secondary.main,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="event-type-label">Event Type</InputLabel>
                      <Select
                        labelId="event-type-label"
                        id="event-type-select"
                        value={selectedEventType}
                        onChange={handleEventTypeChange}
                        label="Event Type"
                        sx={{
                          borderRadius: '12px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(0, 0, 0, 0.1)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.3)'
                              : 'rgba(156, 39, 176, 0.3)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                            borderWidth: '1px',
                          }
                        }}
                      >
                        <MenuItem value="">All Event Types</MenuItem>
                        {eventTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="location-label">Location</InputLabel>
                      <Select
                        labelId="location-label"
                        id="location-select"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        label="Location"
                        sx={{
                          borderRadius: '12px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(0, 0, 0, 0.1)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.3)'
                              : 'rgba(156, 39, 176, 0.3)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                            borderWidth: '1px',
                          }
                        }}
                      >
                        <MenuItem value="">All Locations</MenuItem>
                        {locations.map((location) => (
                          <MenuItem key={location} value={location}>
                            {location}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {(searchQuery || selectedEventType || selectedLocation) && (
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                    p: 2,
                    borderRadius: '12px',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(156, 39, 176, 0.1)'
                      : 'rgba(156, 39, 176, 0.05)',
                    border: '1px dashed',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(156, 39, 176, 0.3)'
                      : 'rgba(156, 39, 176, 0.2)',
                  }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.7)'
                          : 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 600,
                        mr: 1
                      }}
                    >
                      Active Filters:
                    </Typography>
                    {searchQuery && (
                      <Chip
                        label={`Search: ${searchQuery}`}
                        size="small"
                        onDelete={() => setSearchQuery('')}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.2)'
                            : 'rgba(156, 39, 176, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.secondary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.3)'
                            : 'rgba(156, 39, 176, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.secondary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.secondary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    {selectedEventType && (
                      <Chip
                        label={`Type: ${selectedEventType}`}
                        size="small"
                        onDelete={() => setSelectedEventType('')}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.2)'
                            : 'rgba(156, 39, 176, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.secondary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.3)'
                            : 'rgba(156, 39, 176, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.secondary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.secondary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    {selectedLocation && (
                      <Chip
                        label={`Location: ${selectedLocation}`}
                        size="small"
                        onDelete={() => setSelectedLocation('')}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.2)'
                            : 'rgba(156, 39, 176, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.secondary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.3)'
                            : 'rgba(156, 39, 176, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.secondary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.secondary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    <Button
                      size="small"
                      onClick={handleClearFilters}
                      sx={{
                        ml: 'auto',
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(156, 39, 176, 0.05)',
                        }
                      }}
                    >
                      Clear All
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Tabs */}
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="events tabs"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.secondary.main,
                  height: 3,
                  borderRadius: '3px',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: theme.palette.text.secondary,
                  minHeight: 48,
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px 8px 0 0',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    opacity: 1,
                  },
                  '&.Mui-selected': {
                    color: theme.palette.secondary.main,
                    fontWeight: 700,
                  },
                  '& .MuiSvgIcon-root, & svg': {
                    marginBottom: '0 !important',
                    marginRight: 1,
                  },
                },
              }}
            >
              <Tab
                label="All Events"
                id="events-tab-0"
                aria-controls="events-tabpanel-0"
              />
              <Tab
                label="Featured Events"
                id="events-tab-1"
                aria-controls="events-tabpanel-1"
                icon={<Star size={18} />}
                iconPosition="start"
              />
              <Tab
                label="Upcoming Events"
                id="events-tab-2"
                aria-controls="events-tabpanel-2"
                icon={<Calendar size={18} />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* All Events Tab */}
          <TabPanel value={tabValue} index={0}>
            {sortedEvents.length > 0 ? (
              <Grid container spacing={3}>
                {sortedEvents.map((event) => (
                  <Grid item xs={12} md={6} key={event.id}>
                    <EventCard event={event} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoEventsFound onClearFilters={handleClearFilters} />
            )}
          </TabPanel>

          {/* Featured Events Tab */}
          <TabPanel value={tabValue} index={1}>
            {featuredEvents.length > 0 ? (
              <Grid container spacing={3}>
                {featuredEvents.map((event) => (
                  <Grid item xs={12} md={6} key={event.id}>
                    <EventCard event={event} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoEventsFound onClearFilters={handleClearFilters} message="No featured events match your criteria" />
            )}
          </TabPanel>

          {/* Upcoming Events Tab */}
          <TabPanel value={tabValue} index={2}>
            {upcomingEvents.length > 0 ? (
              <Grid container spacing={3}>
                {upcomingEvents.map((event) => (
                  <Grid item xs={12} md={6} key={event.id}>
                    <EventCard event={event} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoEventsFound onClearFilters={handleClearFilters} message="No upcoming events match your criteria" />
            )}
          </TabPanel>

          {/* Submit Your Event */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              mt: 6,
              mb: 6,
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #9c27b0 0%, #ce93d8 100%)',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 20px 80px rgba(156, 39, 176, 0.3)',
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
                Have an Event to Share?
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
                If you're organizing a fishing tournament, conservation event, or any fishing-related gathering,
                we'd love to feature it in our calendar. Submit your event details and reach thousands of anglers in your area.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/submit-event"
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#9c27b0',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'white',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Submit Your Event
              </Button>
            </Box>
          </Paper>

          {/* Event Categories */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.secondary.main,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #9c27b0 0%, #ce93d8 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Browse by Event Type
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {eventTypes.map((type) => {
              const typeEvents = fishingEvents.filter(event => event.eventType === type);

              return (
                <Grid item xs={12} sm={6} md={4} key={type}>
                  <Paper
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        cursor: 'pointer'
                      }
                    }}
                    onClick={() => setSelectedEventType(type)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getEventTypeIcon(type)}
                      <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
                        {type} Events
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {getEventTypeDescription(type)}
                    </Typography>
                    <Typography variant="body2">
                      {typeEvents.length} events available
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      endIcon={<ChevronRight size={16} />}
                      sx={{ mt: 2, p: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventType(type);
                        setTabValue(0);
                      }}
                    >
                      View All {type} Events
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

// Helper component for event cards
const EventCard: React.FC<{ event: typeof fishingEvents[0] }> = ({ event }) => {
  const theme = useTheme();

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (startDate === endDate) {
      return `${startMonth} ${startDay}, ${startYear}`;
    }

    if (startMonth === endMonth && startYear === endYear) {
      return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
    }

    if (startYear === endYear) {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    }

    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  };

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }
    }}>
      {event.featured && (
        <Box sx={{
          position: 'absolute',
          top: 16,
          right: 0,
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          py: 0.5,
          px: 2,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Star size={14} style={{ marginRight: '4px' }} />
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            Featured
          </Typography>
        </Box>
      )}
      <CardMedia
        component="img"
        height="180"
        image={event.imageUrl}
        alt={event.title}
        sx={{
          height: 180
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip
            label={event.eventType}
            size="small"
            color="primary"
            icon={getEventTypeIcon(event.eventType)}
          />
        </Box>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {event.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {event.description.length > 120 ? `${event.description.substring(0, 120)}...` : event.description}
        </Typography>

        <List dense disablePadding>
          <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Calendar size={18} color={theme.palette.primary.main} />
            </ListItemIcon>
            <ListItemText
              primary={formatDateRange(event.startDate, event.endDate)}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>

          <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MapPin size={18} color={theme.palette.primary.main} />
            </ListItemIcon>
            <ListItemText
              primary={event.location}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>

          <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Users size={18} color={theme.palette.primary.main} />
            </ListItemIcon>
            <ListItemText
              primary={event.organizer}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>

          {event.registrationRequired && (
            <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Clock size={18} color={theme.palette.primary.main} />
              </ListItemIcon>
              <ListItemText
                primary={event.registrationDeadline
                  ? `Registration Deadline: ${new Date(event.registrationDeadline).toLocaleDateString()}`
                  : 'Registration Required'
                }
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          )}
        </List>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Info size={16} />}
          component={RouterLink}
          to={`/events/${event.id}`}
        >
          Event Details
        </Button>
        {event.registrationRequired && event.registrationUrl && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            component="a"
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 'auto' }}
          >
            Register
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

// Helper component for no events found
const NoEventsFound: React.FC<{ onClearFilters: () => void, message?: string }> = ({ onClearFilters, message }) => {
  return (
    <Paper sx={{ p: 4, textAlign: 'center', mb: 6 }}>
      <Typography variant="h6">
        {message || 'No events match your search criteria'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Try adjusting your filters or search term
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={onClearFilters}
        startIcon={<Filter size={16} />}
      >
        Clear All Filters
      </Button>
    </Paper>
  );
};

// Helper function to get event type description
const getEventTypeDescription = (eventType: string): string => {
  switch(eventType) {
    case 'Tournament':
      return 'Competitive fishing events for anglers of all skill levels, from local derbies to professional tournaments.';
    case 'Conservation':
      return 'Events focused on preserving and improving fish habitats, water quality, and sustainable fishing practices.';
    case 'Educational':
      return 'Workshops, seminars, and classes to improve your fishing knowledge and skills.';
    case 'Expo':
      return 'Fishing shows and exhibitions featuring the latest gear, boats, and fishing innovations.';
    case 'Community':
      return 'Family-friendly fishing events designed to bring anglers together and introduce newcomers to the sport.';
    case 'Fundraiser':
      return 'Events that raise money for conservation efforts, fishing clubs, and other fishing-related causes.';
    default:
      return 'Various fishing-related events and gatherings.';
  }
};

// Helper function to get event type icon
const getEventTypeIcon = (eventType: string) => {
  switch(eventType) {
    case 'Tournament':
      return <Trophy size={16} />;
    case 'Conservation':
      return <Heart size={16} />;
    case 'Educational':
      return <BookOpen size={16} />;
    case 'Expo':
      return <Tent size={16} />;
    case 'Community':
      return <Users size={16} />;
    case 'Fundraiser':
      return <Heart size={16} />;
    default:
      return <Calendar size={16} />;
  }
};

export default EventsCalendarPage;
