import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (!user.isAdmin)) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders', config),
          axios.get('http://localhost:5000/api/products') // Public route is fine, or use config
        ]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token, navigate]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      };
      const { data } = await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);
      setOrders(orders.map(order => order._id === orderId ? data : order));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleUpdateProduct = async (productId, field, value) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      };
      const updateData = { [field]: Number(value) };
      const { data } = await axios.patch(`http://localhost:5000/api/products/${productId}`, updateData, config);
      setProducts(products.map(p => p._id === productId ? data : p));
    } catch (error) {
      console.error('Error updating product', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if(!window.confirm('Are you sure you want to discard this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Error deleting product', error);
      alert('Failed to delete product');
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading Dashboard...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Seller Dashboard</h1>
      
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Orders</h2>
        {orders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No orders placed yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Order ID</th>
                  <th style={{ padding: '1rem' }}>Customer Details</th>
                  <th style={{ padding: '1rem' }}>Items</th>
                  <th style={{ padding: '1rem' }}>Total</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{order._id.substring(order._id.length - 6)}</td>
                    <td style={{ padding: '1rem' }}>
                      <p style={{ fontWeight: '500' }}>{order.customerName}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phone: {order.customerPhone}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>Adr: {order.deliveryAddress}</p>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{order.totalAmount.toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem',
                        backgroundColor: order.status === 'Placed' ? '#fef3c7' : order.status === 'Processing' ? '#e0f2fe' : '#dcfce3',
                        color: order.status === 'Placed' ? '#d97706' : order.status === 'Processing' ? '#0284c7' : '#16a34a'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Product Inventory</h2>
        </div>
        
        {products.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No products in inventory.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Product</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem', width: '150px' }}>Price (₹)</th>
                  <th style={{ padding: '1rem', width: '150px' }}>Stock</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={product.imageUrl} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span style={{ fontWeight: '500' }}>{product.name}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{product.category}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>₹</span>
                        <input 
                          type="number" 
                          defaultValue={product.price}
                          onBlur={(e) => handleUpdateProduct(product._id, 'price', e.target.value)}
                          style={{ width: '80px', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                       <input 
                          type="number" 
                          defaultValue={product.stockQuantity}
                          onBlur={(e) => handleUpdateProduct(product._id, 'stockQuantity', e.target.value)}
                          style={{ width: '80px', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                        />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn"
                        style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                      >
                        Discard
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
