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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fade,
  Skeleton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, CheckCircle, Fish, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const steps = ['Account Details', 'Personal Information'];

const SignupPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [pageLoading, setPageLoading] = useState(true);

  const { signup, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isVerticalStepper = useMediaQuery(theme.breakpoints.down('md'));

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If already authenticated, redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear any errors when component mounts or unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const validateStep = () => {
    const errors: {[key: string]: string} = {};

    if (activeStep === 0) {
      if (!email) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

      if (!password) errors.password = 'Password is required';
      else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

      if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
      else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    } else if (activeStep === 1) {
      if (!name) errors.name = 'Name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      await signup(name, email, password);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
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
              error={!!formErrors.email}
              helperText={formErrors.email}
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mt: 3, mb: 2 }}>
              <Alert severity="info" icon={<CheckCircle size={20} />}>
                <Typography variant="body2">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </Typography>
              </Alert>
            </Box>
          </>
        );
      default:
        return null;
    }
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
                  backgroundImage: 'url(https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
                  bgcolor: 'rgba(46, 125, 50, 0.85)', // Green overlay
                  zIndex: -1,
                }}
              />
              <Fish size={60} />
              <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
                Join AnglerHub
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, opacity: 0.9 }}>
                Create your account and start your fishing journey
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  "Many men go fishing all of their lives without knowing that it is not fish they are after."
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  — Henry David Thoreau
                </Typography>
              </Box>
            </Box>

            {/* Right side - Signup Form */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                p: { xs: 3, sm: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                {isMobile && <Fish size={28} color={theme.palette.primary.main} style={{ marginRight: '12px' }} />}
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                  Create Account
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {isVerticalStepper ? (
                // Vertical stepper for mobile
                <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        <Box component="form" onSubmit={index === steps.length - 1 ? handleSubmit : undefined}>
                          {renderStepContent(index)}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              startIcon={<ArrowLeft size={18} />}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {index === steps.length - 1 ? (
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <UserPlus size={20} />}
                              >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                endIcon={<ArrowRight size={18} />}
                              >
                                Continue
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                // Horizontal stepper for desktop
                <>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box component="form" onSubmit={activeStep === steps.length - 1 ? handleSubmit : undefined}>
                    {renderStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        startIcon={<ArrowLeft size={18} />}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isLoading}
                          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <UserPlus size={20} />}
                        >
                          {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          endIcon={<ArrowRight size={18} />}
                        >
                          Continue
                        </Button>
                      )}
                    </Box>
                  </Box>
                </>
              )}

              <Divider sx={{ my: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="body2" sx={{ fontWeight: 'bold' }}>
                    Sign In
                  </Link>
                </Typography>
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
              bgcolor: 'rgba(46, 125, 50, 0.1)',
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

            <Box sx={{ my: 4 }}>
              <Skeleton variant="rectangular" width="100%" height={72} animation="wave" sx={{ mb: 2 }} />
            </Box>

            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} animation="wave" sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="rectangular" width="30%" height={40} animation="wave" />
              <Skeleton variant="rectangular" width="30%" height={40} animation="wave" />
            </Box>

            <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mt: 4, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton variant="text" width="60%" height={24} animation="wave" />
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default SignupPage;
