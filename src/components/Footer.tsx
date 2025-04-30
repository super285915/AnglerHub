import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Stack, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, Youtube, Fish, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#263238',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Fish size={24} />
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                ANGLERHUB
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Your complete resource for fishing locations, techniques, equipment reviews, and community features.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Facebook size={20} />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Twitter size={20} />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Instagram size={20} />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Youtube size={20} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Explore
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Home</Link>
              <Link href="/map" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Fishing Map</Link>
              <Link href="/species" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Fish Species</Link>
              <Link href="/techniques" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Techniques</Link>
              <Link href="/articles" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Articles</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/fishing-licenses" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Fishing License Info</Link>
              <Link href="/conservation" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Conservation</Link>
              <Link href="/fishing-regulations" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Fishing Regulations</Link>
              <Link href="/gear-reviews" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Gear Reviews</Link>
              <Link href="/events" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Events Calendar</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Subscribe to get fishing tips, new spot alerts, and exclusive content.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.light' },
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 'auto', borderRadius: 1 }}
              >
                <Mail size={18} />
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} AnglerHub. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>
              Terms of Use
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.7 }}>
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;