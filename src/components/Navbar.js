import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    // Handle scroll-based active states for main sections
    const handleScroll = () => {
      // Only check sections if we're on the home page
      if (location.pathname === "/") {
        const sections = ["home", "menu", "about", "gallery", "contact"];
        let currentSection = "home";

        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    // Add scroll listener only on home page
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  // Determine if a nav item should be active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    if (path.startsWith("#")) {
      return location.pathname === "/" && activeSection === path.slice(1);
    }
    return location.pathname === path;
  };

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={() => {
              setActiveSection("home");
              window.scrollTo(0, 0);
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#menu"
            className={isActive("#menu") ? "active" : ""}
            onClick={() => setActiveSection("menu")}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={isActive("#about") ? "active" : ""}
            onClick={() => setActiveSection("about")}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            className={isActive("#gallery") ? "active" : ""}
            onClick={() => setActiveSection("gallery")}
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={isActive("#contact") ? "active" : ""}
            onClick={() => setActiveSection("contact")}
          >
            Contact
          </a>
        </li>
        <li>
          <Link to="/order" className={isActive("/order") ? "active" : ""}>
            Order
          </Link>
        </li>
        <li>
          <Link to="/login" className={isActive("/login") ? "active" : ""}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
