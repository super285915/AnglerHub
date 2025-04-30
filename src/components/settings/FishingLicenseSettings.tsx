import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Save,
  FileText,
  Calendar,
  AlertCircle,
  Bell,
  Info
} from 'lucide-react';
import { FishingLicenseInfo } from '../../types';

// Mock data for states
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Mock data for license types
const licenseTypes = [
  'Annual Resident',
  'Annual Non-Resident',
  '1-Day',
  '3-Day',
  '7-Day',
  'Lifetime',
  'Senior',
  'Disability',
  'Military/Veteran'
];

const FishingLicenseSettings: React.FC = () => {
  const [licenseInfo, setLicenseInfo] = useState<FishingLicenseInfo>({
    state: 'Washington',
    licenseNumber: 'WA-12345678',
    expirationDate: '2024-12-31',
    licenseType: 'Annual Resident',
    autoRenew: true,
    reminderDays: 30
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLicenseInfo({
      ...licenseInfo,
      [name]: value
    });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenseInfo({
      ...licenseInfo,
      autoRenew: e.target.checked
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenseInfo({
      ...licenseInfo,
      expirationDate: e.target.value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save license information
    setShowSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Fishing License Information
      </Typography>

        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FileText size={24} style={{ marginRight: '12px' }} />
            <Typography variant="h6">
              Manage your fishing license details
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Keep track of your fishing license information and get reminders before it expires.
            This information is for your convenience only and does not replace your official license.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
                License Details
              </Typography>

              <TextField
                select
                fullWidth
                label="State"
                name="state"
                value={licenseInfo.state}
                onChange={handleInputChange}
                margin="normal"
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="License Number"
                name="licenseNumber"
                value={licenseInfo.licenseNumber}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Enter your license number exactly as it appears on your license">
                        <IconButton edge="end">
                          <Info size={16} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                select
                fullWidth
                label="License Type"
                name="licenseType"
                value={licenseInfo.licenseType}
                onChange={handleInputChange}
                margin="normal"
              >
                {licenseTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Expiration Date"
                name="expirationDate"
                type="date"
                value={licenseInfo.expirationDate}
                onChange={handleDateChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
                Renewal & Reminders
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={licenseInfo.autoRenew}
                      onChange={handleSwitchChange}
                      name="autoRenew"
                      color="primary"
                    />
                  }
                  label="Enable auto-renewal reminders"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
                  We'll send you a reminder when your license is about to expire
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <TextField
                fullWidth
                label="Reminder Days Before Expiration"
                name="reminderDays"
                type="number"
                value={licenseInfo.reminderDays}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bell size={18} />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <AlertCircle size={20} style={{ marginRight: '8px', marginTop: '2px', color: '#1976d2' }} />
                  <Typography variant="body2">
                    Your license will expire on <strong>{new Date(licenseInfo.expirationDate).toLocaleDateString()}</strong>.
                    You will receive a reminder <strong>{licenseInfo.reminderDays} days</strong> before expiration.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<Save size={18} />}
            onClick={handleSaveSettings}
          >
            Save License Information
          </Button>
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Fishing license information saved successfully!
          </Alert>
        </Snackbar>
      </Box>
  );
};

export default FishingLicenseSettings;
