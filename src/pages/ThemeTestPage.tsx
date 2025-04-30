import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  TextField, 
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Fish, MapPin, Calendar, Star, Heart, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeTestPage: React.FC = () => {
  const { themePreferences } = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Theme Test Page
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Current Theme Settings
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Mode:</strong> {themePreferences.mode}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Primary Color:</strong> {themePreferences.primaryColor}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Font Family:</strong> {themePreferences.fontFamily}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Font Size:</strong> {themePreferences.fontSize}px
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Density:</strong> {themePreferences.density}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Animation Speed:</strong> {themePreferences.animationSpeed}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Reduced Motion:</strong> {themePreferences.reducedMotion ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>High Contrast:</strong> {themePreferences.highContrast ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        UI Components Preview
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Typography</Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h1" gutterBottom>Heading 1</Typography>
            <Typography variant="h2" gutterBottom>Heading 2</Typography>
            <Typography variant="h3" gutterBottom>Heading 3</Typography>
            <Typography variant="h4" gutterBottom>Heading 4</Typography>
            <Typography variant="h5" gutterBottom>Heading 5</Typography>
            <Typography variant="h6" gutterBottom>Heading 6</Typography>
            <Typography variant="subtitle1" gutterBottom>Subtitle 1</Typography>
            <Typography variant="subtitle2" gutterBottom>Subtitle 2</Typography>
            <Typography variant="body1" gutterBottom>
              Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Buttons</Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" color="primary">Primary Contained</Button>
              <Button variant="contained" color="secondary">Secondary Contained</Button>
              <Button variant="outlined" color="primary">Primary Outlined</Button>
              <Button variant="outlined" color="secondary">Secondary Outlined</Button>
              <Button variant="text" color="primary">Primary Text</Button>
              <Button variant="text" color="secondary">Secondary Text</Button>
              <Button variant="contained" color="primary" disabled>Disabled Button</Button>
              <Button variant="contained" color="primary" startIcon={<Star />}>With Icon</Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Cards</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card Title
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Card Subtitle
                  </Typography>
                  <Typography variant="body2">
                    Card content with some text that explains what this card is about.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Action 1</Button>
                  <Button size="small">Action 2</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Interactive Card
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                    <Chip icon={<Heart size={16} />} label="Like" variant="outlined" clickable />
                    <Chip icon={<MessageSquare size={16} />} label="Comment" variant="outlined" clickable />
                    <Chip icon={<Star size={16} />} label="Save" variant="outlined" clickable />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Form Elements</Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Standard" variant="outlined" />
              <TextField label="With Placeholder" placeholder="Type something..." variant="outlined" />
              <TextField label="Disabled" disabled variant="outlined" />
              <TextField 
                label="With Icon" 
                variant="outlined" 
                InputProps={{
                  startAdornment: <MapPin size={18} style={{ marginRight: 8 }} />,
                }}
              />
              <Divider />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Switch Example"
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>Lists</Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Fish size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Rainbow Trout"
                  secondary="Freshwater fish found in cold-water tributaries"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Fish size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Largemouth Bass"
                  secondary="Popular game fish in North America"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Fish size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Northern Pike"
                  secondary="Predatory fish with sharp teeth and aggressive behavior"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemeTestPage;
