import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, TextField, MenuItem, InputAdornment, Chip, Stack } from '@mui/material';
import { Search, MapPin, Filter, Fish } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractiveFishingMap from '../components/InteractiveFishingMap';
import FishingSpotCard from '../components/FishingSpotCard';
import { fishingSpots } from '../data/fishingSpots';
import NotFoundRedirect from '../components/NotFoundRedirect';

const FishingMapPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [waterType, setWaterType] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedFishSpecies, setSelectedFishSpecies] = useState('');
  const [filteredSpots, setFilteredSpots] = useState(fishingSpots);

  // Check if a specific fishing spot is requested by ID
  useEffect(() => {
    if (id) {
      const spot = fishingSpots.find(s => s.id === id);
      if (!spot) {
        // If spot not found, redirect to the not found page
        navigate('/map/not-found');
      } else {
        // If spot found, you could implement a detail view here
        // For now, we'll just filter to show only this spot
        setSearchQuery(spot.name);
      }
    }
  }, [id, navigate]);

  // Get all unique fish species from all fishing spots
  const allFishSpecies = Array.from(
    new Set(fishingSpots.flatMap(spot => spot.fishSpecies))
  ).sort();

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle water type selection
  const handleWaterTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaterType(event.target.value);
  };

  // Handle sort by selection
  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  // Handle fish species selection
  const handleFishSpeciesClick = (species: string) => {
    setSelectedFishSpecies(species === selectedFishSpecies ? '' : species);
  };

  // Filter and sort fishing spots
  useEffect(() => {
    let filtered = fishingSpots.filter(spot => {
      // Match search query
      const matchesSearch =
        searchQuery === '' ||
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Match water type
      const matchesWaterType =
        waterType === 'all' ||
        spot.type === waterType;

      // Match fish species
      const matchesFishSpecies =
        selectedFishSpecies === '' ||
        spot.fishSpecies.some(species =>
          species.toLowerCase() === selectedFishSpecies.toLowerCase()
        );

      return matchesSearch && matchesWaterType && matchesFishSpecies;
    });

    // Sort the filtered spots
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularityRating - a.popularityRating;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // For 'newest', we would typically use a date field
        // Since we don't have one, we'll just use the ID as a proxy
        return a.id.localeCompare(b.id);
      }
    });

    setFilteredSpots(filtered);
  }, [searchQuery, waterType, sortBy, selectedFishSpecies]);

  return (
    <Box>
      <Box
        sx={{
          py: 6,
          backgroundImage: 'linear-gradient(to right, #1a73e8, #0d47a1)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Fishing Map
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9, mb: 4 }}>
            Explore fishing spots across the country and filter by preferences
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search fishing spots..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="white" size={20} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                    '& .MuiInputAdornment-root': {
                      color: 'white',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                value={waterType}
                onChange={handleWaterTypeChange}
                variant="outlined"
                label="Water Type"
                InputProps={{
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="freshwater">Freshwater</MenuItem>
                <MenuItem value="saltwater">Saltwater</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                value={sortBy}
                onChange={handleSortByChange}
                variant="outlined"
                label="Sort By"
                InputProps={{
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                sx={{
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value="popularity">Most Popular</MenuItem>
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 1, display: 'flex', alignItems: 'center' }}>
              <Fish size={16} style={{ marginRight: '8px' }} /> Filter by Fish Species:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {allFishSpecies.slice(0, 10).map((species) => (
                <Chip
                  key={species}
                  label={species}
                  clickable
                  variant={selectedFishSpecies === species ? "filled" : "outlined"}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: selectedFishSpecies === species ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  onClick={() => handleFishSpeciesClick(species)}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            height: '500px',
            mb: 6,
          }}
        >
          <InteractiveFishingMap spots={filteredSpots} />
        </Paper>

        <Divider sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MapPin size={18} style={{ marginRight: '8px' }} />
            <Typography variant="h6" component="span">
              {filteredSpots.length} Fishing Spots Found
            </Typography>
          </Box>
        </Divider>

        {filteredSpots.length > 0 ? (
          <Grid container spacing={3}>
            {filteredSpots.map((spot) => (
              <Grid item key={spot.id} xs={12} sm={6} md={4}>
                <FishingSpotCard spot={spot} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              opacity: 0.7
            }}
          >
            <MapPin size={60} style={{ marginBottom: '16px' }} />
            <Typography variant="h5" gutterBottom>
              No Fishing Spots Found
            </Typography>
            <Typography variant="body1">
              Try adjusting your search criteria or filters.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FishingMapPage;