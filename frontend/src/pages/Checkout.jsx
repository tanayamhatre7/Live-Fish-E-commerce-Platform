import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user ? user.name : '',
    customerPhone: '',
    deliveryAddress: ''
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      };

      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        deliveryAddress: formData.deliveryAddress,
        items: cartItems,
        totalAmount: cartTotal
      };

      await api.post('/orders', orderData, config);
      clearCart();
      alert('Order placed successfully! We will contact you soon.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Note: If you are not logged in, the current backend requires authentication to place order. Let us assume visitor can place without auth if we modified backend, but currently it needs token. Please login first.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
            <input 
              type="text" 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
            <input 
              type="tel" 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Delivery Address</label>
            <textarea 
              required 
              rows="3"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', resize: 'vertical' }}
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
            ></textarea>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total to pay: ₹{cartTotal.toFixed(2)}</span>
            <button type="submit" className="btn btn-primary" disabled={placingOrder} style={{ padding: '0.75rem 2rem' }}>
              {placingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
