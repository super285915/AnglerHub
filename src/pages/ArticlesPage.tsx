import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Chip, Stack, Divider, Card, CardContent, TextField, InputAdornment, Button } from '@mui/material';
import { Search, Tag, Calendar, Filter } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';

const ArticlesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // Get unique categories from articles
  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))];

  // Get unique tags from all articles
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
  };

  // Filter articles based on search query, selected category, and selected tag
  useEffect(() => {
    const filtered = articles.filter(article => {
      // Match search query
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      // Match category
      const matchesCategory =
        selectedCategory === 'all' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      // Match tag
      const matchesTag =
        selectedTag === '' ||
        article.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesCategory && matchesTag;
    });

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, selectedTag]);

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
            Fishing Articles & Blog
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9, mb: 4 }}>
            Tips, techniques, conservation news, and fishing stories
          </Typography>

          <TextField
            fullWidth
            placeholder="Search articles..."
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
                maxWidth: '600px',
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
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <Filter size={16} style={{ marginRight: '8px' }} /> Categories:
                </Typography>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All' : category}
                    clickable
                    color={selectedCategory === category ? "primary" : "default"}
                    variant={selectedCategory === category ? "filled" : "outlined"}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </Stack>
            </Box>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              {filteredArticles.length > 0
                ? `${filteredArticles.length} Articles Found`
                : 'No Articles Found'}
            </Typography>

            <Grid container spacing={3}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Grid item key={article.id} xs={12}>
                    <ArticleCard article={article} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      opacity: 0.7
                    }}
                  >
                    <Tag size={60} style={{ marginBottom: '16px' }} />
                    <Typography variant="h5" gutterBottom>
                      No Articles Found
                    </Typography>
                    <Typography variant="body1">
                      Try adjusting your search criteria or filters.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Popular Tags
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {allTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      icon={<Tag size={14} />}
                      clickable
                      variant={selectedTag === tag ? "filled" : "outlined"}
                      color={selectedTag === tag ? "primary" : "default"}
                      onClick={() => handleTagClick(tag)}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Archives
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: '8px' }} />
                      <Typography variant="body2">May 2025</Typography>
                    </Box>
                    <Chip label="4" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: '8px' }} />
                      <Typography variant="body2">April 2025</Typography>
                    </Box>
                    <Chip label="6" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: '8px' }} />
                      <Typography variant="body2">March 2025</Typography>
                    </Box>
                    <Chip label="8" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: '8px' }} />
                      <Typography variant="body2">February 2025</Typography>
                    </Box>
                    <Chip label="5" size="small" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 4, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Subscribe to Newsletter
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Get the latest fishing tips, news, and exclusive content delivered to your inbox.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: 'white',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticlesPage;