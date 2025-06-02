import React, { useState } from 'react';
import '../styles/Order.css';

const DELIVERY_CHARGE = 50;
const TAX_RATE = 0.05;

// Organize menu items by category
const menuItems = {
  appetizers: [
    {
      id: 1,
      name: 'Samosa',
      price: 120,
      image: '/images/samosa-7180078_1280.jpg',
      description: 'Crispy pastry filled with spiced potatoes, peas, and aromatic Indian spices'
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      price: 250,
      image: '/images/paneer-7043097_1280.jpg',
      description: 'Marinated cottage cheese cubes grilled with bell peppers and Indian spices'
    },
    {
      id: 3,
      name: 'Dahi Bhalla',
      price: 180,
      image: '/images/Dahi-Vada-H1.webp',
      description: 'Lentil dumplings in yogurt with tangy tamarind chutney'
    },
    {
      id: 4,
      name: 'Pani Puri',
      price: 150,
      image: '/images/panipuri.jfif',
      description: 'Crispy hollow puris filled with spicy mint water and potato mixture'
    }
  ],
  main: [
    {
      id: 5,
      name: 'Paneer Butter Masala',
      price: 380,
      image: '/images/pannerbuttermasala.jpg',
      description: 'Cottage cheese in rich tomato gravy'
    },
    {
      id: 6,
      name: 'Malai Kofta',
      price: 360,
      image: '/images/malai-kofta.webp',
      description: 'Vegetable and cheese dumplings in creamy gravy'
    },
    {
      id: 7,
      name: 'Chole Bhature',
      price: 280,
      image: '/images/chhole.webp',
      description: 'Spiced chickpeas with deep-fried bread'
    },
    {
      id: 8,
      name: 'Veg Biryani',
      price: 320,
      image: '/images/biryani.jpg',
      description: 'Aromatic rice with mixed vegetables and spices'
    }
  ],
  breads: [
    {
      id: 11,
      name: 'Assorted Naan',
      price: 60,
      image: '/images/naan.jpg',
      description: 'Butter, Garlic, or Plain Naan bread baked in tandoor'
    },
    {
      id: 12,
      name: 'Hyderabadi Biryani',
      price: 380,
      image: '/images/biryani.jpg',
      description: 'Fragrant basmati rice cooked with aromatic spices'
    }
  ],
  desserts: [
    {
      id: 15,
      name: 'Gulab Jamun',
      price: 150,
      image: '/images/gulab-jamun.jpg',
      description: 'Soft milk dumplings in sweet rose-flavored syrup'
    },
    {
      id: 16,
      name: 'Rasmalai',
      price: 180,
      image: '/images/Rasmalai.jpg',
      description: 'Soft cottage cheese patties in creamy saffron milk'
    }
  ]
};

const Order = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [cart, setCart] = useState([]);

  const addToCart = (itemId) => {
    const item = Object.values(menuItems)
      .flat()
      .find(item => item.id === itemId);

    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
      updateQuantity(itemId, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return cart.length > 0 ? (calculateSubtotal() + calculateTax() + DELIVERY_CHARGE) : 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('Thank you for your order! Proceeding to payment...');
  };

  // Get current category items or all items if 'all' is selected
  const currentItems = activeCategory === 'all' 
    ? Object.values(menuItems).flat()
    : menuItems[activeCategory] || [];

  return (
    <div className="order-container">
      <div className="menu-section">
        <h2 className="section-title">Order Online</h2>
        
        <div className="category-filter">
          {['appetizers', 'main', 'breads', 'desserts'].map(category => (
            <button 
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {currentItems.map(item => (
            <div key={item.id} className="menu-item">
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt={item.name}
                loading="lazy"
              />
              <div className="menu-item-content">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">₹{item.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(item.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <div className="cart-container">
          <h3>Your Cart <i className="fas fa-shopping-cart"></i></h3>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart-message">Your cart is empty</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <p className="cart-item-price">₹{item.price}</p>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="tax">
              <span>Tax (5%):</span>
              <span className="tax-amount">₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="delivery">
              <span>Delivery:</span>
              <span className="delivery-amount">
                {cart.length > 0 ? `₹${DELIVERY_CHARGE.toFixed(2)}` : '₹0.00'}
              </span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span className="total-amount">₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button 
            className="checkout-btn" 
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order; 