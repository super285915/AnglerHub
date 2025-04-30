import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Chip, Stack, Divider, Button, TextField, InputAdornment, useTheme } from '@mui/material';
import { BookOpen, Filter, Search, Target } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import TechniqueCard from '../components/TechniqueCard';
import { fishingTechniques } from '../data/fishingTechniques';
import NotFoundRedirect from '../components/NotFoundRedirect';

const TechniquesPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedFishType, setSelectedFishType] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState(fishingTechniques);

  // Check if a specific technique is requested by ID
  useEffect(() => {
    if (id) {
      const technique = fishingTechniques.find(t => t.id === id);
      if (!technique) {
        // If technique not found, redirect to the not found page
        navigate('/techniques/not-found');
      } else {
        // If technique found, you could implement a detail view here
        // For now, we'll just filter to show only this technique
        setSearchQuery(technique.title);
      }
    }
  }, [id, navigate]);

  // Get all unique fish types from all techniques' bestFor arrays
  const allFishTypes = Array.from(
    new Set(fishingTechniques.flatMap(technique => technique.bestFor))
  ).sort();

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle difficulty selection
  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? 'all' : difficulty);
  };

  // Handle fish type selection
  const handleFishTypeClick = (fishType: string) => {
    setSelectedFishType(fishType === selectedFishType ? '' : fishType);
  };

  // Filter techniques based on search query, selected difficulty, and selected fish type
  useEffect(() => {
    const filtered = fishingTechniques.filter(technique => {
      // Match search query
      const matchesSearch =
        searchQuery === '' ||
        technique.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Match difficulty
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        technique.difficulty === selectedDifficulty;

      // Match fish type
      const matchesFishType =
        selectedFishType === '' ||
        technique.bestFor.some(fish =>
          fish.toLowerCase() === selectedFishType.toLowerCase()
        );

      return matchesSearch && matchesDifficulty && matchesFishType;
    });

    setFilteredTechniques(filtered);
  }, [searchQuery, selectedDifficulty, selectedFishType]);

  return (
    <Box>
      <Box
        sx={{
          py: 6,
          backgroundImage: theme.palette.mode === 'dark'
            ? `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
            : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Fishing Techniques
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9, mb: 3 }}>
            Master the art of fishing with our comprehensive guides and tutorials
          </Typography>

          <TextField
            fullWidth
            placeholder="Search techniques..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 3, maxWidth: '600px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color={theme.palette.primary.contrastText} size={20} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.15)',
                color: theme.palette.primary.contrastText,
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.contrastText,
                },
                '& input': {
                  color: theme.palette.primary.contrastText,
                  '&::placeholder': {
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(255, 255, 255, 0.7)',
                    opacity: 1,
                  },
                },
                '& .MuiInputAdornment-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              mt: 3,
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.1)',
              p: 2,
              borderRadius: 2,
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Typography variant="subtitle1" sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.contrastText,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Filter size={18} style={{ marginRight: '8px' }} /> Difficulty:
            </Typography>
            <Button
              variant={selectedDifficulty === 'beginner' ? "contained" : "outlined"}
              onClick={() => handleDifficultyClick('beginner')}
              sx={{
                bgcolor: selectedDifficulty === 'beginner' ? 'success.main' : 'transparent',
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.5)',
                '&:hover': {
                  bgcolor: selectedDifficulty === 'beginner'
                    ? 'success.dark'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.1)',
                  borderColor: theme.palette.primary.contrastText
                },
                px: 2
              }}
            >
              Beginner
            </Button>
            <Button
              variant={selectedDifficulty === 'intermediate' ? "contained" : "outlined"}
              onClick={() => handleDifficultyClick('intermediate')}
              sx={{
                bgcolor: selectedDifficulty === 'intermediate' ? 'warning.main' : 'transparent',
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.5)',
                '&:hover': {
                  bgcolor: selectedDifficulty === 'intermediate'
                    ? 'warning.dark'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.1)',
                  borderColor: theme.palette.primary.contrastText
                },
                px: 2
              }}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedDifficulty === 'advanced' ? "contained" : "outlined"}
              onClick={() => handleDifficultyClick('advanced')}
              sx={{
                bgcolor: selectedDifficulty === 'advanced' ? 'error.main' : 'transparent',
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.5)',
                '&:hover': {
                  bgcolor: selectedDifficulty === 'advanced'
                    ? 'error.dark'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.1)',
                  borderColor: theme.palette.primary.contrastText
                },
                px: 2
              }}
            >
              Advanced
            </Button>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{
              color: theme.palette.primary.contrastText,
              mb: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Target size={16} style={{ marginRight: '8px' }} /> Filter by Fish Type:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {allFishTypes.slice(0, 8).map((fishType) => (
                <Chip
                  key={fishType}
                  label={fishType}
                  clickable
                  variant={selectedFishType === fishType ? "filled" : "outlined"}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: selectedFishType === fishType
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  onClick={() => handleFishTypeClick(fishType)}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {filteredTechniques.length > 0
              ? `${filteredTechniques.length} Fishing Techniques Found`
              : 'No Techniques Found'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Master these techniques to improve your fishing success and enjoyment
          </Typography>
        </Box>

        {filteredTechniques.length > 0 ? (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {filteredTechniques.map((technique) => (
              <Grid item key={technique.id} xs={12} sm={6} md={3}>
                <TechniqueCard technique={technique} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              opacity: theme.palette.mode === 'dark' ? 0.5 : 0.7,
              mb: 6
            }}
          >
            <BookOpen
              size={60}
              color={theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[700]}
              style={{ marginBottom: '16px' }}
            />
            <Typography variant="h5" gutterBottom>
              No Techniques Found
            </Typography>
            <Typography variant="body1">
              Try adjusting your search criteria or filters.
            </Typography>
          </Box>
        )}

        <Divider sx={{ mb: 6, mt: 2 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Featured Tutorial Videos
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Watch and learn from our visual step-by-step guides
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* This would be video content in a full implementation */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                borderRadius: 2,
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                textAlign: 'center'
              }}
            >
              <BookOpen
                size={60}
                color={theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[700]}
                style={{ marginBottom: '16px' }}
              />
              <Typography variant="h6" gutterBottom>
                Mastering the Art of Fly Fishing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Video tutorial would be embedded here
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                borderRadius: 2,
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                textAlign: 'center'
              }}
            >
              <BookOpen
                size={60}
                color={theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[700]}
                style={{ marginBottom: '16px' }}
              />
              <Typography variant="h6" gutterBottom>
                Bass Fishing Fundamentals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Video tutorial would be embedded here
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TechniquesPage;