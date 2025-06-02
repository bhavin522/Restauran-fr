import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const About = () => {
  const chefs = [
    {
      name: 'Chef Rajesh Kumar',
      title: 'Executive Chef',
      image: '/images/rajeshkumar.jfif',
      description: 'With over 20 years of experience in traditional Indian cuisine, Chef Rajesh brings authentic flavors from various regions of India, specializing in tandoor and curry preparations.',
    },
    {
      name: 'Chef Priya Sharma',
      title: 'Dessert Specialist',
      image: '/images/priyaSharma.jfif',
      description: 'A master of Indian sweets and desserts, Chef Priya combines traditional recipes with modern presentations to create memorable dessert experiences.',
    },
    {
      name: 'Chef Amit Patel',
      title: 'Sous Chef',
      image: '/images/amitpatel.jfif',
      description: "Specializing in regional Indian cuisines, Chef Amit brings diverse flavors from across India, from Kerala's coastal cuisine to Punjab's robust flavors.",
    },
  ];

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', mb: 6, textAlign: 'center' }}
        >
          About Us
        </Typography>

        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img
                src="/images/res.webp"
                alt="Restaurant Ambiance"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>
                Our Story
              </Typography>
              <Typography paragraph>
                Founded in 2020, Shiv Aurica emerged from a passion for authentic Indian cuisine. Our journey began with age-old family recipes passed down through generations, combining traditional flavors with modern culinary techniques.
              </Typography>
              <Typography paragraph>
                Today, we pride ourselves on delivering the true essence of Indian hospitality and cuisine. Every dish tells a story of India's rich culinary heritage, prepared with carefully selected spices and ingredients to ensure an authentic dining experience.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h3" sx={{ color: 'primary.main', mb: 4, textAlign: 'center' }}>
          Meet Our Expert Chefs
        </Typography>
        <Grid container spacing={4}>
          {chefs.map((chef, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={chef.image}
                  alt={chef.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ color: 'primary.main', mb: 1 }}>
                    {chef.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#ffd700', mb: 2 }}>
                    {chef.title}
                  </Typography>
                  <Typography variant="body2">
                    {chef.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 