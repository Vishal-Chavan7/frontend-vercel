import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import ProjectDetail from './Pages/ProjectDetail';
import Profile from './Pages/Profile';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
