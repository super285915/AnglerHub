import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { Box, Typography, Chip, Avatar, useTheme } from '@mui/material';
import { FishingSpot } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';

interface InteractiveFishingMapProps {
  spots: FishingSpot[];
}

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2VuaW9yZGV2IiwiYSI6ImNtYTJxdGt5NTBsYmIycnE0bmdpb2YwbzQifQ.xg5717-aPzSGC5_BZFifVA';

const InteractiveFishingMap: React.FC<InteractiveFishingMapProps> = ({ spots }) => {
  const theme = useTheme();
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  // Filter functionality is currently disabled but will be implemented in the future
  const filterType = 'all';

  const filteredSpots = spots.filter((spot) => {
    if (filterType === 'all') return true;
    return spot.type === filterType;
  });

  return (
    <Box sx={{ height: '500px', width: '100%', position: 'relative' }}>
      {/* <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
          width: { xs: '180px', sm: '220px' },
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: 1,
          p: 2,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="water-type-filter-label">Water Type</InputLabel>
          <Select
            labelId="water-type-filter-label"
            id="water-type-filter"
            value={filterType}
            label="Water Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="freshwater">Freshwater</MenuItem>
            <MenuItem value="saltwater">Saltwater</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -95.7129,
          latitude: 37.0902,
          zoom: 3.5
        }}
        mapStyle={theme.palette.mode === 'dark'
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/outdoors-v12"
        }
      >
        <NavigationControl position="bottom-right" />

        {filteredSpots.map((spot) => (
          <Marker
            key={spot.id}
            longitude={spot.coordinates.longitude}
            latitude={spot.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedSpot(spot);
            }}
          >
            <Box sx={{ position: 'relative', cursor: 'pointer' }}>
              <Avatar
                src={spot.imageUrl}
                alt={spot.name}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid',
                  borderColor: spot.type === 'freshwater'
                    ? theme.palette.mode === 'dark' ? '#4e95f0' : '#1a73e8'
                    : theme.palette.mode === 'dark' ? '#60ad5e' : '#2e7d32',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: spot.type === 'freshwater'
                    ? `8px solid ${theme.palette.mode === 'dark' ? '#4e95f0' : '#1a73e8'}`
                    : `8px solid ${theme.palette.mode === 'dark' ? '#60ad5e' : '#2e7d32'}`,
                }}
              />
            </Box>
          </Marker>
        ))}

        {selectedSpot && (
          <Popup
            longitude={selectedSpot.coordinates.longitude}
            latitude={selectedSpot.coordinates.latitude}
            anchor="bottom"
            onClose={() => setSelectedSpot(null)}
            closeOnClick={false}
            closeButton={true}
            maxWidth="300px"
          >
            <Box sx={{
              p: 1,
              maxWidth: 280,
              bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
              color: 'text.primary'
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: 140,
                  borderRadius: 1,
                  overflow: 'hidden',
                  mb: 1.5,
                  position: 'relative'
                }}
              >
                <img
                  src={selectedSpot.imageUrl}
                  alt={selectedSpot.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    p: 0.75
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {selectedSpot.name}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {selectedSpot.location}
                </Typography>
                <Chip
                  label={selectedSpot.type === 'freshwater' ? 'Freshwater' : 'Saltwater'}
                  color={selectedSpot.type === 'freshwater' ? 'primary' : 'secondary'}
                  size="small"
                />
              </Box>

              <Typography variant="body2" sx={{ mb: 1.5 }}>
                {selectedSpot.description.substring(0, 100)}...
              </Typography>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Fish species:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedSpot.fishSpecies.map((species, index) => (
                    <Chip
                      key={index}
                      label={species}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  Rating: {selectedSpot.popularityRating}/5
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  Best: {selectedSpot.bestSeason}
                </Typography>
              </Box>
            </Box>
          </Popup>
        )}
      </Map>
    </Box>
  );
};

export default InteractiveFishingMap;