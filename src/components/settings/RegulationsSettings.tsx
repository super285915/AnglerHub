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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Save, 
  BookOpen, 
  Bell, 
  MapPin, 
  Fish, 
  Bookmark, 
  Trash2, 
  Plus
} from 'lucide-react';
import { RegulationPreferences } from '../../types';

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

// Mock data for fish species
const fishSpecies = [
  'Rainbow Trout', 'Brown Trout', 'Brook Trout', 'Largemouth Bass', 'Smallmouth Bass',
  'Walleye', 'Northern Pike', 'Muskie', 'Salmon', 'Steelhead', 'Crappie', 'Bluegill',
  'Catfish', 'Carp', 'Striped Bass', 'Redfish', 'Snook', 'Tarpon', 'Flounder', 'Halibut'
];

// Mock data for saved regulations
const initialSavedRegulations = [
  {
    stateId: 'Washington',
    speciesIds: ['Rainbow Trout', 'Salmon', 'Steelhead']
  },
  {
    stateId: 'Oregon',
    speciesIds: ['Salmon', 'Steelhead']
  }
];

const RegulationsSettings: React.FC = () => {
  const [regulationPrefs, setRegulationPrefs] = useState<RegulationPreferences>({
    preferredStates: ['Washington', 'Oregon', 'Idaho'],
    receiveRegulationUpdates: true,
    savedRegulations: initialSavedRegulations
  });
  
  const [newRegulation, setNewRegulation] = useState({
    stateId: '',
    speciesIds: [] as string[]
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleStatesChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setRegulationPrefs({
      ...regulationPrefs,
      preferredStates: newValue
    });
  };
  
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegulationPrefs({
      ...regulationPrefs,
      receiveRegulationUpdates: e.target.checked
    });
  };
  
  const handleNewRegulationStateChange = (event: React.SyntheticEvent, newValue: string | null) => {
    setNewRegulation({
      ...newRegulation,
      stateId: newValue || ''
    });
  };
  
  const handleNewRegulationSpeciesChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setNewRegulation({
      ...newRegulation,
      speciesIds: newValue
    });
  };
  
  const handleAddRegulation = () => {
    if (newRegulation.stateId && newRegulation.speciesIds.length > 0) {
      // Check if state already exists
      const existingIndex = regulationPrefs.savedRegulations.findIndex(
        reg => reg.stateId === newRegulation.stateId
      );
      
      if (existingIndex >= 0) {
        // Update existing state with new species
        const updatedRegulations = [...regulationPrefs.savedRegulations];
        const existingSpecies = updatedRegulations[existingIndex].speciesIds;
        const newSpecies = newRegulation.speciesIds.filter(
          species => !existingSpecies.includes(species)
        );
        
        updatedRegulations[existingIndex] = {
          ...updatedRegulations[existingIndex],
          speciesIds: [...existingSpecies, ...newSpecies]
        };
        
        setRegulationPrefs({
          ...regulationPrefs,
          savedRegulations: updatedRegulations
        });
      } else {
        // Add new state with species
        setRegulationPrefs({
          ...regulationPrefs,
          savedRegulations: [
            ...regulationPrefs.savedRegulations,
            {
              stateId: newRegulation.stateId,
              speciesIds: newRegulation.speciesIds
            }
          ]
        });
      }
      
      // Reset form
      setNewRegulation({
        stateId: '',
        speciesIds: []
      });
    }
  };
  
  const handleRemoveRegulation = (stateId: string) => {
    setRegulationPrefs({
      ...regulationPrefs,
      savedRegulations: regulationPrefs.savedRegulations.filter(
        reg => reg.stateId !== stateId
      )
    });
  };
  
  const handleRemoveSpecies = (stateId: string, speciesId: string) => {
    const updatedRegulations = regulationPrefs.savedRegulations.map(reg => {
      if (reg.stateId === stateId) {
        return {
          ...reg,
          speciesIds: reg.speciesIds.filter(species => species !== speciesId)
        };
      }
      return reg;
    }).filter(reg => reg.speciesIds.length > 0); // Remove state if no species left
    
    setRegulationPrefs({
      ...regulationPrefs,
      savedRegulations: updatedRegulations
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save regulation preferences
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Fishing Regulations Settings
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BookOpen size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Manage Fishing Regulations
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Stay up-to-date with fishing regulations for your preferred states and species.
          Save specific regulations to quickly access them when planning your fishing trips.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Preferred States
            </Typography>
            
            <Autocomplete
              multiple
              id="preferred-states"
              options={states}
              value={regulationPrefs.preferredStates}
              onChange={handleStatesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="States You Fish In"
                  placeholder="Add states"
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
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={regulationPrefs.receiveRegulationUpdates}
                    onChange={handleSwitchChange}
                    name="receiveRegulationUpdates"
                    color="primary"
                  />
                }
                label="Receive regulation updates and alerts"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
                Get notified about changes to fishing regulations in your preferred states
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Add Regulations to Track
            </Typography>
            
            <Autocomplete
              id="new-regulation-state"
              options={states}
              value={newRegulation.stateId}
              onChange={handleNewRegulationStateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select State"
                  placeholder="Choose a state"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            
            <Autocomplete
              multiple
              id="new-regulation-species"
              options={fishSpecies}
              value={newRegulation.speciesIds}
              onChange={handleNewRegulationSpeciesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Species"
                  placeholder="Choose species"
                  fullWidth
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Fish size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
            />
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Plus size={18} />}
                onClick={handleAddRegulation}
                disabled={!newRegulation.stateId || newRegulation.speciesIds.length === 0}
              >
                Add to Saved Regulations
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Saved Regulations
            </Typography>
            
            {regulationPrefs.savedRegulations.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                You haven't saved any regulations yet. Add some above to track them here.
              </Typography>
            ) : (
              <List>
                {regulationPrefs.savedRegulations.map((regulation) => (
                  <React.Fragment key={regulation.stateId}>
                    <ListItem
                      secondaryAction={
                        <Tooltip title="Remove state">
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleRemoveRegulation(regulation.stateId)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <ListItemIcon>
                        <MapPin size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={regulation.stateId}
                        secondary={`Tracking ${regulation.speciesIds.length} species`}
                      />
                    </ListItem>
                    
                    <Box sx={{ ml: 9, mb: 2 }}>
                      {regulation.speciesIds.map((species) => (
                        <Chip
                          key={`${regulation.stateId}-${species}`}
                          label={species}
                          icon={<Fish size={16} />}
                          onDelete={() => handleRemoveSpecies(regulation.stateId, species)}
                          sx={{ mr: 1, mb: 1, '& .MuiChip-icon': { color: 'inherit' } }}
                        />
                      ))}
                    </Box>
                    
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
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
          Save Regulation Preferences
        </Button>
      </Box>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Fishing regulation preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegulationsSettings;
