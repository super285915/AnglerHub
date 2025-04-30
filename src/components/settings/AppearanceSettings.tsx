import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Grid,
  Switch,
  Divider,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  useTheme as useMuiTheme,
  SelectChangeEvent
} from '@mui/material';
import {
  Moon,
  Sun,
  Monitor,
  Palette,
  Type,
  RotateCcw,
  Save,
  Layout,
  Zap,
  BookOpen,
  Check
} from 'lucide-react';
import { useTheme, ThemePreferences } from '../../context/ThemeContext';

// Primary color options with labels
const primaryColorOptions = [
  { value: 'blue', label: 'Blue', color: '#1a73e8' },
  { value: 'green', label: 'Green', color: '#2e7d32' },
  { value: 'purple', label: 'Purple', color: '#7b1fa2' },
  { value: 'orange', label: 'Orange', color: '#f57c00' },
  { value: 'red', label: 'Red', color: '#d32f2f' },
  { value: 'teal', label: 'Teal', color: '#00796b' },
  { value: 'indigo', label: 'Indigo', color: '#3f51b5' },
  { value: 'pink', label: 'Pink', color: '#e91e63' },
  { value: 'deepPurple', label: 'Deep Purple', color: '#673ab7' },
  { value: 'cyan', label: 'Cyan', color: '#00bcd4' }
];

// Font family options
const fontFamilyOptions = [
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'OpenSans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' }
];

// Animation speed options
const animationSpeedOptions = [
  { value: 'none', label: 'No Animations' },
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' }
];

// Density options
const densityOptions = [
  { value: 'comfortable', label: 'Comfortable (Spacious)' },
  { value: 'standard', label: 'Standard' },
  { value: 'compact', label: 'Compact (Dense)' }
];

// Default theme preferences
const defaultThemePreferences: ThemePreferences = {
  mode: 'system',
  primaryColor: 'blue',
  fontSize: 16,
  fontFamily: 'Roboto',
  reducedMotion: false,
  highContrast: false,
  density: 'standard',
  animationSpeed: 'normal'
};

