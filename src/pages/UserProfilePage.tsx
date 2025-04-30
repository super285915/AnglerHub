import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Grid, 
  Divider, 
  TextField,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  InputAdornment
} from '@mui/material';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  Fish, 
  Bookmark, 
  Heart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate angler with 5+ years of experience in freshwater fishing.',
    location: 'Seattle, WA',
    joinDate: 'January 2023'
  });
  
  // Mock data
  const savedSpots = [
    { id: '1', name: 'Blue Lake', type: 'freshwater', location: 'Montana, USA' },
    { id: '2', name: 'Coastal Bay', type: 'saltwater', location: 'Florida, USA' },
    { id: '3', name: 'River Junction', type: 'freshwater', location: 'Colorado, USA' },
  ];
  
  const recentCatches = [
    { id: '1', species: 'Rainbow Trout', weight: '3.5 lbs', date: 'June 15, 2023', location: 'Blue Lake' },
    { id: '2', species: 'Largemouth Bass', weight: '5.2 lbs', date: 'May 28, 2023', location: 'Green Pond' },
  ];
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setSnackbarOpen(true);
    }
    setIsEditing(!isEditing);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  if (!user) {
    return null; // This should be handled by ProtectedRoute
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {user.email}
              </Typography>
              <Chip 
                label="Pro Angler" 
                color="primary" 
                size="small"
                sx={{ mb: 2 }}
              />
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <List dense sx={{ mb: 'auto' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <MapPin size={18} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Location" 
                  secondary={formData.location} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <Calendar size={18} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Member Since" 
                  secondary={formData.joinDate} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <Fish size={18} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Catches" 
                  secondary="15 recorded catches" 
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<Settings size={18} />}
                sx={{ mb: 2 }}
              >
                Account Settings
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogOut size={18} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Profile Content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="profile tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Profile" icon={<User size={18} />} iconPosition="start" />
                <Tab label="Saved Spots" icon={<Bookmark size={18} />} iconPosition="start" />
                <Tab label="Catches" icon={<Fish size={18} />} iconPosition="start" />
                <Tab label="Favorites" icon={<Heart size={18} />} iconPosition="start" />
              </Tabs>
            </Box>
            
            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Personal Information
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={isEditing ? <Save size={18} /> : <Edit size={18} />}
                    onClick={handleEditToggle}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User size={18} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Mail size={18} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapPin size={18} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            
            {/* Saved Spots Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Your Saved Fishing Spots
                </Typography>
                
                {savedSpots.length > 0 ? (
                  <Grid container spacing={3}>
                    {savedSpots.map((spot) => (
                      <Grid item key={spot.id} xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {spot.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <MapPin size={16} style={{ marginRight: '8px' }} />
                              <Typography variant="body2" color="text.secondary">
                                {spot.location}
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              <Chip 
                                label={spot.type === 'freshwater' ? 'Freshwater' : 'Saltwater'} 
                                color={spot.type === 'freshwater' ? 'primary' : 'secondary'} 
                                size="small" 
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    You haven't saved any fishing spots yet.
                  </Alert>
                )}
              </Box>
            </TabPanel>
            
            {/* Catches Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Your Recent Catches
                </Typography>
                
                {recentCatches.length > 0 ? (
                  <Grid container spacing={3}>
                    {recentCatches.map((catch_) => (
                      <Grid item key={catch_.id} xs={12}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  {catch_.species}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Weight: {catch_.weight}
                                </Typography>
                              </Box>
                              <Chip 
                                label={catch_.date} 
                                size="small" 
                                icon={<Calendar size={14} />}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                              <MapPin size={16} style={{ marginRight: '8px' }} />
                              <Typography variant="body2" color="text.secondary">
                                {catch_.location}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">
                    You haven't recorded any catches yet.
                  </Alert>
                )}
              </Box>
            </TabPanel>
            
            {/* Favorites Tab */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Your Favorite Content
                </Typography>
                
                <Alert severity="info">
                  You haven't favorited any content yet.
                </Alert>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Profile updated successfully"
      />
    </Container>
  );
};

export default UserProfilePage;
