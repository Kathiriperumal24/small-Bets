import React, { useState } from 'react';
import { useAuth } from './useAuth'; 
import { supabase } from './supabaseClient'; 
import Alert from './Alert'; 
import { useNavigate } from 'react-router-dom';
import "./Recover.css"; 

const PasswordRecovery = () => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: undefined,  // Ensure that 'error' is used correctly
    email: '',
  });

  const { validateEmail } = useAuth(); 
  const navigate = useNavigate(); 

  const recoverPassword = async () => {
    setState((prevState) => ({ ...prevState, error: undefined }));

    // Validate the email
    if (!validateEmail(state.email)) {
      setState((prevState) => ({
        ...prevState,
        error: 'Enter a valid email.',
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      
      // Call Supabase to send the reset password email
      const { data, error } = await supabase.auth.resetPasswordForEmail(state.email);

      if (data) {
        // Show success message and inform the user to check email
        setState((prevState) => ({
          ...prevState,
          success: 'Check your email to update your password.',
        }));

        // Optionally, navigate to an update page or other route if needed
        // navigate('/update');  // Uncomment this if you want to redirect after success
      }
      
      if (error) {
        // Handle error if needed
        setState((prevState) => ({
          ...prevState,
          error: error.message || 'An error occurred, please try again.',
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
    <div className="recover-container">
      <header className="my-6">
        <h1>Recover your password</h1>
        <p>You&apos;ll receive an email to recover your password.</p>
      </header>
      <div className="mx-auto">
        <input
          type="email"
          placeholder="mail@gmail.com"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>
      {state.error && <Alert text={state.error} className="alert-danger" />}
      {state.success && <Alert text={state.success} className="alert-success" />}
      <div>
        <button
          className="btn btn-primary"
          disabled={state.loading}
          onClick={recoverPassword}
        >
          {state.loading ? 'Loading' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default PasswordRecovery;
