import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button, Divider, Paper } from '@mui/material';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { articles } from '../data/articles';
import NotFoundPage from './NotFoundPage';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <NotFoundPage
        title="Article Not Found"
        message="The article you're looking for doesn't exist or has been removed."
        backLink="/articles"
        backText="Browse All Articles"
      />
    );
  }

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
          <Button
            variant="text"
            component={RouterLink}
            to="/articles"
            startIcon={<ArrowLeft />}
            sx={{ color: 'white', mb: 2 }}
          >
            Back to Articles
          </Button>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {article.title}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <User size={18} style={{ marginRight: '8px' }} />
              <Typography variant="subtitle1">
                {article.author}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Calendar size={18} style={{ marginRight: '8px' }} />
              <Typography variant="subtitle1">
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Typography>
            </Box>
            <Chip
              label={article.category}
              color="primary"
              variant="filled"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ position: 'relative', mb: 4 }}>
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{
              width: '100%',
              borderRadius: '8px',
              maxHeight: '500px',
              objectFit: 'cover'
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
          {article.content}
          {/* Since our sample data has placeholder content, let's add some more text */}
          <br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
          <br /><br />
          Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.
          <br /><br />
          Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Tag size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Tags:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {article.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Paper elevation={1} sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            About the Author
          </Typography>
          <Typography variant="body1">
            {article.author} is an experienced angler and outdoor writer with a passion for sustainable fishing practices and conservation. With over 15 years of fishing experience across North America, they share insights and techniques to help anglers of all skill levels improve their craft.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ArticlePage;
