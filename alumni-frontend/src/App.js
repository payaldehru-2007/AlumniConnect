import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageAlumni from './pages/ManageAlumni';
import EditAlumni from './pages/EditAlumni';
import ManageStudents from './pages/ManageStudents';
import StudentLogin from './pages/StudentLogin';
import AlumniProfile from './pages/AlumniProfile';
import AlumniDashboard from './pages/AlumniDashboard';
import MyProfile from './pages/MyProfile';
import BrowseAlumni from './pages/BrowseAlumni';
import DeepSearch from './pages/DeepSearch';
import StudentSignup from './pages/StudentSignup';
function App() {
  return (
    <Router>
      <Routes>
        {/* Common */}
        <Route path="/" element={<StudentLogin />} />
<Route path="/signup" element={<StudentSignup />} />
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/alumni" element={<ManageAlumni />} />
        <Route path="/admin/alumni/edit/:id" element={<EditAlumni />} />
       <Route path="/admin/students" element={<ManageStudents />} />
       <Route path="/admin/search" element={<DeepSearch />} />

        {/* Alumni Routes */}
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/browse-alumni" element={<BrowseAlumni />} />
        <Route path="/alumni-profile/:id" element={<AlumniProfile />} />
        <Route path="/deep-search" element={<DeepSearch />} />
      </Routes>
    </Router>
  );
}

export default App;