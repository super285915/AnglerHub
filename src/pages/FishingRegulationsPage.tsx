import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  useTheme
} from '@mui/material';
import {
  ChevronDown,
  Calendar,
  Ruler,
  Fish,
  MapPin,
  AlertTriangle,
  Info,
  ExternalLink,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Mock data for fishing regulations by state
const stateRegulations = [
  {
    state: 'Washington',
    website: 'https://wdfw.wa.gov/fishing/regulations',
    seasons: [
      { species: 'Trout', open: 'Apr 22 - Oct 31', limits: '2 fish, 14" minimum' },
      { species: 'Salmon', open: 'Jun 1 - Sep 30', limits: '2 fish, only 1 Chinook' },
      { species: 'Bass', open: 'Year-round', limits: '5 fish, no more than 3 over 15"' }
    ],
    specialRegulations: [
      'Barbless hooks required for salmon and steelhead',
      'Catch and release only for wild steelhead',
      'No fishing from floating devices on certain rivers'
    ],
    protectedSpecies: ['Wild Steelhead', 'Bull Trout', 'Green Sturgeon']
  },
  {
    state: 'Oregon',
    website: 'https://myodfw.com/fishing/regulations',
    seasons: [
      { species: 'Trout', open: 'May 22 - Oct 31', limits: '5 fish per day, 8" minimum' },
      { species: 'Salmon', open: 'Aug 1 - Dec 31', limits: '2 adult salmon per day' },
      { species: 'Steelhead', open: 'Jan 1 - Mar 31, Aug 1 - Dec 31', limits: '2 hatchery steelhead per day' }
    ],
    specialRegulations: [
      'Angling restricted to artificial flies and lures in some waters',
      'Columbia River Basin endorsement required',
      'Thermal angling sanctuaries closed during summer months'
    ],
    protectedSpecies: ['Coastal Cutthroat Trout', 'Chum Salmon', 'Pacific Lamprey']
  },
  {
    state: 'California',
    website: 'https://wildlife.ca.gov/Fishing/Inland',
    seasons: [
      { species: 'Trout', open: 'Apr 30 - Nov 15', limits: '5 fish per day' },
      { species: 'Bass', open: 'Year-round', limits: '5 fish, 12" minimum' },
      { species: 'Sturgeon', open: 'Year-round', limits: '1 fish per day, 40-60" slot limit' }
    ],
    specialRegulations: [
      'Report cards required for steelhead, sturgeon, and salmon',
      'Special low flow restrictions on certain rivers',
      'Zero limit on coho salmon in all waters'
    ],
    protectedSpecies: ['Coho Salmon', 'Delta Smelt', 'McCloud River Redband Trout']
  },
  {
    state: 'Idaho',
    website: 'https://idfg.idaho.gov/fish/rules',
    seasons: [
      { species: 'Trout', open: 'Year-round in most waters', limits: '6 fish per day, no more than 2 over 20"' },
      { species: 'Steelhead', open: 'Sep 1 - Apr 30', limits: '3 hatchery steelhead per day' },
      { species: 'Chinook Salmon', open: 'Varies by river', limits: 'Varies by river and run size' }
    ],
    specialRegulations: [
      'Barbless hooks required for steelhead',
      'Special rules for catch-and-release waters',
      'Two-pole permit available for most waters'
    ],
    protectedSpecies: ['Bull Trout', 'White Sturgeon', 'Sockeye Salmon']
  }
];

// Mock data for common fishing regulations
const commonRegulations = [
  {
    category: 'Licensing',
    regulations: [
      'All anglers must have a valid fishing license unless exempt by age or special status',
      'Special endorsements or stamps may be required for certain species or waters',
      'Licenses must be carried while fishing and shown upon request to enforcement officers'
    ]
  },
  {
    category: 'Catch Limits',
    regulations: [
      'Daily bag limits specify the number of fish you can keep in one day',
      'Possession limits specify the total number of fish you can have in your possession',
      'Size limits (minimum or maximum) may apply to protect certain age classes of fish'
    ]
  },
  {
    category: 'Fishing Methods',
    regulations: [
      'Restrictions may apply to the number of rods/lines that can be used',
      'Certain waters may be restricted to artificial lures or flies only',
      'Use of certain bait types may be prohibited in some waters'
    ]
  },
  {
    category: 'Seasons',
    regulations: [
      'Open and closed seasons vary by species and water body',
      'Some waters may be open year-round while others have specific seasons',
      'Special regulations may apply during spawning seasons'
    ]
  }
];

// Mock data for protected species
const protectedSpecies = [
  {
    name: 'Bull Trout',
    status: 'Threatened',
    identification: 'Olive-green to blue-gray body with small pale spots, no dark spots on dorsal fin',
    regulations: 'Catch and release only, must be immediately released unharmed',
    states: ['Washington', 'Oregon', 'Idaho', 'Montana']
  },
  {
    name: 'Wild Steelhead',
    status: 'Varies by region',
    identification: 'Rainbow trout that migrate to the ocean, intact adipose fin (unlike hatchery fish)',
    regulations: 'Catch and release only in most waters, check local regulations',
    states: ['Washington', 'Oregon', 'California', 'Idaho']
  },
  {
    name: 'Green Sturgeon',
    status: 'Threatened',
    identification: 'Olive-green color, diamond-shaped scales, long snout',
    regulations: 'No retention allowed, must be released immediately',
    states: ['Washington', 'Oregon', 'California']
  },
  {
    name: 'Coho Salmon (Wild)',
    status: 'Threatened in some regions',
    identification: 'Small black spots on back and upper lobe of tail only, white gums',
    regulations: 'Retention prohibited in many waters, check local regulations',
    states: ['Washington', 'Oregon', 'California']
  }
];

const FishingRegulationsPage: React.FC = () => {
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

  const filteredRegulations = stateRegulations.filter(reg => {
    if (selectedState && reg.state !== selectedState) {
      return false;
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return reg.state.toLowerCase().includes(lowerQuery) ||
             reg.seasons.some(season =>
               season.species.toLowerCase().includes(lowerQuery) ||
               season.open.toLowerCase().includes(lowerQuery) ||
               season.limits.toLowerCase().includes(lowerQuery)
             ) ||
             reg.specialRegulations.some(sr => sr.toLowerCase().includes(lowerQuery)) ||
             reg.protectedSpecies.some(ps => ps.toLowerCase().includes(lowerQuery));
    }

    return true;
  });

  const filteredProtectedSpecies = protectedSpecies.filter(species => {
    if (selectedState && !species.states.includes(selectedState)) {
      return false;
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return species.name.toLowerCase().includes(lowerQuery) ||
             species.status.toLowerCase().includes(lowerQuery) ||
             species.identification.toLowerCase().includes(lowerQuery) ||
             species.regulations.toLowerCase().includes(lowerQuery) ||
             species.states.some(state => state.toLowerCase().includes(lowerQuery));
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
                  : 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Fishing Regulations
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
              Learn about fishing seasons, size and catch limits, and special regulations to ensure legal and sustainable fishing.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 183, 77, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 152, 0, 0.3)'
                  : 'rgba(255, 152, 0, 0.2)',
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
                  background: 'radial-gradient(circle at top right, rgba(255, 183, 77, 0.2) 0%, rgba(255, 183, 77, 0) 70%)',
                  zIndex: 0,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
                <Box
                  sx={{
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
                    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)',
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={30} color="white" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
                    }}
                  >
                    Important Notice
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Fishing regulations can change frequently and vary by location. The information provided here is for general guidance only.
                    Always check the current official regulations from your state's fish and wildlife agency before fishing.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                    <Chip
                      icon={<Calendar size={18} />}
                      label="Check Seasons"
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 152, 0, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(255, 152, 0, 0.2)',
                        py: 1.5,
                        px: 1,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#ffb74d' : theme.palette.warning.main },
                      }}
                    />
                    <Chip
                      icon={<Ruler size={18} />}
                      label="Know Size Limits"
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 152, 0, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(255, 152, 0, 0.2)',
                        py: 1.5,
                        px: 1,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#ffb74d' : theme.palette.warning.main },
                      }}
                    />
                    <Chip
                      icon={<Fish size={18} />}
                      label="Respect Catch Limits"
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 152, 0, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(255, 152, 0, 0.2)',
                        py: 1.5,
                        px: 1,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: theme.palette.mode === 'dark' ? '#ffb74d' : theme.palette.warning.main },
                      }}
                    />
                  </Box>
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
                  label="Search Regulations"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by species, season, or regulation"
                  InputProps={{
                    startAdornment: (
                      <Search size={20} style={{ marginRight: '8px', color: theme.palette.warning.main }} />
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
                          : 'rgba(255, 152, 0, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.warning.main,
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
                      color: theme.palette.warning.main,
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
                    startAdornment: (
                      <Filter size={20} style={{ marginRight: '8px', color: theme.palette.warning.main }} />
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
                          : 'rgba(255, 152, 0, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.warning.main,
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
                      color: theme.palette.warning.main,
                    }
                  }}
                >
                  <MenuItem value="">All States</MenuItem>
                  {stateRegulations.map((reg) => (
                    <MenuItem key={reg.state} value={reg.state}>
                      {reg.state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* State Regulations */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                borderRadius: '2px',
              }
            }}
          >
            State Fishing Regulations
          </Typography>

          {filteredRegulations.length > 0 ? (
            filteredRegulations.map((regulation) => (
              <Accordion
                key={regulation.state}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  aria-controls={`${regulation.state}-content`}
                  id={`${regulation.state}-header`}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      color: 'primary.contrastText',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MapPin size={20} style={{ marginRight: '12px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {regulation.state} Fishing Regulations
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                      Seasons and Limits
                    </Typography>

                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                            <TableCell><Typography variant="subtitle2">Species</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Open Season</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Limits</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {regulation.seasons.map((season, index) => (
                            <TableRow key={index}>
                              <TableCell>{season.species}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Clock size={16} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                  {season.open}
                                </Box>
                              </TableCell>
                              <TableCell>{season.limits}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                          Special Regulations
                        </Typography>
                        <List dense>
                          {regulation.specialRegulations.map((reg, index) => (
                            <ListItem key={index}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Info size={16} color={theme.palette.primary.main} />
                              </ListItemIcon>
                              <ListItemText primary={reg} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                          Protected Species (No Take)
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {regulation.protectedSpecies.map((species, index) => (
                            <Chip
                              key={index}
                              label={species}
                              color="error"
                              variant="outlined"
                              icon={<XCircle size={16} />}
                            />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Always check the official website for the most current regulations
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ExternalLink size={16} />}
                        href={regulation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official {regulation.state} Regulations
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">
                No regulations found matching your criteria
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search or filter
              </Typography>
            </Paper>
          )}

          {/* Common Regulations */}
          <Typography
            variant="h4"
            sx={{
              mt: 6,
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Common Fishing Regulations
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {commonRegulations.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {category.category}
                  </Typography>
                  <List dense>
                    {category.regulations.map((reg, regIndex) => (
                      <ListItem key={regIndex}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle size={16} color={theme.palette.success.main} />
                        </ListItemIcon>
                        <ListItemText primary={reg} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Protected Species */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.warning.dark,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Protected Species
          </Typography>

          {filteredProtectedSpecies.length > 0 ? (
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 6, borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                    <TableCell><Typography variant="subtitle2">Species</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Status</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Identification</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Regulations</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">States</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProtectedSpecies.map((species, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle2" color="error.main">
                          {species.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{species.status}</TableCell>
                      <TableCell>{species.identification}</TableCell>
                      <TableCell>{species.regulations}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {species.states.map((state, stateIndex) => (
                            <Chip
                              key={stateIndex}
                              label={state}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center', mb: 6 }}>
              <Typography variant="h6">
                No protected species found matching your criteria
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search or filter
              </Typography>
            </Paper>
          )}

          {/* Disclaimer */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'info.light',
              color: 'info.contrastText',
              borderRadius: 2,
              mb: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Info size={24} style={{ marginRight: '12px', marginTop: '4px' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Disclaimer
                </Typography>
                <Typography variant="body2">
                  The information provided on this page is for general reference only and may not reflect the most current regulations.
                  Fishing regulations can change frequently based on fish populations, environmental conditions, and other factors.
                  Always consult your state's official fishing regulations before heading out to fish. Violations of fishing regulations
                  can result in fines, license revocation, and other penalties.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Loading Skeleton */}
      {pageLoading && (
        <Box>
          <LoadingSkeleton type="detail" />
          <Box sx={{ mt: 4 }}>
            <LoadingSkeleton type="table" />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default FishingRegulationsPage;
