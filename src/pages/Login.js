import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#000',
        minHeight: '100vh',
        py: 8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 4,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: 'primary.main', mb: 4, textAlign: 'center' }}
          >
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
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
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mb: 2 }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
              sx={{ color: 'primary.main' }}
            >
              Register here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 