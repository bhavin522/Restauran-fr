import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { submitContactForm } from '../utils/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', mb: 6, textAlign: 'center' }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>
              <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
                Get in Touch
              </Typography>
              <InfoItem>
                <LocationOnIcon />
                <Typography>Level 3, East Century Mall</Typography>
              </InfoItem>
              <InfoItem>
                <PhoneIcon />
                <Typography>(029) 883-8920</Typography>
              </InfoItem>
              <InfoItem>
                <EmailIcon />
                <Typography>info@silverkitchen.com</Typography>
              </InfoItem>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
                Send us a Message
              </Typography>
              {status.message && (
                <Alert severity={status.type} sx={{ mb: 3 }}>
                  {status.message}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
              Find Us
            </Typography>
            <Box sx={{ height: '450px', width: '100%' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802548850011!2d121.04711661543!3d14.554892182497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzE3LjYiTiAxMjHCsDAyJzQ5LjYiRQ!5e0!3m2!1sen!2sph!4v1635134567890!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Restaurant Location"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 