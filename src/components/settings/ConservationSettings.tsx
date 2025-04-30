import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Divider,
  Grid,
  Chip,
  Button,
  Snackbar,
  Alert,
  TextField,
  Slider,
  InputAdornment,
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Save, 
  Leaf, 
  Heart, 
  DollarSign, 
  Users, 
  CheckCircle
} from 'lucide-react';
import { ConservationPreferences } from '../../types';

// Mock data for conservation organizations
const conservationOrganizations = [
  'Trout Unlimited',
  'Coastal Conservation Association',
  'Ducks Unlimited',
  'The Nature Conservancy',
  'American Sportfishing Association',
  'Wild Salmon Center',
  'Bonefish & Tarpon Trust',
  'Theodore Roosevelt Conservation Partnership',
  'National Wildlife Federation',
  'Ocean Conservancy',
  'World Wildlife Fund',
  'Conservation International'
];

// Mock data for volunteer interests
const volunteerInterests = [
  'Habitat Restoration',
  'Fish Stocking',
  'Water Quality Monitoring',
  'Education & Outreach',
  'Cleanup Events',
  'Fish Population Surveys',
  'Invasive Species Removal',
  'Policy Advocacy',
  'Youth Fishing Programs',
  'Conservation Research'
];

const ConservationSettings: React.FC = () => {
  const [conservationPrefs, setConservationPrefs] = useState<ConservationPreferences>({
    participateInCatchAndRelease: true,
    supportedOrganizations: ['Trout Unlimited', 'Coastal Conservation Association'],
    volunteerInterests: ['Habitat Restoration', 'Cleanup Events'],
    donationPreferences: {
      monthlyDonation: false,
      donationAmount: 25
    },
    receiveConservationUpdates: true
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSwitchChange = (name: keyof ConservationPreferences) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConservationPrefs({
      ...conservationPrefs,
      [name]: e.target.checked
    });
  };
  
  const handleDonationSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConservationPrefs({
      ...conservationPrefs,
      donationPreferences: {
        ...conservationPrefs.donationPreferences,
        monthlyDonation: e.target.checked
      }
    });
  };
  
  const handleDonationAmountChange = (event: Event, newValue: number | number[]) => {
    setConservationPrefs({
      ...conservationPrefs,
      donationPreferences: {
        ...conservationPrefs.donationPreferences,
        donationAmount: newValue as number
      }
    });
  };
  
  const handleOrganizationsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setConservationPrefs({
      ...conservationPrefs,
      supportedOrganizations: newValue
    });
  };
  
  const handleInterestsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setConservationPrefs({
      ...conservationPrefs,
      volunteerInterests: newValue
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save conservation preferences
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Conservation Settings
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Leaf size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Support Conservation Efforts
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Customize your conservation preferences and learn how you can contribute to protecting our aquatic ecosystems.
          Your participation helps ensure sustainable fisheries for future generations.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Conservation Practices
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={conservationPrefs.participateInCatchAndRelease}
                  onChange={handleSwitchChange('participateInCatchAndRelease')}
                  name="participateInCatchAndRelease"
                  color="primary"
                />
              }
              label="I practice catch and release fishing"
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Organizations You Support
            </Typography>
            
            <Autocomplete
              multiple
              id="supported-organizations"
              options={conservationOrganizations}
              value={conservationPrefs.supportedOrganizations}
              onChange={handleOrganizationsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Conservation Organizations"
                  placeholder="Add organizations"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Heart size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
              sx={{ mb: 3 }}
            />
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Volunteer Interests
            </Typography>
            
            <Autocomplete
              multiple
              id="volunteer-interests"
              options={volunteerInterests}
              value={conservationPrefs.volunteerInterests}
              onChange={handleInterestsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Volunteer Activities"
                  placeholder="Add interests"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Heart size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Donation Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={conservationPrefs.donationPreferences.monthlyDonation}
                  onChange={handleDonationSwitchChange}
                  name="monthlyDonation"
                  color="primary"
                />
              }
              label="Enable monthly donations to conservation efforts"
            />
            
            <Box sx={{ mt: 3, mb: 1 }}>
              <Typography id="donation-amount-slider" gutterBottom>
                Monthly Donation Amount: ${conservationPrefs.donationPreferences.donationAmount}
              </Typography>
              <Slider
                value={conservationPrefs.donationPreferences.donationAmount}
                onChange={handleDonationAmountChange}
                aria-labelledby="donation-amount-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={100}
                disabled={!conservationPrefs.donationPreferences.monthlyDonation}
                valueLabelFormat={(value) => `$${value}`}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Custom Amount"
              type="number"
              value={conservationPrefs.donationPreferences.donationAmount}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  handleDonationAmountChange(null as any, value);
                }
              }}
              margin="normal"
              disabled={!conservationPrefs.donationPreferences.monthlyDonation}
              InputProps={{
                startAdornment: <InputAdornment position="start"><DollarSign size={18} /></InputAdornment>,
              }}
            />
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Communication Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={conservationPrefs.receiveConservationUpdates}
                  onChange={handleSwitchChange('receiveConservationUpdates')}
                  name="receiveConservationUpdates"
                  color="primary"
                />
              }
              label="Receive updates about conservation efforts"
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
              Get information about conservation projects, volunteer opportunities, and the impact of your contributions
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: 'success.50' }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', color: 'success.dark' }}>
          Your Conservation Impact
        </Typography>
        
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircle size={20} color="#2e7d32" />
            </ListItemIcon>
            <ListItemText 
              primary="Practicing catch and release helps maintain healthy fish populations"
              secondary="You've indicated that you practice catch and release fishing"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircle size={20} color="#2e7d32" />
            </ListItemIcon>
            <ListItemText 
              primary={`Supporting ${conservationPrefs.supportedOrganizations.length} conservation organizations`}
              secondary="Your support helps fund critical conservation work"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircle size={20} color="#2e7d32" />
            </ListItemIcon>
            <ListItemText 
              primary={`Interested in ${conservationPrefs.volunteerInterests.length} volunteer activities`}
              secondary="Your time and effort make a direct impact on local ecosystems"
            />
          </ListItem>
          
          {conservationPrefs.donationPreferences.monthlyDonation && (
            <ListItem>
              <ListItemIcon>
                <CheckCircle size={20} color="#2e7d32" />
              </ListItemIcon>
              <ListItemText 
                primary={`Contributing $${conservationPrefs.donationPreferences.donationAmount} monthly to conservation`}
                secondary="Your financial support helps fund critical projects"
              />
            </ListItem>
          )}
        </List>
      </Paper>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSaveSettings}
          color="primary"
        >
          Save Conservation Preferences
        </Button>
      </Box>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Conservation preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConservationSettings;
