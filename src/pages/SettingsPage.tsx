import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Fade
} from '@mui/material';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Lock,
  Key,
  FileText,
  Leaf,
  BookOpen,
  ShoppingBag,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AccountSettings from '../components/settings/AccountSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import FishingLicenseSettings from '../components/settings/FishingLicenseSettings';
import ConservationSettings from '../components/settings/ConservationSettings';
import RegulationsSettings from '../components/settings/RegulationsSettings';
import GearSettings from '../components/settings/GearSettings';
import EventsSettings from '../components/settings/EventsSettings';

// Define the settings sections
const settingsSections = [
  { id: 'account', label: 'Account', icon: <User size={20} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'privacy', label: 'Privacy', icon: <Shield size={20} /> },
  { id: 'security', label: 'Security', icon: <Key size={20} /> },
  { id: 'license', label: 'Fishing License', icon: <FileText size={20} /> },
  { id: 'conservation', label: 'Conservation', icon: <Leaf size={20} /> },
  { id: 'regulations', label: 'Regulations', icon: <BookOpen size={20} /> },
  { id: 'gear', label: 'Gear', icon: <ShoppingBag size={20} /> },
  { id: 'events', label: 'Events Calendar', icon: <Calendar size={20} /> },
];

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [pageLoading, setPageLoading] = useState(true);
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveSection(newValue);
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings user={user} />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'security':
        return <SecuritySettings />;
      case 'license':
        return <FishingLicenseSettings />;
      case 'conservation':
        return <ConservationSettings />;
      case 'regulations':
        return <RegulationsSettings />;
      case 'gear':
        return <GearSettings />;
      case 'events':
        return <EventsSettings />;
      default:
        return <AccountSettings user={user} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Settings
      </Typography>

      <Fade in={!pageLoading} timeout={800}>
        <Box>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: '70vh'
            }}
          >
            {/* Settings Navigation */}
            <Box
              sx={{
                width: { xs: '100%', md: 240 },
                borderRight: { md: `1px solid ${theme.palette.divider}` },
                bgcolor: {
                  md: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)'
                }
              }}
            >
              {isMobile ? (
                // Mobile: Horizontal tabs
                <Tabs
                  value={activeSection}
                  onChange={handleSectionChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .MuiTab-root': {
                      minWidth: 'auto',
                      py: 2,
                    },
                    '& .Mui-selected': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: theme.palette.primary.main,
                    }
                  }}
                >
                  {settingsSections.map((section) => (
                    <Tab
                      key={section.id}
                      value={section.id}
                      label={section.label}
                      icon={section.icon}
                      iconPosition="start"
                    />
                  ))}
                </Tabs>
              ) : (
                // Desktop: Vertical list
                <List sx={{ py: 0 }}>
                  {settingsSections.map((section) => (
                    <React.Fragment key={section.id}>
                      <ListItemButton
                        selected={activeSection === section.id}
                        onClick={() => setActiveSection(section.id)}
                        sx={{
                          py: 2,
                          '&.Mui-selected': {
                            bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                            color: 'primary.contrastText',
                            '&:hover': {
                              bgcolor: 'primary.main',
                            },
                            '& .MuiListItemIcon-root': {
                              color: 'primary.contrastText',
                            }
                          },
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {section.icon}
                        </ListItemIcon>
                        <ListItemText primary={section.label} />
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>

            {/* Settings Content */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
              {renderSettingsContent()}
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Loading Skeleton */}
      {pageLoading && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ width: { xs: '100%', md: 240 } }}>
            <LoadingSkeleton type="list" height={400} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <LoadingSkeleton type="form" />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default SettingsPage;
