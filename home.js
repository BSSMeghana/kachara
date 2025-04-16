import React, { useState } from 'react';
import { FaRecycle } from 'react-icons/fa';
import India from './India';
import Upload from './Upload';
import './Home.css';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="homepage">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <h3>Menu</h3>
        <ul>
          <li><a href="home" onClick={toggleSidebar}>Home</a></li>
          <li><a href="#next" onClick={toggleSidebar}>India</a></li>
          <li><a href="#nextnext" onClick={toggleSidebar}>News</a></li>
          <li><a href="#nextnxt" onClick={toggleSidebar}>Upload</a></li>
        </ul>
      </div>

      {/* Hero Section */}
      <section
        className="herosection"
        style={{ backgroundImage: "url('/home.png')" }}
      >
        <div className="hero-content">
          <h2 className="herotitle">Transforming Waste into Breakthrough Insights Through AI!</h2>
          <p className="herosubtitle">
            Classify. Predict. Eliminate waste with AI-powered sustainability.
          </p>

          {/* Recycle Icon triggers sidebar */}
          <div className="menu-container">
            <FaRecycle className="menu-icon" title="Menu" onClick={toggleSidebar} />
          </div>

          
        </div>
      </section>

      {/* Next Section */}
      <section id="next" className="next-section">
        <h3>India's Waste Generation and Recycling: A Year in Review</h3>
        <India />
      </section>

      <section id="nextnext" className="nextnext-section">
        <h3>More content here...</h3>
      </section>

      <section id="nextnxt" className="nextnxt-section">
        <h3>Let's identify the waste</h3>
        <Upload />
      </section>
    </div>
  );
};

export default Home;
