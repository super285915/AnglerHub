import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Stack, Rating, CardActionArea, useTheme } from '@mui/material';
import { MapPin, Waves, Fish, Calendar, ThermometerSun } from 'lucide-react';
import { FishingSpot } from '../types';
import { Link as RouterLink } from 'react-router-dom';

interface FishingSpotCardProps {
  spot: FishingSpot;
}

const FishingSpotCard: React.FC<FishingSpotCardProps> = ({ spot }) => {
  const theme = useTheme();

  return (
    <Card
      component={RouterLink}
      to={`/map?spot=${spot.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
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
        <Chip
          label={spot.type === 'freshwater' ? 'Freshwater' : 'Saltwater'}
          color={spot.type === 'freshwater' ? 'primary' : 'secondary'}
          size="small"
          icon={<Waves size={16} />}
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1,
            fontWeight: 600,
            borderRadius: '8px',
            px: 1,
            py: 0.5,
            backdropFilter: 'blur(4px)',
            backgroundColor: spot.type === 'freshwater'
              ? 'rgba(25, 118, 210, 0.85)'
              : 'rgba(156, 39, 176, 0.85)',
          }}
        />

        <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          <Chip
            size="small"
            icon={<ThermometerSun size={16} />}
            label={spot.bestSeason}
            sx={{
              fontWeight: 600,
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        </Box>

        <CardMedia
          component="img"
          height="200"
          image={spot.imageUrl}
          alt={spot.name}
          sx={{
            height: 200,
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
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: '1.3rem',
            color: theme.palette.text.primary,
            mb: 2,
            borderBottom: '2px solid',
            borderColor: theme.palette.primary.main,
            pb: 1,
            display: 'inline-block'
          }}
        >
          {spot.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              color: theme.palette.text.secondary
            }}
          >
            <MapPin size={16} color="inherit" />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
              {spot.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              value={spot.popularityRating / 5 * 5}
              precision={0.5}
              size="small"
              readOnly
              sx={{
                color: theme.palette.mode === 'dark' ? '#FFD700' : theme.palette.primary.main
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 600 }}>
              {spot.popularityRating}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          sx={{
            mb: 2,
            lineHeight: 1.6,
            height: '4.8em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {spot.description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1.5,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: '0.9rem'
            }}
          >
            Fish Species:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {spot.fishSpecies.slice(0, 3).map((species, index) => (
              <Chip
                key={index}
                size="small"
                label={species}
                icon={<Fish size={14} />}
                sx={{
                  mb: 1,
                  fontWeight: 500,
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
            {spot.fishSpecies.length > 3 && (
              <Chip
                size="small"
                label={`+${spot.fishSpecies.length - 3} more`}
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              />
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FishingSpotCard;