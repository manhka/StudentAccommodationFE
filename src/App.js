import React, { useState } from "react";
import AuthPage from "./pages/Auth/AuthPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const [user, setUser] = useState(null); // null | { role: 'admin', name: 'Admin User' }

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user && user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <AuthPage onLogin={handleLogin} />;
}

export default App;
