import React from 'react';

const Home = () => {
  return (
    <>
      <header>
        <div className="logo">
          <div className="logo-icon">
            <img src={process.env.PUBLIC_URL + '/images/4789379-removebg-preview.png'} alt="Silver Kitchen Logo" />
          </div>
          <h1>SHIV<br />AURICA</h1>
        </div>
        
        <div className="tagline">
          <h2>DISCOVER A NEW LEVEL OF TASTE.</h2>
        </div>
      </header>

      <div className="divider"></div>
      <div className="food-gallery">
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0026.jpg'} alt="Delicious Dish" />
        </div>
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0028.jpg'} alt="Gourmet Meal" />
        </div>
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0030.jpg'} alt="Special Dish" />
        </div>
      </div>
      <div className="divider"></div>

      <footer>
        <div className="location">
          <h3>LEVEL 3 | EAST CENTURY MALL</h3>
        </div>
        <div className="small-divider"></div>
        <div className="contact">
          <p>P: (029) 883-8920</p>
          <p>W: WWW.SILVERKITCHEN.COM</p>
        </div>
      </footer>
    </>
  );
};

export default Home; 