import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Globe, 
  Users, 
  Lock, 
  MapPin, 
  Download, 
  Trash2, 
  Save
} from 'lucide-react';

const PrivacySettings: React.FC = () => {
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [locationSharing, setLocationSharing] = useState('friends');
  const [catchesVisibility, setCatchesVisibility] = useState('public');
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    allowTagging: true,
    showInSearch: true,
    allowDataCollection: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  const handleProfileVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileVisibility(event.target.value);
  };
  
  const handleLocationSharingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationSharing(event.target.value);
  };
  
  const handleCatchesVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCatchesVisibility(event.target.value);
  };
  
  const handleToggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key]
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save privacy preferences
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Privacy Settings
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Shield size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Manage your privacy
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Control who can see your profile, catches, and location information.
          Your privacy is important to us.
        </Typography>
      </Paper>
      
      {/* Profile Visibility */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Profile Visibility
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 2 }}>Who can see your profile?</FormLabel>
          <RadioGroup
            aria-label="profile-visibility"
            name="profile-visibility"
            value={profileVisibility}
            onChange={handleProfileVisibilityChange}
          >
            <FormControlLabel 
              value="public" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Globe size={18} style={{ marginRight: '8px' }} />
                  Public (Everyone)
                </Box>
              } 
            />
            <FormControlLabel 
              value="friends" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Users size={18} style={{ marginRight: '8px' }} />
                  Friends Only
                </Box>
              } 
            />
            <FormControlLabel 
              value="private" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Lock size={18} style={{ marginRight: '8px' }} />
                  Private (Only you)
                </Box>
              } 
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      
      {/* Location Sharing */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Location Sharing
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MapPin size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Fishing Spot Location Sharing
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Control who can see the exact locations of your fishing spots and catches.
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="location-sharing"
            name="location-sharing"
            value={locationSharing}
            onChange={handleLocationSharingChange}
          >
            <FormControlLabel 
              value="public" 
              control={<Radio />} 
              label="Share with everyone" 
            />
            <FormControlLabel 
              value="friends" 
              control={<Radio />} 
              label="Share with friends only" 
            />
            <FormControlLabel 
              value="private" 
              control={<Radio />} 
              label="Keep private (only you)" 
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      
      {/* Catches Visibility */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Catches Visibility
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 2 }}>Who can see your catches?</FormLabel>
          <RadioGroup
            aria-label="catches-visibility"
            name="catches-visibility"
            value={catchesVisibility}
            onChange={handleCatchesVisibilityChange}
          >
            <FormControlLabel 
              value="public" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Eye size={18} style={{ marginRight: '8px' }} />
                  Public (Everyone)
                </Box>
              } 
            />
            <FormControlLabel 
              value="friends" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Users size={18} style={{ marginRight: '8px' }} />
                  Friends Only
                </Box>
              } 
            />
            <FormControlLabel 
              value="private" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EyeOff size={18} style={{ marginRight: '8px' }} />
                  Private (Only you)
                </Box>
              } 
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      
      {/* Additional Privacy Settings */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Additional Privacy Settings
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemIcon>
              <Eye size={20} />
            </ListItemIcon>
            <ListItemText 
              primary="Show Online Status" 
              secondary="Allow others to see when you're online" 
            />
            <Switch
              edge="end"
              checked={privacySettings.showOnlineStatus}
              onChange={() => handleToggleSetting('showOnlineStatus')}
              inputProps={{ 'aria-label': 'toggle online status' }}
            />
          </ListItem>
          
          <Divider variant="inset" component="li" />
          
          <ListItem>
            <ListItemIcon>
              <Users size={20} />
            </ListItemIcon>
            <ListItemText 
              primary="Allow Tagging" 
              secondary="Allow others to tag you in posts and photos" 
            />
            <Switch
              edge="end"
              checked={privacySettings.allowTagging}
              onChange={() => handleToggleSetting('allowTagging')}
              inputProps={{ 'aria-label': 'toggle tagging' }}
            />
          </ListItem>
          
          <Divider variant="inset" component="li" />
          
          <ListItem>
            <ListItemIcon>
              <Globe size={20} />
            </ListItemIcon>
            <ListItemText 
              primary="Show in Search Results" 
              secondary="Allow your profile to appear in search results" 
            />
            <Switch
              edge="end"
              checked={privacySettings.showInSearch}
              onChange={() => handleToggleSetting('showInSearch')}
              inputProps={{ 'aria-label': 'toggle search visibility' }}
            />
          </ListItem>
          
          <Divider variant="inset" component="li" />
          
          <ListItem>
            <ListItemIcon>
              <Shield size={20} />
            </ListItemIcon>
            <ListItemText 
              primary="Data Collection" 
              secondary="Allow us to collect usage data to improve your experience" 
            />
            <Switch
              edge="end"
              checked={privacySettings.allowDataCollection}
              onChange={() => handleToggleSetting('allowDataCollection')}
              inputProps={{ 'aria-label': 'toggle data collection' }}
            />
          </ListItem>
        </List>
      </Paper>
      
      {/* Data Management */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Data Management
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              Download Your Data
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get a copy of your personal data
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Download size={18} />}
          >
            Request Data
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'error.main' }}>
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Permanently delete your account and all data
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Trash2 size={18} />}
            onClick={handleOpenDeleteDialog}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSaveSettings}
        >
          Save Privacy Settings
        </Button>
      </Box>
      
      {/* Delete Account Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-account-dialog-title"
        aria-describedby="delete-account-dialog-description"
      >
        <DialogTitle id="delete-account-dialog-title">
          Delete Your Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-account-dialog-description">
            This action cannot be undone. All your data, including profile information, catches, and comments will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={handleCloseDeleteDialog}>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Privacy settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrivacySettings;
