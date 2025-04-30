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
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating
} from '@mui/material';
import { 
  Save, 
  ShoppingBag, 
  Tag, 
  Trash2, 
  Plus, 
  ChevronDown, 
  Star, 
  Heart, 
  Mail, 
  Percent
} from 'lucide-react';
import { GearPreferences } from '../../types';

// Mock data for gear categories
const gearCategories = [
  'Rods',
  'Reels',
  'Lines',
  'Lures',
  'Flies',
  'Terminal Tackle',
  'Clothing',
  'Accessories',
  'Electronics',
  'Storage',
  'Boats & Kayaks',
  'Tools'
];

// Mock data for gear items by category
const gearItemsByCategory: Record<string, string[]> = {
  'Rods': [
    'Spinning Rod',
    'Baitcasting Rod',
    'Fly Rod',
    'Telescopic Rod',
    'Ice Fishing Rod',
    'Surf Rod'
  ],
  'Reels': [
    'Spinning Reel',
    'Baitcasting Reel',
    'Fly Reel',
    'Conventional Reel',
    'Spincast Reel'
  ],
  'Lines': [
    'Monofilament Line',
    'Fluorocarbon Line',
    'Braided Line',
    'Fly Line',
    'Ice Fishing Line',
    'Wire Line'
  ],
  'Lures': [
    'Crankbaits',
    'Spinnerbaits',
    'Soft Plastics',
    'Topwater Lures',
    'Jigs',
    'Spoons',
    'Swimbaits'
  ],
  'Flies': [
    'Dry Flies',
    'Wet Flies',
    'Nymphs',
    'Streamers',
    'Poppers',
    'Terrestrials'
  ],
  'Terminal Tackle': [
    'Hooks',
    'Sinkers',
    'Swivels',
    'Leaders',
    'Bobbers',
    'Beads'
  ],
  'Clothing': [
    'Waders',
    'Fishing Vest',
    'Rain Gear',
    'Sun Protection',
    'Gloves',
    'Footwear'
  ],
  'Accessories': [
    'Tackle Box',
    'Fishing Pliers',
    'Landing Net',
    'Fish Finder',
    'Scale',
    'Cooler'
  ],
  'Electronics': [
    'Fish Finder',
    'GPS',
    'Sonar',
    'Underwater Camera',
    'Marine Radio'
  ],
  'Storage': [
    'Tackle Box',
    'Rod Holder',
    'Gear Bag',
    'Dry Bag',
    'Cooler'
  ],
  'Boats & Kayaks': [
    'Fishing Kayak',
    'Jon Boat',
    'Bass Boat',
    'Float Tube',
    'Pontoon Boat'
  ],
  'Tools': [
    'Fishing Pliers',
    'Hook Remover',
    'Fillet Knife',
    'Line Cutter',
    'Measuring Tape'
  ]
};

// Mock data for brands
const fishingBrands = [
  'Shimano',
  'Daiwa',
  'Penn',
  'Abu Garcia',
  'St. Croix',
  'G. Loomis',
  'Rapala',
  'Berkley',
  'Orvis',
  'Sage',
  'Costa',
  'Simms',
  'Okuma',
  'Zebco',
  'Pflueger',
  'Fenwick',
  'Minn Kota',
  'Humminbird',
  'Garmin',
  'Columbia',
  'Yeti'
];

