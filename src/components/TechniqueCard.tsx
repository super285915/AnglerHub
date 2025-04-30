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
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import { ChevronRight, Target, Award, CheckCircle2, X } from 'lucide-react';
import { FishingTechnique } from '../types';

interface TechniqueCardProps {
  technique: FishingTechnique;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const theme = useTheme();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getDifficultyColor = () => {
    switch (technique.difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'primary';
    }
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
          image={technique.imageUrl}
          alt={technique.title}
          sx={{
            height: 200,
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
              {technique.title}
            </Typography>
            <Chip
              label={technique.difficulty.charAt(0).toUpperCase() + technique.difficulty.slice(1)}
              color={getDifficultyColor()}
              size="small"
              icon={<Award size={14} />}
            />
          </Box>

          <Typography variant="body2" paragraph sx={{ mb: 2 }}>
            {technique.description.length > 120
              ? `${technique.description.substring(0, 120)}...`
              : technique.description}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, display: 'flex', alignItems: 'center' }}>
              <Target size={16} style={{ marginRight: '4px' }} /> Best For:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {technique.bestFor.slice(0, 3).map((fish, index) => (
                <Chip key={index} size="small" label={fish} variant="outlined" />
              ))}
              {technique.bestFor.length > 3 && (
                <Chip size="small" label={`+${technique.bestFor.length - 3}`} variant="outlined" />
              )}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
            <Button
              variant="text"
              color="primary"
              onClick={handleOpenDialog}
              endIcon={<ChevronRight size={16} />}
              sx={{ textTransform: 'none' }}
            >
              How To & Tips
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
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          pb: 1
        }}>
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {technique.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Chip
                label={technique.difficulty.charAt(0).toUpperCase() + technique.difficulty.slice(1)}
                color={getDifficultyColor()}
                size="small"
                icon={<Award size={14} />}
              />
            </Box>
          </Box>
          <IconButton onClick={handleCloseDialog} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
            <Box sx={{ flex: '0 0 40%', maxWidth: { xs: '100%', md: '40%' } }}>
              <img
                src={technique.imageUrl}
                alt={technique.title}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  aspectRatio: '16/9'
                }}
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Target size={16} style={{ marginRight: '8px' }} /> Best For:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {technique.bestFor.map((fish, index) => (
                    <Chip key={index} label={fish} variant="outlined" />
                  ))}
                </Stack>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="body1" paragraph>
                {technique.description}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 3 }}>
                Step-by-Step Guide:
              </Typography>
              <List disablePadding>
                {technique.steps.map((step, index) => (
                  <ListItem key={index} alignItems="flex-start" disableGutters sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle2 size={20} color={theme.palette.primary.main} />
                    </ListItemIcon>
                    <ListItemText
                      primary={step}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Pro Tips:
          </Typography>
          <List disablePadding>
            {technique.tips.map((tip, index) => (
              <ListItem key={index} alignItems="flex-start" disableGutters sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <CheckCircle2 size={20} color={theme.palette.success.main} />
                </ListItemIcon>
                <ListItemText
                  primary={tip}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>
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

export default TechniqueCard;