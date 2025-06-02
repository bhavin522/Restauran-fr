import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const categories = ['all', 'appetizers', 'main', 'breads', 'desserts'];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu items');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = category === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === category);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', mb: 4, textAlign: 'center' }}
        >
          Our Menu
        </Typography>

        <Tabs
          value={category}
          onChange={handleCategoryChange}
          centered
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              color: '#fff',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          {categories.map((cat) => (
            <Tab
              key={cat}
              value={cat}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
            />
          ))}
        </Tabs>

        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <StyledCard>
                <StyledCardMedia
                  image={item.image}
                  title={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Chip
                    label={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                    color={item.isVegetarian ? 'success' : 'error'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" color="primary.main">
                    ₹{item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Menu; 