const GearSettings: React.FC = () => {
  const [gearPrefs, setGearPrefs] = useState<GearPreferences>({
    ownedGear: [
      {
        category: 'Rods',
        items: ['Spinning Rod', 'Fly Rod']
      },
      {
        category: 'Reels',
        items: ['Spinning Reel', 'Fly Reel']
      },
      {
        category: 'Lures',
        items: ['Crankbaits', 'Soft Plastics', 'Jigs']
      }
    ],
    gearWishlist: ['Baitcasting Rod', 'Fish Finder', 'Fishing Kayak'],
    preferredBrands: ['Shimano', 'St. Croix', 'Rapala'],
    receiveGearReviews: true,
    receiveGearDeals: true
  });
  
  const [newGearCategory, setNewGearCategory] = useState('');
  const [newGearItems, setNewGearItems] = useState<string[]>([]);
  const [newWishlistItem, setNewWishlistItem] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleBrandsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setGearPrefs({
      ...gearPrefs,
      preferredBrands: newValue
    });
  };
  
  const handleSwitchChange = (name: 'receiveGearReviews' | 'receiveGearDeals') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGearPrefs({
      ...gearPrefs,
      [name]: e.target.checked
    });
  };
  
  const handleNewGearCategoryChange = (event: React.SyntheticEvent, newValue: string | null) => {
    setNewGearCategory(newValue || '');
    setNewGearItems([]);
  };
  
  const handleNewGearItemsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setNewGearItems(newValue);
  };
  
  const handleAddGear = () => {
    if (newGearCategory && newGearItems.length > 0) {
      // Check if category already exists
      const existingIndex = gearPrefs.ownedGear.findIndex(
        gear => gear.category === newGearCategory
      );
      
      if (existingIndex >= 0) {
        // Update existing category with new items
        const updatedGear = [...gearPrefs.ownedGear];
        const existingItems = updatedGear[existingIndex].items;
        const newItems = newGearItems.filter(
          item => !existingItems.includes(item)
        );
        
        updatedGear[existingIndex] = {
          ...updatedGear[existingIndex],
          items: [...existingItems, ...newItems]
        };
        
        setGearPrefs({
          ...gearPrefs,
          ownedGear: updatedGear
        });
      } else {
        // Add new category with items
        setGearPrefs({
          ...gearPrefs,
          ownedGear: [
            ...gearPrefs.ownedGear,
            {
              category: newGearCategory,
              items: newGearItems
            }
          ]
        });
      }
      
      // Reset form
      setNewGearCategory('');
      setNewGearItems([]);
    }
  };
  
  const handleRemoveGearCategory = (category: string) => {
    setGearPrefs({
      ...gearPrefs,
      ownedGear: gearPrefs.ownedGear.filter(
        gear => gear.category !== category
      )
    });
  };
  
  const handleRemoveGearItem = (category: string, item: string) => {
    const updatedGear = gearPrefs.ownedGear.map(gear => {
      if (gear.category === category) {
        return {
          ...gear,
          items: gear.items.filter(i => i !== item)
        };
      }
      return gear;
    }).filter(gear => gear.items.length > 0); // Remove category if no items left
    
    setGearPrefs({
      ...gearPrefs,
      ownedGear: updatedGear
    });
  };
  
  const handleAddToWishlist = () => {
    if (newWishlistItem && !gearPrefs.gearWishlist.includes(newWishlistItem)) {
      setGearPrefs({
        ...gearPrefs,
        gearWishlist: [...gearPrefs.gearWishlist, newWishlistItem]
      });
      setNewWishlistItem('');
    }
  };
  
  const handleRemoveFromWishlist = (item: string) => {
    setGearPrefs({
      ...gearPrefs,
      gearWishlist: gearPrefs.gearWishlist.filter(i => i !== item)
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API endpoint to save gear preferences
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
  // Get all gear items for autocomplete
  const allGearItems = Object.values(gearItemsByCategory).flat();
  
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Fishing Gear Settings
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ShoppingBag size={24} style={{ marginRight: '12px' }} />
          <Typography variant="h6">
            Manage Your Fishing Gear
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Keep track of your fishing gear, create a wishlist, and get personalized gear recommendations and deals.
          This helps us tailor content and reviews to match your equipment interests.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Add Gear to Your Collection
            </Typography>
            
            <Autocomplete
              id="gear-category"
              options={gearCategories}
              value={newGearCategory}
              onChange={handleNewGearCategoryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Gear Category"
                  placeholder="Select a category"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            
            <Autocomplete
              multiple
              id="gear-items"
              options={newGearCategory ? gearItemsByCategory[newGearCategory] || [] : []}
              value={newGearItems}
              onChange={handleNewGearItemsChange}
              disabled={!newGearCategory}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Gear Items"
                  placeholder={newGearCategory ? "Select items" : "Select a category first"}
                  fullWidth
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Tag size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
            />
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Plus size={18} />}
                onClick={handleAddGear}
                disabled={!newGearCategory || newGearItems.length === 0}
              >
                Add to Collection
              </Button>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Gear Wishlist
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Autocomplete
                id="wishlist-item"
                options={allGearItems}
                value={newWishlistItem}
                onChange={(event, newValue) => setNewWishlistItem(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Add to Wishlist"
                    placeholder="Select an item"
                    fullWidth
                  />
                )}
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddToWishlist}
                disabled={!newWishlistItem}
                sx={{ alignSelf: 'center' }}
              >
                Add
              </Button>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              {gearPrefs.gearWishlist.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  Your wishlist is empty. Add items you're interested in purchasing.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {gearPrefs.gearWishlist.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      icon={<Heart size={16} />}
                      onDelete={() => handleRemoveFromWishlist(item)}
                      sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Preferred Brands
            </Typography>
            
            <Autocomplete
              multiple
              id="preferred-brands"
              options={fishingBrands}
              value={gearPrefs.preferredBrands}
              onChange={handleBrandsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Favorite Brands"
                  placeholder="Add brands"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    icon={<Star size={16} />}
                    sx={{ '& .MuiChip-icon': { color: 'inherit' } }}
                  />
                ))
              }
            />
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Communication Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={gearPrefs.receiveGearReviews}
                  onChange={handleSwitchChange('receiveGearReviews')}
                  name="receiveGearReviews"
                  color="primary"
                />
              }
              label="Receive gear reviews and recommendations"
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4, mb: 2 }}>
              Get personalized reviews based on your gear collection and interests
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={gearPrefs.receiveGearDeals}
                  onChange={handleSwitchChange('receiveGearDeals')}
                  name="receiveGearDeals"
                  color="primary"
                />
              }
              label="Receive special deals and discounts"
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
              Get notified about sales and promotions for fishing gear
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'medium' }}>
              Your Gear Collection
            </Typography>
            
            {gearPrefs.ownedGear.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                You haven't added any gear to your collection yet. Add some above to track it here.
              </Typography>
            ) : (
              <Box>
                {gearPrefs.ownedGear.map((gearCategory) => (
                  <Accordion key={gearCategory.category} sx={{ mb: 1 }}>
                    <AccordionSummary
                      expandIcon={<ChevronDown size={20} />}
                      aria-controls={`${gearCategory.category}-content`}
                      id={`${gearCategory.category}-header`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                        <Typography variant="subtitle2">{gearCategory.category}</Typography>
                        <Chip 
                          label={`${gearCategory.items.length} items`} 
                          size="small" 
                          sx={{ ml: 2 }} 
                        />
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveGearCategory(gearCategory.category);
                          }}
                          sx={{ ml: 'auto' }}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {gearCategory.items.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            onDelete={() => handleRemoveGearItem(gearCategory.category, item)}
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
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
          Save Gear Preferences
        </Button>
      </Box>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Fishing gear preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GearSettings;
