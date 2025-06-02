import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getMenuItems, createOrder } from '../utils/api';

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    address: '',
    phone: '',
    specialInstructions: '',
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await getMenuItems();
      setMenuItems(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch menu items');
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleOrderSubmit = async () => {
    if (!isAuthenticated) {
      setError('Please login to place an order');
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: item.quantity,
        })),
        ...orderDetails,
      };
      await createOrder(orderData);
      setCart([]);
      setOrderDialog(false);
      setOrderDetails({ address: '', phone: '', specialInstructions: '' });
    } catch (err) {
      setError('Failed to place order');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#000',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'primary.main', mb: 6, textAlign: 'center' }}
        >
          Order Online
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
              Menu Items
            </Typography>
            <Grid container spacing={3}>
              {menuItems.map((item) => (
                <Grid item xs={12} sm={6} key={item._id}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {item.description}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                        ₹{item.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#fff', position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
                  Your Cart
                </Typography>
                {cart.length === 0 ? (
                  <Typography>Your cart is empty</Typography>
                ) : (
                  <>
                    {cart.map((item) => (
                      <Box key={item._id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            size="small"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Typography>{item.quantity}</Typography>
                          <Button
                            size="small"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Typography sx={{ flexGrow: 1 }}>
                            ₹{item.price * item.quantity}
                          </Typography>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ))}
                    <Typography variant="h6" sx={{ mt: 3, color: 'primary.main' }}>
                      Total: ₹{calculateTotal()}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => setOrderDialog(true)}
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? 'Place Order' : 'Login to Order'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={orderDialog} onClose={() => setOrderDialog(false)}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Delivery Address"
              value={orderDetails.address}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, address: e.target.value })
              }
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={orderDetails.phone}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, phone: e.target.value })
              }
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Special Instructions"
              value={orderDetails.specialInstructions}
              onChange={(e) =>
                setOrderDetails({
                  ...orderDetails,
                  specialInstructions: e.target.value,
                })
              }
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOrderDialog(false)}>Cancel</Button>
            <Button onClick={handleOrderSubmit} variant="contained" color="primary">
              Confirm Order
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Order; 