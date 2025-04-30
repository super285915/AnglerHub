import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Fade,
  Skeleton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Eye, EyeOff, LogIn, Mail, Lock, Fish } from 'lucide-react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get the return URL from location state or default to home page
  const from = location.state?.from?.pathname || '/';

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If already authenticated, redirect to the return URL
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear any errors when component mounts or unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Fade in={!pageLoading} timeout={800}>
        <Box>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            }}
          >
            {/* Left side - Image */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '40%',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                color: 'white',
                textAlign: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url(https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: -1,
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(25, 118, 210, 0.85)',
                  zIndex: -1,
                }}
              />
              <Fish size={60} />
              <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
                AnglerHub
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, opacity: 0.9 }}>
                Your ultimate fishing companion
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  "The charm of fishing is that it is the pursuit of what is elusive but attainable, a perpetual series of occasions for hope."
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  — John Buchan
                </Typography>
              </Box>
            </Box>

            {/* Right side - Login Form */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                p: { xs: 3, sm: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                {isMobile && <Fish size={28} color={theme.palette.primary.main} style={{ marginRight: '12px' }} />}
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                  Welcome Back
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Sign in to continue to your fishing journey
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color={theme.palette.text.secondary} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color={theme.palette.text.secondary} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* You could add a "Remember me" checkbox here */}
                  </Box>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LogIn size={20} />}
                  sx={{
                    py: 1.5,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Box sx={{ mt: 4, mb: 2 }}>
                  <Divider>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                      OR
                    </Typography>
                  </Divider>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/signup" variant="body2" sx={{ fontWeight: 'bold' }}>
                      Sign Up
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    For demo purposes, use: <strong>demo@example.com / password</strong>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Loading Skeleton */}
      {pageLoading && (
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          }}
        >
          {/* Left side skeleton */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '40%',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
          </Box>

          {/* Right side skeleton */}
          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              p: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Skeleton variant="text" width="60%" height={60} animation="wave" />
            <Skeleton variant="text" width="80%" height={30} animation="wave" sx={{ mb: 4 }} />

            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Skeleton variant="text" width="30%" height={24} animation="wave" />
            </Box>

            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 4 }} />

            <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton variant="text" width="60%" height={24} animation="wave" />
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default LoginPage;
