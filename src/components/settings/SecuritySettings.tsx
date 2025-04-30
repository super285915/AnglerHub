import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import { createSettingsPaperStyle } from '../../utils/styleUtils';
import {
  Key,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Lock,
  AlertTriangle,
  Check,
  X,
  LogOut
} from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const theme = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionManagementOpen, setSessionManagementOpen] = useState(false);
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 25;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;

    // Contains number or special char
    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 25;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'error.main';
    if (passwordStrength < 75) return 'warning.main';
    return 'success.main';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setTwoFactorDialogOpen(true);
    } else {
      setTwoFactorEnabled(false);
      setSuccessMessage('Two-factor authentication disabled');
      setShowSuccess(true);
    }
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
    setTwoFactorDialogOpen(false);
    setSuccessMessage('Two-factor authentication enabled');
    setShowSuccess(true);
  };

  const handleChangePassword = () => {
    // Validation
    if (!currentPassword) {
      alert('Please enter your current password');
      return;
    }

    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // In a real app, this would call an API endpoint to change the password
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccessMessage('Password changed successfully');
    setShowSuccess(true);
  };

  const handleOpenSessionManagement = () => {
    setSessionManagementOpen(true);
  };

  const handleCloseSessionManagement = () => {
    setSessionManagementOpen(false);
  };

  const handleCloseTwoFactorDialog = () => {
    setTwoFactorDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Seattle, WA',
      lastActive: 'Now (Current session)',
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Portland, OR',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 3,
      device: 'Firefox on Mac',
      location: 'Vancouver, BC',
      lastActive: '3 days ago',
      isCurrent: false
    }
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Security Settings
      </Typography>

      <Paper elevation={0} sx={{ ...createSettingsPaperStyle(theme, true), mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Shield size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Account Security
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Manage your password, two-factor authentication, and active sessions.
          Keeping your account secure is our top priority.
        </Typography>
      </Paper>

      {/* Change Password */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Change Password
      </Typography>

      <Paper sx={{ ...createSettingsPaperStyle(theme), mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Key size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Update your password
          </Typography>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleCurrentPasswordVisibility}
                  edge="end"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleNewPasswordVisibility}
                  edge="end"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {newPassword && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Password Strength:
              </Typography>
              <Chip
                label={getPasswordStrengthLabel()}
                size="small"
                sx={{
                  bgcolor: getPasswordStrengthColor(),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getPasswordStrengthColor(),
                }
              }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/[A-Z]/.test(newPassword) ?
                  <Check size={16} color="green" style={{ marginRight: '4px' }} /> :
                  <X size={16} color="red" style={{ marginRight: '4px' }} />
                }
                <Typography variant="caption" color={/[A-Z]/.test(newPassword) ? 'success.main' : 'error.main'}>
                  Uppercase
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {/[a-z]/.test(newPassword) ?
                  <Check size={16} color="green" style={{ marginRight: '4px' }} /> :
                  <X size={16} color="red" style={{ marginRight: '4px' }} />
                }
                <Typography variant="caption" color={/[a-z]/.test(newPassword) ? 'success.main' : 'error.main'}>
                  Lowercase
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {/[0-9]/.test(newPassword) ?
                  <Check size={16} color="green" style={{ marginRight: '4px' }} /> :
                  <X size={16} color="red" style={{ marginRight: '4px' }} />
                }
                <Typography variant="caption" color={/[0-9]/.test(newPassword) ? 'success.main' : 'error.main'}>
                  Number
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {newPassword.length >= 8 ?
                  <Check size={16} color="green" style={{ marginRight: '4px' }} /> :
                  <X size={16} color="red" style={{ marginRight: '4px' }} />
                }
                <Typography variant="caption" color={newPassword.length >= 8 ? 'success.main' : 'error.main'}>
                  8+ Characters
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={newPassword !== confirmPassword && confirmPassword !== ''}
          helperText={newPassword !== confirmPassword && confirmPassword !== '' ? 'Passwords do not match' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleChangePassword}
        >
          Update Password
        </Button>
      </Paper>

      {/* Two-Factor Authentication */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Two-Factor Authentication
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Smartphone size={20} style={{ marginRight: '12px' }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                Two-Factor Authentication (2FA)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add an extra layer of security to your account
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={twoFactorEnabled}
            onChange={handleToggleTwoFactor}
            inputProps={{ 'aria-label': 'toggle two-factor authentication' }}
          />
        </Box>

        {twoFactorEnabled && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Two-factor authentication is enabled. Your account is more secure.
          </Alert>
        )}

        {!twoFactorEnabled && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            Two-factor authentication is not enabled. We recommend enabling it for better security.
          </Alert>
        )}
      </Paper>

      {/* Session Management */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Active Sessions
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Lock size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Manage your active sessions
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You are currently logged in on 3 devices. You can review and log out from any session.
        </Typography>

        <Button
          variant="outlined"
          onClick={handleOpenSessionManagement}
        >
          Manage Sessions
        </Button>
      </Paper>

      {/* Security Alerts */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Security Alerts
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AlertTriangle size={20} style={{ marginRight: '12px', color: '#f59e0b' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Receive security alerts
          </Typography>
        </Box>

        <List>
          <ListItem>
            <ListItemIcon>
              <Mail size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Email Alerts"
              secondary="Receive security alerts via email"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={true}
                inputProps={{ 'aria-label': 'toggle email alerts' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <Bell size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Push Notifications"
              secondary="Receive security alerts as push notifications"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={true}
                inputProps={{ 'aria-label': 'toggle push notifications' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Session Management Dialog */}
      <Dialog
        open={sessionManagementOpen}
        onClose={handleCloseSessionManagement}
        aria-labelledby="session-management-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="session-management-dialog-title">
          Active Sessions
        </DialogTitle>
        <DialogContent>
          <List>
            {activeSessions.map((session) => (
              <React.Fragment key={session.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    {session.device.includes('Chrome') && <Chrome size={24} />}
                    {session.device.includes('Safari') && <Safari size={24} />}
                    {session.device.includes('Firefox') && <Firefox size={24} />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {session.device}
                        {session.isCurrent && (
                          <Chip
                            label="Current"
                            size="small"
                            color="primary"
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {session.location}
                        </Typography>
                        {` — Last active: ${session.lastActive}`}
                      </>
                    }
                  />
                  {!session.isCurrent && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<LogOut size={16} />}
                      sx={{ ml: 2 }}
                    >
                      Log Out
                    </Button>
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogOut size={18} />}
            >
              Log Out All Other Devices
            </Button>
            <Button onClick={handleCloseSessionManagement}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Two-Factor Authentication Dialog */}
      <Dialog
        open={twoFactorDialogOpen}
        onClose={handleCloseTwoFactorDialog}
        aria-labelledby="two-factor-dialog-title"
      >
        <DialogTitle id="two-factor-dialog-title">
          Enable Two-Factor Authentication
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Two-factor authentication adds an extra layer of security to your account. In addition to your password, you'll need to enter a code from your phone when logging in.
          </DialogContentText>
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <img
              src="https://via.placeholder.com/200x200?text=QR+Code"
              alt="QR Code"
              style={{ width: 200, height: 200, margin: '0 auto' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Scan this QR code with your authenticator app
            </Typography>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="verification-code"
            label="Verification Code"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTwoFactorDialog}>Cancel</Button>
          <Button onClick={handleEnableTwoFactor} variant="contained">
            Verify & Enable
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
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Mock components for browser icons
const Chrome = (props: any) => <Box component="span" {...props}>🌐</Box>;
const Safari = (props: any) => <Box component="span" {...props}>🧭</Box>;
const Firefox = (props: any) => <Box component="span" {...props}>🦊</Box>;
const Mail = (props: any) => <Box component="span" {...props}>✉️</Box>;
const Bell = (props: any) => <Box component="span" {...props}>🔔</Box>;

export default SecuritySettings;
