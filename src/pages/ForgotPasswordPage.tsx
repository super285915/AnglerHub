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
  Alert,
  CircularProgress,
  Fade,
  Skeleton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Mail, ArrowLeft, Send, Fish, CheckCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, this would call an API endpoint
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                  backgroundImage: 'url(https://images.pexels.com/photos/1755243/pexels-photo-1755243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
                  bgcolor: 'rgba(0, 0, 0, 0.65)', // Dark overlay
                  zIndex: -1,
                }}
              />
              <Fish size={60} />
              <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
                Password Recovery
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, opacity: 0.9 }}>
                We'll help you get back to your fishing adventures
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

            {/* Right side - Form */}
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
                  Forgot Password
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {isSubmitted ? (
                <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CheckCircle size={60} color={theme.palette.success.main} style={{ marginBottom: '24px' }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Check Your Email
                  </Typography>
                  <Alert severity="success" sx={{ mb: 3, width: '100%' }}>
                    If an account exists with the email <strong>{email}</strong>, you will receive password reset instructions.
                  </Alert>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                    Please check your inbox and follow the instructions to reset your password.
                    If you don't see the email, check your spam folder.
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    startIcon={<ArrowLeft size={20} />}
                    sx={{ mt: 2 }}
                  >
                    Back to Login
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Enter your email address and we'll send you a link to reset your password.
                  </Typography>

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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send size={20} />}
                      sx={{
                        mt: 3,
                        mb: 3,
                        py: 1.5,
                        fontWeight: 'bold',
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                        OR
                      </Typography>
                    </Divider>

                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        component={RouterLink}
                        to="/login"
                        variant="text"
                        startIcon={<ArrowLeft size={18} />}
                      >
                        Back to Login
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Loading Skeleton */}
      {pageLoading && (
        <LoadingSkeleton type="form" />
      )}
    </Container>
  );
};

export default ForgotPasswordPage;
