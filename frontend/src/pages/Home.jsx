import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            Fresh from water to your door.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Premium live fishes like Tilapia and Pomphret, high-quality dried seafood, and trusted fish food. 
            24/7 monitored environment ensures the healthiest catch.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Explore Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Why Choose Us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌊</div>
            <h3>24/7 Monitoring</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Our live fish center is constantly monitored to ensure optimal water quality and fish health.</p>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h3>Trusted Food</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>We only feed our fishes highly recommended, nutrient-rich food for better growth and taste.</p>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦐</div>
            <h3>Premium Dry Fish</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Sun-dried traditionally to preserve maximum flavor for your favorite recipes.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
