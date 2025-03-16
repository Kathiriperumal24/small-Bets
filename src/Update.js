import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { supabase } from './supabaseClient'; 
import Alert from './Alert'; 
import './Update.css'; 

const UpdatePassword = () => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: undefined,
    email: '',
    password: '',
  });
  
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const updateUser = async () => {
    setState((prevState) => ({ ...prevState, error: undefined }));

    const { email, password } = state; 

    if (!validateEmail(email)) {
      setState((prevState) => ({
        ...prevState,
        error: 'Enter a valid email.',
      }));
      return;
    }

    if (!password) {
      setState((prevState) => ({
        ...prevState,
        error: 'Enter a password.',
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (data) {
        setState((prevState) => ({
          ...prevState,
          success: 'Password successfully updated.',
        }));

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
