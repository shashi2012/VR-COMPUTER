import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import the gatekeeper

// Page Components
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import WhyUsPage from "./pages/WhyUsPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RepairDetails from "./pages/RepairDetails.jsx";
import CreateRepair from "./pages/CreateRepair.jsx";
import AdminNotifications from "./pages/AdminNotifications.jsx";

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1,
      staleTime: 1000 * 60 * 5, // Cache for 5 mins
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="grow">
          <Routes>
            {/* Public Routes */}
            {/* Keeping / as AboutPage for VR COMPUTER landing */}
            <Route path="/" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />

            {/* Protected Routes (Wrapped in ProtectedRoute component) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/repair/:id" 
              element={
                <ProtectedRoute>
                  <RepairDetails />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/create-repair" 
              element={
                <ProtectedRoute>
                  <CreateRepair />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* Admin Specific Notifications */}
            <Route 
              path="/admin/notifications" 
              element={
                <ProtectedRoute>
                  <AdminNotifications />
                </ProtectedRoute>
              } 
            />

            {/* Fallback for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    </QueryClientProvider>
  );
}

export default App;