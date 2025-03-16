import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/"); // Redirect to login after logout
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Welcome to the Dashboard</h2>
            <p>You are logged in successfully.</p>
            <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
