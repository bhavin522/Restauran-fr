// src/App.js
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Menu = lazy(() => import("./components/Menu"));
const About = lazy(() => import("./components/About"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const Order = lazy(() => import("./components/Order"));
const Login = lazy(() => import("./components/Login"));

// Loading component
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "#ffd700",
      fontSize: "18px",
    }}
  >
    Loading...
  </div>
);

// Main content component for the home page
const MainContent = () => (
  <main>
    <section id="home">
      <Home />
    </section>

    <section id="menu">
      <Menu />
    </section>

    <section id="about">
      <About />
    </section>

    <section id="gallery">
      <Gallery />
    </section>

    <section id="contact">
      <Contact />
    </section>
  </main>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
