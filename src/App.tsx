import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FishingMapPage from './pages/FishingMapPage';
import FishSpeciesPage from './pages/FishSpeciesPage';
import TechniquesPage from './pages/TechniquesPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import FishSpeciesNotFoundPage from './pages/FishSpeciesNotFoundPage';
import FishingSpotNotFoundPage from './pages/FishingSpotNotFoundPage';
import TechniqueNotFoundPage from './pages/TechniqueNotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserProfilePage from './pages/UserProfilePage';
import SettingsPage from './pages/SettingsPage';
import ThemeTestPage from './pages/ThemeTestPage';
import FishingLicensePage from './pages/FishingLicensePage';
import ConservationPage from './pages/ConservationPage';
import FishingRegulationsPage from './pages/FishingRegulationsPage';
import GearReviewsPage from './pages/GearReviewsPage';
import EventsCalendarPage from './pages/EventsCalendarPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppLoader from './components/AppLoader';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

// Separate component to use the auth context
const AppContent = () => {
  const { isInitializing } = useAuth();

  // Show loading screen while initializing auth
  if (isInitializing) {
    return <AppLoader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Fishing Map Routes */}
          <Route path="/map" element={<FishingMapPage />} />
          <Route path="/map/:id" element={<FishingMapPage />} />
          <Route path="/map/not-found" element={<FishingSpotNotFoundPage />} />

          {/* Fish Species Routes */}
          <Route path="/species" element={<FishSpeciesPage />} />
          <Route path="/species/:id" element={<FishSpeciesPage />} />
          <Route path="/species/not-found" element={<FishSpeciesNotFoundPage />} />

          {/* Techniques Routes */}
          <Route path="/techniques" element={<TechniquesPage />} />
          <Route path="/techniques/:id" element={<TechniquesPage />} />
          <Route path="/techniques/not-found" element={<TechniqueNotFoundPage />} />

          {/* Articles Routes */}
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />

          {/* Fishing License Routes */}
          <Route path="/fishing-licenses" element={<FishingLicensePage />} />

          {/* Conservation Routes */}
          <Route path="/conservation" element={<ConservationPage />} />

          {/* Fishing Regulations Routes */}
          <Route path="/fishing-regulations" element={<FishingRegulationsPage />} />

          {/* Gear Reviews Routes */}
          <Route path="/gear-reviews" element={<GearReviewsPage />} />
          <Route path="/gear-reviews/:id" element={<GearReviewsPage />} />

          {/* Events Calendar Routes */}
          <Route path="/events" element={<EventsCalendarPage />} />
          <Route path="/events/:id" element={<EventsCalendarPage />} />

          {/* Theme Test Route */}
          <Route path="/theme-test" element={<ThemeTestPage />} />

          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;