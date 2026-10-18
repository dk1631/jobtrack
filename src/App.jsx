import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ApplicationDetails from "./pages/ApplicationDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* DEFAULT ROUTE */}
      <Route path="/" element={<Navigate to="/login" replace />}/>

      {/* PUBLIC ROUTES */}

      <Route path="/login" element={<Login />}/>

      <Route path="/register" element={<Register />}/>

      {/* PROTECTED ROUTES */}

      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>

      <Route path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }/>

      <Route path="/applications/add"
        element={
          <ProtectedRoute>
            <AddApplication />
          </ProtectedRoute>
        }/>

      <Route path="/applications/:id"
        element={
          <ProtectedRoute>
            <ApplicationDetails />
          </ProtectedRoute>
        }/>

      <Route path="/applications/:id/edit"
        element={
          <ProtectedRoute>
            <EditApplication />
          </ProtectedRoute>
        }/>

      <Route path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>

      {/* 404 PAGE */}

      <Route path="*" element={<NotFound />}/>

    </Routes>
  );
}

export default App;