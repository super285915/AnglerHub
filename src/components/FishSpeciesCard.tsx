import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Info, ChevronRight, X } from 'lucide-react';
import { FishSpecies } from '../types';

interface FishSpeciesCardProps {
  species: FishSpecies;
}

const FishSpeciesCard: React.FC<FishSpeciesCardProps> = ({ species }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <CardMedia
          component="img"
          height="200"
          image={species.imageUrl}
          alt={species.name}
          sx={{
            height: 200, 
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            {species.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic', mb: 2 }}>
            {species.scientificName}
          </Typography>

          <Typography variant="body2" paragraph>
            {`${species.description.substring(0, 100)}...`}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Habitat:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {species.habitat}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Average Size:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {species.averageSize}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Conservation Status:
          </Typography>
          <Chip
            label={species.conservationStatus}
            color={
              species.conservationStatus === 'Least Concern' ? 'success' :
              species.conservationStatus === 'Vulnerable' ? 'warning' :
              'error'
            }
            size="small"
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
            <Button
              variant="text"
              color="primary"
              onClick={handleOpenDialog}
              endIcon={<ChevronRight size={16} />}
              sx={{ textTransform: 'none' }}
            >
              More Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          pb: 1
        }}>
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {species.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {species.scientificName}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
            <Box sx={{ flex: '0 0 40%', maxWidth: { xs: '100%', md: '40%' } }}>
              <img
                src={species.imageUrl}
                alt={species.name}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  aspectRatio: '16/9'
                }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="body1" paragraph>
                {species.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Habitat:
                </Typography>
                <Typography variant="body2">
                  {species.habitat}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Average Size:
                </Typography>
                <Typography variant="body2">
                  {species.averageSize}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Diet:
                </Typography>
                <Typography variant="body2">
                  {species.diet}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Conservation Status:
                </Typography>
                <Chip
                  label={species.conservationStatus}
                  color={
                    species.conservationStatus === 'Least Concern' ? 'success' :
                    species.conservationStatus === 'Vulnerable' ? 'warning' :
                    'error'
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Fishing Techniques:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {species.fishingTechniques.map((technique, index) => (
                <Chip key={index} label={technique} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Best Seasons:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {species.bestSeasons.map((season, index) => (
                <Chip
                  key={index}
                  label={season}
                  variant="outlined"
                  color={
                    season === 'Spring' ? 'success' :
                    season === 'Summer' ? 'warning' :
                    season === 'Fall' ? 'secondary' :
                    'primary'
                  }
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
              <Info size={18} style={{ marginRight: '8px' }} /> Fun Facts:
            </Typography>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '24px' }}>
              {species.funFacts.map((fact, index) => (
                <li key={index}>
                  <Typography variant="body2" paragraph>
                    {fact}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FishSpeciesCard;