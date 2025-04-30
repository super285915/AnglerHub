import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Chip, Stack, Divider, MenuItem } from '@mui/material';
import { Search, Filter, Fish } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import FishSpeciesCard from '../components/FishSpeciesCard';
import { fishSpeciesData } from '../data/fishSpecies';
import NotFoundRedirect from '../components/NotFoundRedirect';

const FishSpeciesPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  // Check if a specific fish species is requested by ID
  useEffect(() => {
    if (id) {
      const species = fishSpeciesData.find(s => s.id === id);
      if (!species) {
        // If species not found, redirect to the not found page
        navigate('/species/not-found');
      } else {
        // If species found, you could implement a detail view here
        // For now, we'll just filter to show only this species
        setSearchQuery(species.name);
      }
    }
  }, [id, navigate]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  // Filter species based on search query and selected conservation status
  const filteredSpecies = fishSpeciesData.filter((species) => {
    const matchesSearch =
      species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterValue === 'all' ||
      species.conservationStatus.toLowerCase() === filterValue.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      <Box
        sx={{
          py: 6,
          backgroundImage: 'linear-gradient(to right, #2e7d32, #1b5e20)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Fish Species Guide
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9, mb: 4 }}>
            Comprehensive information about fish species, their habitats, and fishing techniques
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search species by name..."
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
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                value={filterValue}
                onChange={handleFilterChange}
                variant="outlined"
                label="Conservation Status"
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
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="least concern">Least Concern</MenuItem>
                <MenuItem value="vulnerable">Vulnerable</MenuItem>
                <MenuItem value="endangered">Endangered</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Quick Filters:
            </Typography>
            <Chip
              label="Freshwater"
              icon={<Fish size={14} />}
              clickable
              variant="outlined"
              color="primary"
            />
            <Chip
              label="Saltwater"
              icon={<Fish size={14} />}
              clickable
              variant="outlined"
              color="secondary"
            />
            <Chip
              label="Game Fish"
              icon={<Fish size={14} />}
              clickable
              variant="outlined"
            />
            <Chip
              label="Fly Fishing"
              icon={<Fish size={14} />}
              clickable
              variant="outlined"
            />
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Fish size={18} style={{ marginRight: '8px' }} />
            <Typography variant="h6" component="span">
              {filteredSpecies.length} Species Found
            </Typography>
          </Box>
        </Divider>

        <Grid container spacing={3}>
          {filteredSpecies.map((species) => (
            <Grid item key={species.id} xs={12} sm={6} md={3}>
              <FishSpeciesCard species={species} />
            </Grid>
          ))}
        </Grid>

        {filteredSpecies.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              opacity: 0.7
            }}
          >
            <Fish size={60} style={{ marginBottom: '16px' }} />
            <Typography variant="h5" gutterBottom>
              No Species Found
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

export default FishSpeciesPage;