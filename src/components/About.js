import React from "react";

const About = () => {
  return (
    <>
      <h2 className="section-title">About Us</h2>
      <div className="about-container">
        <div className="story-content">
          <img src="./images/res.webp" alt="Restaurant Ambiance" />
          <div className="story-text">
            <p>
              Founded in 2020, Shiv Aurica emerged from a passion for authentic
              Indian cuisine. Our journey began with age-old family recipes
              passed down through generations, combining traditional flavors
              with modern culinary techniques.
            </p>
            <p>
              Today, we pride ourselves on delivering the true essence of Indian
              hospitality and cuisine. Every dish tells a story of India's rich
              culinary heritage, prepared with carefully selected spices and
              ingredients to ensure an authentic dining experience.
            </p>
          </div>
        </div>

        <div className="chef-team">
          <h3>Meet Our Expert Chefs</h3>
          <div className="chef-grid">
            <div className="chef-card">
              <img src="./images/rajeshkumar.jfif" alt="Executive Chef" />
              <h4>Chef Rajesh Kumar</h4>
              <p className="chef-title">Executive Chef</p>
              <p>
                With over 20 years of experience in traditional Indian cuisine,
                Chef Rajesh brings authentic flavors from various regions of
                India, specializing in tandoor and curry preparations.
              </p>
            </div>
            <div className="chef-card">
              <img src="./images/priyaSharma.jfif" alt="Pastry Chef" />
              <h4>Chef Priya Sharma</h4>
              <p className="chef-title">Dessert Specialist</p>
              <p>
                A master of Indian sweets and desserts, Chef Priya combines
                traditional recipes with modern presentations to create
                memorable dessert experiences.
              </p>
            </div>
            <div className="chef-card">
              <img src="./images/amitpatel.jfif" alt="Sous Chef" />
              <h4>Chef Amit Patel</h4>
              <p className="chef-title">Sous Chef</p>
              <p>
                Specializing in regional Indian cuisines, Chef Amit brings
                diverse flavors from across India, from Kerala's coastal cuisine
                to Punjab's robust flavors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
