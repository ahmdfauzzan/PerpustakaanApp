import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Member";
import Books from "./pages/Book";
import Loans from "./pages/Loan";
import Returns from "./pages/Returns";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/books" element={<Books />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/returns" element={<Returns />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
