import { useState } from "react";
import Alert from "./Alert"; // assuming you have this component in your React setup
import { useAuth } from "./useAuth"; // assuming the composable exists in your React project
import { supabase } from "./supabaseClient";
import "./Update.css";

const UpdatePassword = () => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: undefined,
    email: "",
    password: "",
  });

  const { validateEmail } = useAuth();

  const updateUser = async () => {
    setState((prevState) => ({ ...prevState, error: undefined }));
    
    if (!validateEmail(state.email)) {
      setState((prevState) => ({ ...prevState, error: "Enter a valid email." }));
      return;
    }

    if (!state.password) {
      setState((prevState) => ({ ...prevState, error: "Enter a password." }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      
      const { data } = await supabase.auth.updateUser({
        email: state.email,
        password: state.password,
      });

      if (data) {
        setState((prevState) => ({
          ...prevState,
          success: "Successfully updated.",
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: "Error coming from Supabase.",
      }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="container mx-auto text-center w-96">
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
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, email: e.target.value }))
          }
        />
        <input
          type="password"
          className="text"
          placeholder="MyNewPassword12"
          value={state.password}
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, password: e.target.value }))
          }
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
          {state.loading ? "Loading" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
