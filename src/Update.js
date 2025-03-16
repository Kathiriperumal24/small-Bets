import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Your supabase client import
import './Update.css';

const UpdatePasswordPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    // Extract the reset token from the URL
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    
    if (accessToken) {
      // Validate the token (optional) or use it for password reset
      console.log('Reset Token:', accessToken);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      // Extract the token again in case it's lost during re-render
      const urlParams = new URLSearchParams(location.search);
      const accessToken = urlParams.get('access_token');

      if (!accessToken) {
        setError('Invalid reset token');
        return;
      }

      // Reset password with Supabase
      const { error } = await supabase.auth.api
        .updateUser(accessToken, { password });

      if (error) {
        setError(error.message);
      } else {
        alert('Password updated successfully!');
        // Optionally redirect to login page or home
      }
    } catch (error) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
