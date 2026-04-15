import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', {
        user_name,
        password
      });

      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data.data));

      alert('Login success');
      navigate('/items');
    } catch {
      alert('Login failed');
    }
  };

  return (
      <div className="login-container">

          <div className="login-box">
              <h2>WELCOME</h2>

              <input
                  placeholder="Username"
                  onChange={(e) => setUserName(e.target.value)}
              />

              <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleLogin} className='login-btn'>Login</button>
          </div>

      </div>
  );
}

export default Login;