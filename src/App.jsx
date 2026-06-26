import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute"; // Import the security guard

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";

import MyProperties from "./pages/MyProperties";
 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/add-property"
    element={
      <ProtectedRoute>
        <AddProperty />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-properties"
    element={
      <ProtectedRoute>
        <MyProperties />
      </ProtectedRoute>
    }
  />

  <Route path="/property/:id" element={<PropertyDetails />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
