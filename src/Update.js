import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import your Supabase client

const UpdatePassword = () => {
  const location = useLocation(); // Hook to access the current URL
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    
    if (accessToken) {
      console.log('Reset Token:', accessToken); // Check the token in the console
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      return;
    }

    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');

    if (!accessToken) {
      setError('Invalid or expired token');
      return;
    }

    try {
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Password updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
