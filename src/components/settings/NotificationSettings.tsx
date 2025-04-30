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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme
} from '@mui/material';
import {
  Bell,
  Mail,
  MessageSquare,
  Heart,
  UserPlus,
  Calendar,
  Fish,
  Save
} from 'lucide-react';
import { createSettingsPaperStyle } from '../../utils/styleUtils';

const NotificationSettings: React.FC = () => {
  const theme = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    likes: true,
    follows: true,
    events: true,
    catches: true,
    newsletter: false,
    marketing: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleTogglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save notification preferences
    setShowSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Notification Settings
      </Typography>

      <Paper elevation={0} sx={{ ...createSettingsPaperStyle(theme, true), mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Bell size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Manage your notifications
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Control which notifications you receive and how they are delivered.
          You can customize settings for different types of activities.
        </Typography>
      </Paper>

      {/* Notification Channels */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Notification Channels
      </Typography>

      <Paper sx={{ ...createSettingsPaperStyle(theme), mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Mail size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Email Notifications
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Receive notifications via email
          </Typography>
          <Switch
            checked={emailNotifications}
            onChange={handleToggleEmailNotifications}
            inputProps={{ 'aria-label': 'toggle email notifications' }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Bell size={20} style={{ marginRight: '12px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Push Notifications
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Receive notifications in your browser
          </Typography>
          <Switch
            checked={pushNotifications}
            onChange={handleTogglePushNotifications}
            inputProps={{ 'aria-label': 'toggle push notifications' }}
          />
        </Box>
      </Paper>

      {/* Notification Types */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Notification Types
      </Typography>

      <Paper sx={{ ...createSettingsPaperStyle(theme), mb: 4 }}>
        <List sx={{ width: '100%' }}>
          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.messages}
                onChange={() => handleToggleNotification('messages')}
                inputProps={{ 'aria-label': 'toggle messages notifications' }}
              />
            }
          >
            <ListItemIcon>
              <MessageSquare size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Messages"
              secondary="Notifications for new messages and replies"
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.likes}
                onChange={() => handleToggleNotification('likes')}
                inputProps={{ 'aria-label': 'toggle likes notifications' }}
              />
            }
          >
            <ListItemIcon>
              <Heart size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Likes & Reactions"
              secondary="When someone likes your posts or comments"
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.follows}
                onChange={() => handleToggleNotification('follows')}
                inputProps={{ 'aria-label': 'toggle follows notifications' }}
              />
            }
          >
            <ListItemIcon>
              <UserPlus size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Follows"
              secondary="When someone follows you"
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.events}
                onChange={() => handleToggleNotification('events')}
                inputProps={{ 'aria-label': 'toggle events notifications' }}
              />
            }
          >
            <ListItemIcon>
              <Calendar size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Events"
              secondary="Upcoming fishing events and tournaments"
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.catches}
                onChange={() => handleToggleNotification('catches')}
                inputProps={{ 'aria-label': 'toggle catches notifications' }}
              />
            }
          >
            <ListItemIcon>
              <Fish size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Catches"
              secondary="Updates on catches from people you follow"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Email Subscriptions */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Email Subscriptions
      </Typography>

      <Paper sx={{ ...createSettingsPaperStyle(theme), mb: 4 }}>
        <List sx={{ width: '100%' }}>
          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.newsletter}
                onChange={() => handleToggleNotification('newsletter')}
                inputProps={{ 'aria-label': 'toggle newsletter subscription' }}
              />
            }
          >
            <ListItemIcon>
              <Mail size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Newsletter
                  <Chip
                    label="Weekly"
                    size="small"
                    color="primary"
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                  />
                </Box>
              }
              secondary="Fishing tips, news, and updates"
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem
            secondaryAction={
              <Switch
                edge="end"
                checked={notificationSettings.marketing}
                onChange={() => handleToggleNotification('marketing')}
                inputProps={{ 'aria-label': 'toggle marketing emails' }}
              />
            }
          >
            <ListItemIcon>
              <Mail size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Marketing Emails"
              secondary="Promotions, offers, and product updates"
            />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSaveSettings}
        >
          Save Preferences
        </Button>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Notification preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationSettings;
