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
  Autocomplete,
  TextField,
  Slider,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Save, 
  Calendar, 
  MapPin, 
  Bell, 
  Trophy, 
  Users, 
  Bookmark, 
  Clock, 
  CalendarCheck
} from 'lucide-react';
import { EventPreferences } from '../../types';

// Mock data for event types
const eventTypes = [
  'Fishing Tournaments',
  'Fishing Expos',
  'Fishing Workshops',
  'Conservation Events',
  'Kids Fishing Days',
  'Fishing Clubs',
  'Fishing Seminars',
  'Fly Tying Classes',
  'Boat Shows',
  'Fishing Trips',
  'Fishing Festivals',
  'Fishing Competitions'
];

// Mock data for locations
const locations = [
  'Seattle, WA',
  'Portland, OR',
  'San Francisco, CA',
  'Los Angeles, CA',
  'Denver, CO',
  'Chicago, IL',
  'New York, NY',
  'Miami, FL',
  'Austin, TX',
  'Nashville, TN',
  'Boston, MA',
  'Atlanta, GA',
  'Minneapolis, MN',
  'Salt Lake City, UT',
  'Phoenix, AZ',
  'Las Vegas, NV',
  'New Orleans, LA',
  'Detroit, MI',
  'Philadelphia, PA',
  'Charlotte, NC'
];

// Calendar types
const calendarTypes = [
  { value: 'google', label: 'Google Calendar' },
  { value: 'outlook', label: 'Microsoft Outlook' },
  { value: 'apple', label: 'Apple Calendar' },
  { value: 'other', label: 'Other Calendar App' }
];

const EventsSettings: React.FC = () => {
  const [eventPrefs, setEventPrefs] = useState<EventPreferences>({
    interestedEventTypes: ['Fishing Tournaments', 'Conservation Events', 'Fishing Workshops'],
    preferredLocations: ['Seattle, WA', 'Portland, OR'],
    maxTravelDistance: 50,
    reminderDays: 7,
    addToCalendar: true,
    calendarType: 'google'
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleEventTypesChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setEventPrefs({
      ...eventPrefs,
      interestedEventTypes: newValue
    });
  };
  
  const handleLocationsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setEventPrefs({
      ...eventPrefs,
      preferredLocations: newValue
    });
  };
  
  const handleTravelDistanceChange = (event: Event, newValue: number | number[]) => {
    setEventPrefs({
      ...eventPrefs,
      maxTravelDistance: newValue as number
    });
  };
  
  const handleReminderDaysChange = (event: Event, newValue: number | number[]) => {
    setEventPrefs({
      ...eventPrefs,
      reminderDays: newValue as number
    });
  };
  
  const handleCalendarSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventPrefs({
      ...eventPrefs,
      addToCalendar: e.target.checked
    });
  };
  
  const handleCalendarTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventPrefs({
      ...eventPrefs,
      calendarType: e.target.value as 'google' | 'outlook' | 'apple' | 'other'
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save event preferences
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Events Calendar Settings
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Calendar size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Manage Your Fishing Events
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Customize your event preferences to discover fishing tournaments, workshops, and conservation events in your area.
          Set reminders and sync events with your calendar to never miss an opportunity.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Event Interests
            </Typography>
            
            <Autocomplete
              multiple
              id="event-types"
              options={eventTypes}
              value={eventPrefs.interestedEventTypes}
              onChange={handleEventTypesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Event Types"
                  placeholder="Add event types"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Trophy size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Reminder Settings
            </Typography>
            
            <Box sx={{ px: 1 }}>
              <Typography id="reminder-days-slider" gutterBottom>
                Remind me {eventPrefs.reminderDays} days before events
              </Typography>
              <Slider
                value={eventPrefs.reminderDays}
                onChange={handleReminderDaysChange}
                aria-labelledby="reminder-days-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 1, label: '1 day' },
                  { value: 7, label: '1 week' },
                  { value: 14, label: '2 weeks' },
                  { value: 30, label: '1 month' }
                ]}
                min={1}
                max={30}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Calendar Integration
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={eventPrefs.addToCalendar}
                  onChange={handleCalendarSwitchChange}
                  name="addToCalendar"
                  color="primary"
                />
              }
              label="Automatically add events to my calendar"
            />
            
            {eventPrefs.addToCalendar && (
              <FormControl component="fieldset" sx={{ mt: 2, ml: 4 }}>
                <FormLabel component="legend">Calendar Type</FormLabel>
                <RadioGroup
                  aria-label="calendar-type"
                  name="calendar-type"
                  value={eventPrefs.calendarType}
                  onChange={handleCalendarTypeChange}
                >
                  {calendarTypes.map((type) => (
                    <FormControlLabel
                      key={type.value}
                      value={type.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarCheck size={18} style={{ marginRight: '8px' }} />
                          {type.label}
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Location Preferences
            </Typography>
            
            <Autocomplete
              multiple
              id="preferred-locations"
              options={locations}
              value={eventPrefs.preferredLocations}
              onChange={handleLocationsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Preferred Locations"
                  placeholder="Add locations"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<MapPin size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ px: 1, mt: 4 }}>
              <Typography id="travel-distance-slider" gutterBottom>
                Maximum travel distance: {eventPrefs.maxTravelDistance} miles
              </Typography>
              <Slider
                value={eventPrefs.maxTravelDistance}
                onChange={handleTravelDistanceChange}
                aria-labelledby="travel-distance-slider"
                valueLabelDisplay="auto"
                step={10}
                marks={[
                  { value: 10, label: '10 mi' },
                  { value: 50, label: '50 mi' },
                  { value: 100, label: '100 mi' },
                  { value: 200, label: '200+ mi' }
                ]}
                min={10}
                max={200}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Custom Distance (miles)"
              type="number"
              value={eventPrefs.maxTravelDistance}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  handleTravelDistanceChange(null as any, value);
                }
              }}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start"><MapPin size={18} /></InputAdornment>,
              }}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.50' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', color: 'primary.dark' }}>
              Upcoming Events Based on Your Preferences
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <Trophy size={20} color="#1976d2" />
                </ListItemIcon>
                <ListItemText 
                  primary="Annual Bass Tournament" 
                  secondary="Seattle, WA - June 15, 2023 (2 weeks away)" 
                />
                <Chip 
                  label="Reminder Set" 
                  size="small" 
                  icon={<Bell size={14} />} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemIcon>
                  <Users size={20} color="#1976d2" />
                </ListItemIcon>
                <ListItemText 
                  primary="Fly Fishing Workshop" 
                  secondary="Portland, OR - July 8, 2023 (4 weeks away)" 
                />
                <Chip 
                  label="Added to Calendar" 
                  size="small" 
                  icon={<Calendar size={14} />} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemIcon>
                  <Bookmark size={20} color="#1976d2" />
                </ListItemIcon>
                <ListItemText 
                  primary="Conservation Cleanup Day" 
                  secondary="Seattle, WA - August 12, 2023 (8 weeks away)" 
                />
                <Chip 
                  label="Interested" 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </ListItem>
            </List>
            
            <Typography variant="body2" sx={{ mt: 2, color: 'primary.dark', fontStyle: 'italic' }}>
              Note: This is a preview of how events will be displayed based on your current preferences.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSaveSettings}
          color="primary"
        >
          Save Event Preferences
        </Button>
      </Box>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Event calendar preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventsSettings;
