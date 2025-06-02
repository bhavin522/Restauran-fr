import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(/images/4789379-removebg-preview.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
}));

const FoodGallery = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#000',
}));

const GalleryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '& img': {
    width: '100%',
    height: 'auto',
    borderRadius: theme.spacing(1),
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
}));

const Home = () => {
  const galleryImages = [
    {
      src: '/images/IMG-20250528-WA0026.jpg',
      alt: 'Delicious Dish',
    },
    {
      src: '/images/IMG-20250528-WA0028.jpg',
      alt: 'Gourmet Meal',
    },
    {
      src: '/images/IMG-20250528-WA0030.jpg',
      alt: 'Special Dish',
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Typography variant="h1" component="h1" sx={{ color: 'primary.main', mb: 2 }}>
          SHIV AURICA
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          DISCOVER A NEW LEVEL OF TASTE
        </Typography>
      </HeroSection>

      <FoodGallery container spacing={4}>
        {galleryImages.map((image, index) => (
          <Grid item xs={12} md={4} key={index}>
            <GalleryItem elevation={3}>
              <img src={image.src} alt={image.alt} />
            </GalleryItem>
          </Grid>
        ))}
      </FoodGallery>

      <Footer>
        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
          LEVEL 3 | EAST CENTURY MALL
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          P: (029) 883-8920
        </Typography>
        <Typography variant="body1">
          W: WWW.SILVERKITCHEN.COM
        </Typography>
      </Footer>
    </Box>
  );
};

export default Home; 