const AppearanceSettings: React.FC = () => {
  const { themePreferences, updateThemePreferences, resetThemePreferences } = useTheme();
  const muiTheme = useMuiTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Settings saved successfully!');
  const [previewTab, setPreviewTab] = useState(0);

  // Reusable paper style for consistent appearance in both light and dark modes
  const paperStyle = {
    p: 3,
    borderRadius: 2,
    bgcolor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'background.paper'
  };

  // Local state for theme preferences (to avoid immediate application while editing)
  const [localPreferences, setLocalPreferences] = useState<ThemePreferences>({...themePreferences});

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPreferences({
      ...localPreferences,
      mode: event.target.value as 'light' | 'dark' | 'system'
    });
  };

  const handleFontSizeChange = (_event: Event, newValue: number | number[]) => {
    setLocalPreferences({
      ...localPreferences,
      fontSize: newValue as number
    });
  };

  const handlePrimaryColorChange = (event: SelectChangeEvent) => {
    setLocalPreferences({
      ...localPreferences,
      primaryColor: event.target.value
    });
  };

  const handleFontFamilyChange = (event: SelectChangeEvent) => {
    setLocalPreferences({
      ...localPreferences,
      fontFamily: event.target.value
    });
  };

  const handleDensityChange = (event: SelectChangeEvent) => {
    setLocalPreferences({
      ...localPreferences,
      density: event.target.value as 'comfortable' | 'compact' | 'standard'
    });
  };

  const handleAnimationSpeedChange = (event: SelectChangeEvent) => {
    setLocalPreferences({
      ...localPreferences,
      animationSpeed: event.target.value as 'slow' | 'normal' | 'fast' | 'none'
    });
  };

  const handleSwitchChange = (name: keyof ThemePreferences) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPreferences({
      ...localPreferences,
      [name]: event.target.checked
    });
  };

  const handleSaveSettings = () => {
    updateThemePreferences(localPreferences);
    setSuccessMessage('Settings saved successfully!');
    setShowSuccess(true);
  };

  const handleResetDefaults = () => {
    resetThemePreferences();
    setLocalPreferences({...defaultThemePreferences});
    setSuccessMessage('Settings reset to defaults!');
    setShowSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const handlePreviewTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setPreviewTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Appearance Settings
      </Typography>

      <Paper elevation={0} sx={{
        ...paperStyle,
        mb: 4,
        bgcolor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Palette size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Customize your experience
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Personalize the appearance of the application to suit your preferences.
          Changes will be applied when you click the Save button.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Theme Selection */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Theme
          </Typography>
          <Paper sx={paperStyle}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="theme"
                name="theme"
                value={localPreferences.mode}
                onChange={handleThemeChange}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Sun size={18} style={{ marginRight: '8px' }} />
                      Light Mode
                    </Box>
                  }
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Moon size={18} style={{ marginRight: '8px' }} />
                      Dark Mode
                    </Box>
                  }
                />
                <FormControlLabel
                  value="system"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Monitor size={18} style={{ marginRight: '8px' }} />
                      System Default
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Color Selection */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Primary Color
          </Typography>
          <Paper sx={paperStyle}>
            <FormControl fullWidth>
              <InputLabel id="primary-color-label">Primary Color</InputLabel>
              <Select
                labelId="primary-color-label"
                id="primary-color"
                value={localPreferences.primaryColor}
                label="Primary Color"
                onChange={handlePrimaryColorChange}
              >
                {primaryColorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: option.color,
                          borderRadius: '50%',
                          mr: 1
                        }}
                      />
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', mt: 3, gap: 1, flexWrap: 'wrap' }}>
              {primaryColorOptions.map((option) => (
                <Box
                  key={option.value}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: option.color,
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: localPreferences.primaryColor === option.value ? 'text.primary' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setLocalPreferences({...localPreferences, primaryColor: option.value})}
                >
                  {localPreferences.primaryColor === option.value && (
                    <Check size={20} color="white" />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Font Family */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Font Family
          </Typography>
          <Paper sx={paperStyle}>
            <FormControl fullWidth>
              <InputLabel id="font-family-label">Font Family</InputLabel>
              <Select
                labelId="font-family-label"
                id="font-family"
                value={localPreferences.fontFamily}
                label="Font Family"
                onChange={handleFontFamilyChange}
              >
                {fontFamilyOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      fontFamily: option.value === 'Roboto'
                        ? 'Roboto, sans-serif'
                        : option.value === 'Montserrat'
                          ? 'Montserrat, sans-serif'
                          : option.value === 'OpenSans'
                            ? '"Open Sans", sans-serif'
                            : option.value === 'Lato'
                              ? 'Lato, sans-serif'
                              : 'Poppins, sans-serif'
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Preview:</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: localPreferences.fontFamily === 'Roboto'
                    ? 'Roboto, sans-serif'
                    : localPreferences.fontFamily === 'Montserrat'
                      ? 'Montserrat, sans-serif'
                      : localPreferences.fontFamily === 'OpenSans'
                        ? '"Open Sans", sans-serif'
                        : localPreferences.fontFamily === 'Lato'
                          ? 'Lato, sans-serif'
                          : 'Poppins, sans-serif'
                }}
              >
                This is how your text will look with the {localPreferences.fontFamily} font.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Font Size */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Font Size
          </Typography>
          <Paper sx={paperStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Type size={18} style={{ marginRight: '8px' }} />
              <Typography variant="body1">
                Adjust text size: {localPreferences.fontSize}px
              </Typography>
            </Box>
            <Slider
              value={localPreferences.fontSize}
              onChange={handleFontSizeChange}
              aria-labelledby="font-size-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={12}
              max={20}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Smaller
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Larger
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Preview:</Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: localPreferences.fontSize }}
              >
                This is how your text will look at {localPreferences.fontSize}px size.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Layout Density */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Layout Density
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Layout size={18} style={{ marginRight: '8px' }} />
              <Typography variant="body1">
                Adjust spacing between elements
              </Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel id="density-label">Layout Density</InputLabel>
              <Select
                labelId="density-label"
                id="density"
                value={localPreferences.density}
                label="Layout Density"
                onChange={handleDensityChange}
              >
                {densityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Animation Speed */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Animation Speed
          </Typography>
          <Paper sx={paperStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Zap size={18} style={{ marginRight: '8px' }} />
              <Typography variant="body1">
                Control animation speed
              </Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel id="animation-speed-label">Animation Speed</InputLabel>
              <Select
                labelId="animation-speed-label"
                id="animation-speed"
                value={localPreferences.animationSpeed}
                label="Animation Speed"
                onChange={handleAnimationSpeedChange}
              >
                {animationSpeedOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Accessibility */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Accessibility
          </Typography>
          <Paper sx={paperStyle}>
            <FormControlLabel
              control={
                <Switch
                  checked={localPreferences.reducedMotion}
                  onChange={handleSwitchChange('reducedMotion')}
                  name="reducedMotion"
                  color="primary"
                />
              }
              label="Reduce motion (minimize animations)"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              Reduces or eliminates motion effects to prevent discomfort
            </Typography>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={localPreferences.highContrast}
                  onChange={handleSwitchChange('highContrast')}
                  name="highContrast"
                  color="primary"
                />
              }
              label="High contrast mode"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Increases contrast between text and background for better readability
            </Typography>
          </Paper>
        </Grid>

        {/* Preview */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
            Preview
          </Typography>
          <Paper sx={paperStyle}>
            <Tabs
              value={previewTab}
              onChange={handlePreviewTabChange}
              sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Card" icon={<Palette size={16} />} iconPosition="start" />
              <Tab label="Text" icon={<BookOpen size={16} />} iconPosition="start" />
              <Tab label="Button" icon={<Layout size={16} />} iconPosition="start" />
            </Tabs>

            {previewTab === 0 && (
              <Card
                sx={{
                  maxWidth: 300,
                  mx: 'auto',
                  fontFamily: localPreferences.fontFamily === 'Roboto'
                    ? 'Roboto, sans-serif'
                    : localPreferences.fontFamily === 'Montserrat'
                      ? 'Montserrat, sans-serif'
                      : localPreferences.fontFamily === 'OpenSans'
                        ? '"Open Sans", sans-serif'
                        : localPreferences.fontFamily === 'Lato'
                          ? 'Lato, sans-serif'
                          : 'Poppins, sans-serif'
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: localPreferences.fontSize + 2,
                      mb: 1,
                      fontFamily: 'inherit'
                    }}
                  >
                    Card Preview
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: localPreferences.fontSize - 2,
                      fontFamily: 'inherit'
                    }}
                  >
                    This is how cards will appear with your selected theme settings.
                  </Typography>
                </CardContent>
              </Card>
            )}

            {previewTab === 1 && (
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontFamily: localPreferences.fontFamily === 'Roboto'
                      ? 'Montserrat, sans-serif'
                      : localPreferences.fontFamily === 'Montserrat'
                        ? 'Montserrat, sans-serif'
                        : localPreferences.fontFamily === 'OpenSans'
                          ? '"Open Sans", sans-serif'
                          : localPreferences.fontFamily === 'Lato'
                            ? 'Lato, sans-serif'
                            : 'Poppins, sans-serif'
                  }}
                >
                  Heading Text
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontSize: localPreferences.fontSize,
                    fontFamily: localPreferences.fontFamily === 'Roboto'
                      ? 'Roboto, sans-serif'
                      : localPreferences.fontFamily === 'Montserrat'
                        ? 'Montserrat, sans-serif'
                        : localPreferences.fontFamily === 'OpenSans'
                          ? '"Open Sans", sans-serif'
                          : localPreferences.fontFamily === 'Lato'
                            ? 'Lato, sans-serif'
                            : 'Poppins, sans-serif'
                  }}
                >
                  This is how your body text will appear with the selected font family and size settings.
                  The text should be easy to read and comfortable for extended reading sessions.
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: localPreferences.fontSize - 2,
                    fontFamily: localPreferences.fontFamily === 'Roboto'
                      ? 'Roboto, sans-serif'
                      : localPreferences.fontFamily === 'Montserrat'
                        ? 'Montserrat, sans-serif'
                        : localPreferences.fontFamily === 'OpenSans'
                          ? '"Open Sans", sans-serif'
                          : localPreferences.fontFamily === 'Lato'
                            ? 'Lato, sans-serif'
                            : 'Poppins, sans-serif'
                  }}
                >
                  Secondary text appears in a lighter color and slightly smaller size.
                </Typography>
              </Box>
            )}

            {previewTab === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Button variant="contained" color="primary">
                  Primary Button
                </Button>
                <Button variant="outlined" color="primary">
                  Outlined Button
                </Button>
                <Button variant="text" color="primary">
                  Text Button
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RotateCcw size={18} />}
          onClick={handleResetDefaults}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSaveSettings}
          color="primary"
        >
          Save Changes
        </Button>
      </Box>

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

export default AppearanceSettings;
