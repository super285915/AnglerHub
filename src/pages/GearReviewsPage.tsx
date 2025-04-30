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
  Rating,
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
  SelectChangeEvent
} from '@mui/material';
import {
  Search,
  Tag,
  Star,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { gearReviews } from '../data/gearReviews';

const GearReviewsPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract unique categories and brands for filters
  const categories = Array.from(new Set(gearReviews.map(review => review.category)));
  const brands = Array.from(new Set(gearReviews.map(review => review.brand)));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter reviews based on search and filters
  const filteredReviews = gearReviews.filter(review => {
    // Search query filter
    if (searchQuery && !review.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !review.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !review.model.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory && review.category !== selectedCategory) {
      return false;
    }

    // Brand filter
    if (selectedBrand && review.brand !== selectedBrand) {
      return false;
    }

    // Rating filter
    if (minRating !== null && review.rating < minRating) {
      return false;
    }

    return true;
  });

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    setSelectedBrand(event.target.value);
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setMinRating(value === '' ? null : Number(value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setMinRating(null);
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
                  : 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Fishing Gear Reviews
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
              Expert reviews and recommendations for the best fishing gear on the market
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
                  label="Search Reviews"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by product name, brand, or model"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} color={theme.palette.primary.main} />
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
                          : 'rgba(63, 81, 181, 0.3)',
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Category"
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
                              : 'rgba(63, 81, 181, 0.3)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '1px',
                          }
                        }}
                      >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="brand-label">Brand</InputLabel>
                      <Select
                        labelId="brand-label"
                        id="brand-select"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        label="Brand"
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
                              : 'rgba(63, 81, 181, 0.3)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '1px',
                          }
                        }}
                      >
                        <MenuItem value="">All Brands</MenuItem>
                        {brands.map((brand) => (
                          <MenuItem key={brand} value={brand}>
                            {brand}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="rating-label">Min Rating</InputLabel>
                      <Select
                        labelId="rating-label"
                        id="rating-select"
                        value={minRating === null ? '' : minRating.toString()}
                        onChange={handleRatingChange}
                        label="Min Rating"
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
                              : 'rgba(63, 81, 181, 0.3)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '1px',
                          }
                        }}
                      >
                        <MenuItem value="">Any Rating</MenuItem>
                        <MenuItem value="3">3+ Stars</MenuItem>
                        <MenuItem value="4">4+ Stars</MenuItem>
                        <MenuItem value="4.5">4.5+ Stars</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {(searchQuery || selectedCategory || selectedBrand || minRating !== null) && (
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                    p: 2,
                    borderRadius: '12px',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(63, 81, 181, 0.1)'
                      : 'rgba(63, 81, 181, 0.05)',
                    border: '1px dashed',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(63, 81, 181, 0.3)'
                      : 'rgba(63, 81, 181, 0.2)',
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
                            ? 'rgba(63, 81, 181, 0.2)'
                            : 'rgba(63, 81, 181, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.primary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.3)'
                            : 'rgba(63, 81, 181, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.primary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.primary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    {selectedCategory && (
                      <Chip
                        label={`Category: ${selectedCategory}`}
                        size="small"
                        onDelete={() => setSelectedCategory('')}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.2)'
                            : 'rgba(63, 81, 181, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.primary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.3)'
                            : 'rgba(63, 81, 181, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.primary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.primary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    {selectedBrand && (
                      <Chip
                        label={`Brand: ${selectedBrand}`}
                        size="small"
                        onDelete={() => setSelectedBrand('')}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.2)'
                            : 'rgba(63, 81, 181, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.primary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.3)'
                            : 'rgba(63, 81, 181, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.primary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.primary.dark,
                            }
                          }
                        }}
                      />
                    )}
                    {minRating !== null && (
                      <Chip
                        label={`${minRating}+ Stars`}
                        size="small"
                        onDelete={() => setMinRating(null)}
                        sx={{
                          mr: 1,
                          borderRadius: '8px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.2)'
                            : 'rgba(63, 81, 181, 0.1)',
                          color: theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.primary.main,
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(63, 81, 181, 0.3)'
                            : 'rgba(63, 81, 181, 0.2)',
                          fontWeight: 500,
                          '& .MuiChip-deleteIcon': {
                            color: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : theme.palette.primary.main,
                            '&:hover': {
                              color: theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : theme.palette.primary.dark,
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
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(63, 81, 181, 0.05)',
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

          {/* Reviews Grid */}
          {filteredReviews.length > 0 ? (
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {filteredReviews.map((review) => (
                <Grid item xs={12} md={6} key={review.id}>
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
                    <CardMedia
                      component="img"
                      height="200"
                      image={review.imageUrl}
                      alt={review.title}
                      sx={{
                        height: 200
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Chip
                          label={review.category}
                          size="small"
                          color="primary"
                          icon={<Tag size={14} />}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={review.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {review.rating.toFixed(1)}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {review.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>{review.brand} {review.model}</strong>
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {review.summary}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <ThumbsUp size={16} style={{ marginRight: '4px', color: theme.palette.success.main }} /> Pros
                          </Typography>
                          <List dense disablePadding>
                            {review.pros.slice(0, 3).map((pro, index) => (
                              <ListItem key={index} disableGutters sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <CheckCircle size={14} color={theme.palette.success.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={pro}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                            {review.pros.length > 3 && (
                              <Typography variant="body2" sx={{ ml: 3, color: 'text.secondary' }}>
                                +{review.pros.length - 3} more
                              </Typography>
                            )}
                          </List>
                        </Box>

                        <Box>
                          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <ThumbsDown size={16} style={{ marginRight: '4px', color: theme.palette.error.main }} /> Cons
                          </Typography>
                          <List dense disablePadding>
                            {review.cons.slice(0, 2).map((con, index) => (
                              <ListItem key={index} disableGutters sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <XCircle size={14} color={theme.palette.error.main} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={con}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                            {review.cons.length > 2 && (
                              <Typography variant="body2" sx={{ ml: 3, color: 'text.secondary' }}>
                                +{review.cons.length - 2} more
                              </Typography>
                            )}
                          </List>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <Calendar size={14} style={{ marginRight: '4px' }} />
                            {review.publishDate}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <User size={14} style={{ marginRight: '4px' }} />
                            {review.author}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="primary">
                          MSRP: {review.price.msrp}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ChevronRight size={16} />}
                        component={RouterLink}
                        to={`/gear-reviews/${review.id}`}
                        sx={{ ml: 'auto' }}
                      >
                        Read Full Review
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', mb: 6 }}>
              <Typography variant="h6">
                No reviews match your search criteria
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters or search term
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleClearFilters}
                startIcon={<Filter size={16} />}
              >
                Clear All Filters
              </Button>
            </Paper>
          )}

          {/* Featured Categories */}
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
                background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)',
                borderRadius: '2px',
              }
            }}
          >
            Browse by Category
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {categories.map((category) => {
              const categoryReviews = gearReviews.filter(review => review.category === category);
              const avgRating = categoryReviews.reduce((sum, review) => sum + review.rating, 0) / categoryReviews.length;

              return (
                <Grid item xs={12} sm={6} md={4} key={category}>
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
                    onClick={() => setSelectedCategory(category)}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {category}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={avgRating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {avgRating.toFixed(1)} ({categoryReviews.length} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {categoryReviews.length} products reviewed in this category
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      endIcon={<ChevronRight size={16} />}
                      sx={{ mt: 2, p: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                      }}
                    >
                      View All {category}
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* About Our Reviews */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              mb: 6,
              borderRadius: '24px',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(63, 81, 181, 0.1) 0%, rgba(63, 81, 181, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(63, 81, 181, 0.05) 0%, rgba(121, 134, 203, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(63, 81, 181, 0.2)'
                : 'rgba(63, 81, 181, 0.1)',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at top right, rgba(121, 134, 203, 0.2) 0%, rgba(121, 134, 203, 0) 70%)',
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
                About Our Gear Reviews
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  mb: 3,
                  maxWidth: '90%',
                  color: theme.palette.text.primary,
                }}
              >
                At AnglerHub, we take our gear reviews seriously. Our team of experienced anglers thoroughly tests each product in real-world fishing conditions to provide you with honest, unbiased assessments.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                }}
              >
                Our review process includes:
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: '16px',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(63, 81, 181, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 15px 40px rgba(0, 0, 0, 0.3)'
                          : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                          boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
                          mb: 3,
                        }}
                      >
                        <Star size={32} color="white" />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Rigorous Testing
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        Each product is tested for at least 30 days in various fishing environments and conditions.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: '16px',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(63, 81, 181, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 15px 40px rgba(0, 0, 0, 0.3)'
                          : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                          boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
                          mb: 3,
                        }}
                      >
                        <CheckCircle size={32} color="white" />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Unbiased Opinions
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        We don't accept payment for reviews and always disclose if a product was provided for testing.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: '16px',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(63, 81, 181, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 15px 40px rgba(0, 0, 0, 0.3)'
                          : '0 15px 40px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                          boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
                          mb: 3,
                        }}
                      >
                        <User size={32} color="white" />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                        }}
                      >
                        Expert Reviewers
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        Our review team consists of professional anglers and fishing guides with decades of experience.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};

export default GearReviewsPage;
