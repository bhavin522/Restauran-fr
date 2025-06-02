import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const response = await axios.post(
        "https://restaurant1-cr9i.onrender.com/api/contact",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="section-title">Contact Us</h2>

      {/* Status Message */}
      {status.message && (
        <div
          style={{
            padding: "15px",
            margin: "20px auto",
            maxWidth: "1200px",
            borderRadius: "5px",
            textAlign: "center",
            backgroundColor:
              status.type === "success"
                ? "rgba(76, 175, 80, 0.2)"
                : "rgba(244, 67, 54, 0.2)",
            border: `1px solid ${
              status.type === "success" ? "#4CAF50" : "#f44336"
            }`,
            color: status.type === "success" ? "#4CAF50" : "#f44336",
          }}
        >
          {status.message}
        </div>
      )}

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-details">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Level 3, East Century Mall</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>(029) 883-8920</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>info@silverkitchen.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="map-container">
          <h3>Find Us</h3>
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802548850011!2d121.04711661543!3d14.554892182497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzE3LjYiTiAxMjHCsDAyJzQ5LjYiRQ!5e0!3m2!1sen!2sph!4v1635134567890!5m2!1sen!2sph"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
