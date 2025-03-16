import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { supabase } from './supabaseClient'; // Importing supabase client
import Alert from './Alert'; // Import the Alert component
import './Update.css'; // Import the CSS file for styling

const UpdatePassword = () => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: undefined,
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate function to redirect

  // Validate Email function directly in this file
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const updateUser = async () => {
    setState((prevState) => ({ ...prevState, error: undefined }));

    // Check if the email is valid
    if (!validateEmail(state.email)) {
      setState((prevState) => ({
        ...prevState,
        error: 'Enter a valid email.',
      }));
      return;
    }

    // Check if the password is entered
    if (!state.password) {
      setState((prevState) => ({
        ...prevState,
        error: 'Enter a password.',
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data, error } = await supabase.auth.updateUser({
        email: state.email,
        password: state.password,
      });

      if (data) {
        setState((prevState) => ({
          ...prevState,
          success: 'Password successfully updated.',
        }));

        // Redirect to the login page after 1.5 seconds to show the success message
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setState((prevState) => ({
          ...prevState,
          error: 'Error occurred while updating user.',
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: 'Error coming from Supabase.',
      }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="update-container">
      <header className="my-6">
        <h1 className="mb-2 text-2xl font-bold">Update your password</h1>
        <p>Update your email or password.</p>
      </header>
      <div className="mx-auto">
        <input
          type="text"
          className="text"
          placeholder="mail@gmail.com"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <input
          type="password"
          className="text"
          placeholder="MyNewPassword12"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>
      {state.error && <Alert text={state.error} className="alert-danger" />}
      {state.success && <Alert text={state.success} className="alert-success" />}
      <div>
        <button
          className="btn btn-primary"
          disabled={state.loading}
          onClick={updateUser}
        >
          {state.loading ? 'Loading' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
