import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching my orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, navigate]);

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading Orders...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h2>No Orders Found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>You haven't placed any orders yet.</p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Go to Shop</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {orders.map(order => (
            <div key={order._id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>Order #{order._id.substring(order._id.length - 8)}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 'bold',
                    backgroundColor: order.status === 'Placed' ? '#fef3c7' : order.status === 'Processing' ? '#e0f2fe' : '#dcfce3',
                    color: order.status === 'Placed' ? '#d97706' : order.status === 'Processing' ? '#0284c7' : '#16a34a'
                  }}>
                    {order.status === 'Processing' ? 'We are processing your order! 🐟' : order.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Delivery Address</h4>
                  <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>{order.deliveryAddress}</p>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Phone: {order.customerPhone}</p>
                </div>

                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Items Ordered</h4>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {order.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.2rem' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '1rem', fontSize: '1.25rem' }}>
                    <span>Total Amount</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {(order.status === 'Processing' || order.status === 'Delivered') && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <button onClick={() => window.print()} className="btn btn-outline">
                    🖨️ Download / Print Receipt
                  </button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Your order is officially registered! Keep this receipt for your records.
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
