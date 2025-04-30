import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme
} from '@mui/material';
import { User, Mail, Camera, Save, Edit } from 'lucide-react';
import { User as UserType } from '../../context/AuthContext';
import { createSettingsPaperStyle } from '../../utils/styleUtils';

interface AccountSettingsProps {
  user: UserType | null;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate angler with 5+ years of experience in freshwater fishing.',
    location: 'Seattle, WA',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, this would call an API endpoint to update the user profile
      setShowSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  if (!user) {
    return (
      <Alert severity="warning">
        Please log in to view your account settings.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Account Settings
        </Typography>
        <Button
          variant="outlined"
          color={isEditing ? 'primary' : 'secondary'}
          startIcon={isEditing ? <Save /> : <Edit />}
          onClick={isEditing ? handleSave : handleEditToggle}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Saving...
            </>
          ) : isEditing ? (
            'Save Changes'
          ) : (
            'Edit Profile'
          )}
        </Button>
      </Box>

      <Paper elevation={0} sx={{ ...createSettingsPaperStyle(theme, true), mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 100,
                height: 100,
                border: '4px solid white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            />
            {isEditing && (
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                size="small"
              >
                <Camera size={16} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ ml: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Personal Information
      </Typography>

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
                  <User size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} />
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
            helperText={isEditing ? "Tell us about yourself and your fishing experience" : ""}
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
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Account Management
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" color="error">
          Deactivate Account
        </Button>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountSettings;
