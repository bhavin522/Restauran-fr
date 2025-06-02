import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const GalleryItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  '&:hover .gallery-overlay': {
    opacity: 1,
  },
  '& img': {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
}));

const GalleryOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  color: theme.palette.primary.main,
}));

const Gallery = () => {
  const galleryItems = [
    { src: '/images/pizza.jpg', title: 'Artisan Pizza' },
    { src: '/images/noodles.jfif', title: 'Asian Noodles' },
    { src: '/images/burger.jfif', title: 'Gourmet Burger' },
    { src: '/images/sushi.jfif', title: 'Fresh Sushi Selection' },
    { src: '/images/fruit.jpg', title: 'Cheese & Fruit Platter' },
    { src: '/images/kulfi.jpg', title: 'Dessert Platter' },
    { src: '/images/choclate.jfif', title: 'Chocolate Truffles' },
    { src: '/images/Breakfast-board28.jpg', title: 'Breakfast Spread' },
    { src: '/images/indianthali.jpeg', title: 'Indian Thali' },
  ];

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', mb: 6, textAlign: 'center' }}
        >
          Our Gallery
        </Typography>
        <Grid container spacing={3}>
          {galleryItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GalleryItem>
                <img src={item.src} alt={item.title} />
                <GalleryOverlay className="gallery-overlay">
                  <Typography variant="h6">{item.title}</Typography>
                </GalleryOverlay>
              </GalleryItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery; 