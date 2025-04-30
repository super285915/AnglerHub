import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Button, useTheme, Avatar } from '@mui/material';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const theme = useTheme();

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = article.excerpt.split(' ').length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 20px rgba(0, 0, 0, 0.3)'
          : '0 8px 20px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 16px 30px rgba(0, 0, 0, 0.4)'
            : '0 16px 30px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={article.imageUrl}
          alt={article.title}
          sx={{
            height: 220,
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
          label={article.category}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            fontWeight: 600,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(4px)',
            fontSize: '0.8rem',
            py: 0.5,
          }}
        />

        {/* Read time badge */}
        <Chip
          icon={<Clock size={14} color="white" />}
          label={`${readTime} min read`}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            fontWeight: 500,
            borderRadius: '8px',
            backdropFilter: 'blur(4px)',
            fontSize: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to={`/articles/${article.id}`}
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            fontSize: '1.4rem',
            mb: 2,
            color: theme.palette.text.primary,
            textDecoration: 'none',
            display: 'block',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
        >
          {article.title}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                mr: 1,
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}
            >
              {article.author.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {article.author}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                Author
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Calendar size={18} color={theme.palette.primary.main} />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            height: '4.8em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {article.excerpt}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {article.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(0, 0, 0, 0.08)',
                  }
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/articles/${article.id}`}
            endIcon={<ArrowRight size={18} />}
            sx={{
              py: 1,
              px: 2.5,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
              boxShadow: '0 4px 12px rgba(0, 97, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 15px rgba(0, 97, 255, 0.3)',
                background: 'linear-gradient(45deg, #0052d6 30%, #40cfff 90%)',
              }
            }}
          >
            Read Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;