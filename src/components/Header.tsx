import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import { Menu as MenuIcon, Fish, X, LogIn, UserPlus, User, Settings, LogOut, Bell, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Main navigation items
const pages = [
  { title: 'Home', path: '/' },
  { title: 'Fishing Map', path: '/map' },
  { title: 'Fish Species', path: '/species' },
  { title: 'Techniques', path: '/techniques' },
  { title: 'Articles', path: '/articles' },
  { title: 'Licenses', path: '/fishing-licenses' },
  { title: 'Conservation', path: '/conservation' },
  { title: 'Regulations', path: '/fishing-regulations' },
  { title: 'Gear Reviews', path: '/gear-reviews' },
  { title: 'Events', path: '/events' },
];

// Compact version of navigation for desktop
const compactPages = [
  { title: 'Home', path: '/' },
  { title: 'Fishing Map', path: '/map', short: 'Map' },
  { title: 'Fish Species', path: '/species', short: 'Species' },
  { title: 'Techniques', path: '/techniques' },
  { title: 'Articles', path: '/articles' },
  { title: 'Licenses', path: '/fishing-licenses' },
  { title: 'Conservation', path: '/conservation' },
  { title: 'Regulations', path: '/fishing-regulations', short: 'Regulations' },
  { title: 'Gear Reviews', path: '/gear-reviews', short: 'Gear' },
  { title: 'Events', path: '/events' },
];

const settings = [
  { title: 'Profile', icon: <User size={18} />, path: '/profile' },
  { title: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  { title: 'Logout', icon: <LogOut size={18} />, action: 'logout' }
];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useMuiTheme();
  const { themePreferences, updateThemePreferences } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    updateThemePreferences({
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    });
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: typeof settings[0]) => {
    handleCloseUserMenu();

    if (setting.action === 'logout') {
      logout();
      navigate('/login');
    } else if (setting.path) {
      navigate(setting.path);
    }
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
        color: 'text.primary',
        height: '100%'
      }}
      role="presentation"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          AnglerHub
        </Typography>
        <IconButton onClick={toggleDrawer} color="inherit">
          <X size={24} />
        </IconButton>
      </Box>

      {isAuthenticated && user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              border: '2px solid',
              borderColor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
            }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider />

      <List>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton
              component={Link}
              to={page.path}
              onClick={toggleDrawer}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(25, 118, 210, 0.08)',
                },
              }}
            >
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {isAuthenticated ? (
        <List>
          {settings.map((setting) => (
            <ListItem key={setting.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  toggleDrawer();
                  handleMenuItemClick(setting);
                }}
                sx={{
                  py: 1.5,
                  color: setting.action === 'logout' ? 'error.main' : 'inherit',
                  '&:hover': {
                    backgroundColor: setting.action === 'logout'
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(211, 47, 47, 0.15)'
                        : 'rgba(211, 47, 47, 0.04)'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(25, 118, 210, 0.08)',
                  },
                }}
              >
                <Box sx={{ mr: 2 }}>
                  {setting.icon}
                </Box>
                <ListItemText primary={setting.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            component={Link}
            to="/login"
            variant="outlined"
            startIcon={<LogIn size={18} />}
            onClick={toggleDrawer}
            sx={{ mb: 1 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/signup"
            variant="contained"
            startIcon={<UserPlus size={18} />}
            onClick={toggleDrawer}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)',
        color: theme.palette.mode === 'dark' ? 'white' : 'primary.main',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.5)'
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.05)'
      }}>
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ minHeight: '60px', py: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0061ff, #60efff)'
                : 'linear-gradient(135deg, #0061ff, #60efff)',
              p: '6px',
              borderRadius: '8px',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 10px rgba(0, 97, 255, 0.3)'
                : '0 2px 10px rgba(0, 97, 255, 0.2)',
            }}
          >
            <Fish
              size={20}
              color="#ffffff"
            />
            <Typography
              variant="subtitle1"
              noWrap
              component={Link}
              to="/"
              sx={{
                ml: 0.5,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              ANG
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer}
                  color="inherit"
                >
                  <MenuIcon size={24} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 2,
                  flexGrow: 1,
                  background: 'linear-gradient(135deg, #0061ff, #60efff)',
                  p: '6px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 97, 255, 0.2)',
                  width: 'fit-content'
                }}
              >
                <Fish size={18} color="#ffffff" />
                <Typography
                  variant="subtitle1"
                  noWrap
                  component={Link}
                  to="/"
                  sx={{
                    ml: 0.5,
                    display: { xs: 'flex', md: 'none' },
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.05rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  ANG
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {compactPages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  size="small"
                  sx={{
                    my: 1.5,
                    mx: 0.5,
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.85rem',
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'text.primary',
                    display: 'block',
                    fontWeight: 600,
                    position: 'relative',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                      zIndex: 0,
                    },
                    '&:hover': {
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 97, 255, 0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 97, 255, 0.1)',
                      '&::before': {
                        transform: 'translateX(100%)',
                      },
                    },
                    ...(window.location.pathname === page.path && {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 97, 255, 0.2)'
                        : 'rgba(0, 97, 255, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 97, 255, 0.1)',
                    }),
                  }}
                >
                  {page.short || page.title}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* Theme Toggle Button */}
            <Tooltip title={theme.palette.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  mr: 1,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderRadius: '12px',
                  p: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }
                }}
                color="inherit"
                aria-label="toggle dark mode"
              >
                {theme.palette.mode === 'dark'
                  ? <Sun size={20} color="#FFD700" />
                  : <Moon size={20} color="#5C7CFA" />}
              </IconButton>
            </Tooltip>

            {isAuthenticated ? (
              <>
                <Tooltip title="Notifications">
                  <IconButton sx={{ mr: 2 }}>
                    <Badge badgeContent={3} color="error">
                      <Bell size={20} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name || 'User'}
                      src={user?.avatar || undefined}
                      sx={{
                        width: 40,
                        height: 40,
                        border: '2px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                      bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                        : '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={() => handleMenuItemClick(setting)}
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: setting.action === 'logout'
                            ? theme.palette.mode === 'dark'
                              ? 'rgba(211, 47, 47, 0.15)'
                              : 'rgba(211, 47, 47, 0.04)'
                            : theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.08)'
                              : 'rgba(25, 118, 210, 0.04)',
                        }
                      }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: setting.action === 'logout' ? 'error.main' : 'inherit'
                      }}>
                        {setting.icon}
                        <Typography sx={{ ml: 1 }}>{setting.title}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  startIcon={<LogIn size={18} />}
                  sx={{
                    mr: 1,
                    borderRadius: '10px',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : theme.palette.primary.main,
                    color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 97, 255, 0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 97, 255, 0.1)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  startIcon={<UserPlus size={18} />}
                  sx={{
                    borderRadius: '10px',
                    background: 'linear-gradient(45deg, #0061ff 30%, #60efff 90%)',
                    boxShadow: '0 3px 10px rgba(0, 97, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0052d6 30%, #40cfff 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 15px rgba(0, 97, 255, 0.3)',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;