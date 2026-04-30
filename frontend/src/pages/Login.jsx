import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    const success = await login(email);
    setLoading(false);
    
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="login-container animate-fade-in">
        <div className="text-center mb-8">
          <h2>Welcome Back</h2>
          <p className="text-muted">Enter your email to sign in or create an account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <label htmlFor="email" className="text-muted">Email Address</label>
            <input 
              type="email" 
              id="email"
              className="input" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary mt-4" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            <LogIn size={20} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-8 text-muted" style={{ fontSize: '0.875rem' }}>
          <p>Demo accounts available:</p>
          <p className="mt-2" style={{ color: 'var(--primary)' }}>demo@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
