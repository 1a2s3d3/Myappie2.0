import React, { useState } from "react";
import "./bootstrap.css";
import "./style.css";
import Logo from "./assets/restaurantlogo.jpg";
import Main from "./assets/img-3.jpg";

import MenuImg1 from "./assets/menu1.jpg";
import MenuImg2 from "./assets/menu2.jpg";
import MenuImg3 from "./assets/menu3.jpg";
import MenuImg4 from "./assets/menu4.jpg";
import MenuImg5 from "./assets/menu5.jpg";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a href="#home" className="navbar-brand d-flex align-items-center">
            <img src={Logo} alt="Restaurant Logo" className="logo-img" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`navbar-collapse ${open ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#home"
                  onClick={() => setOpen(false)}
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#menu"
                  onClick={() => setOpen(false)}
                >
                  Menu
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#about"
                  onClick={() => setOpen(false)}
                >
                  About
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#order"
                  onClick={() => setOpen(false)}
                >
                  Order
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#contact"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Home />
      <Menu />
      <About />
      <Order />
      <Contact />
      <Footer />
    </>
  );
}

function Home() {
  return (
    <section id="home" className="container-fluid p-0">
      <div className="container flex-container">
        <div className="left-col">
          <h2>Get your fast food or slow food at Able To Serve Restaurant</h2>
          <p className="hero-text">
            Fresh meals, quality ingredients, and a relaxing atmosphere for you
            and your family.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="btn btn-warning me-3">
              View Menu
            </a>
            <a href="#order" className="btn btn-outline-light">
              Order Now
            </a>
          </div>
        </div>

        <div className="right-col">
          <div className="img-box">
            <img src={Main} alt="Main food" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const images = [MenuImg1, MenuImg2, MenuImg3, MenuImg4, MenuImg5];
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextImage() {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function prevImage() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  return (
    <section id="menu" className="container-fluid p-0">
      <div className="container menu-section">
        <h2 className="text-center my-4">These are the dishes we have</h2>
        <p className="text-center menu-subtext">
          Enjoy some of our best meals prepared with care and served fresh.
        </p>

        <div className="menu-slider">
          <button className="arrow left-arrow" onClick={prevImage}>
            &lt;
          </button>

          <div className="menu-image-box">
            <img src={images[currentIndex]} alt={`Menu ${currentIndex + 1}`} />
          </div>

          <button className="arrow right-arrow" onClick={nextImage}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-fluid about-section">
      <div className="container py-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="text-center about-text">
          Able To Serve Restaurant is committed to serving delicious meals in a
          warm and friendly environment. Whether you want fast food on the go or
          a calm slow-food experience, we are here to serve you with excellence.
        </p>
      </div>
    </section>
  );
}

function Order() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderItem: "",
    details: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          fullName: "",
          email: "",
          orderItem: "",
          details: "",
        });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server connection failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="order" className="container-fluid order-section">
      <div className="container py-5">
        <h2 className="text-center mb-4">Place Your Order</h2>

        <form className="order-form mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="orderItem"
              className="form-control"
              placeholder="What would you like to order?"
              value={formData.orderItem}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <textarea
              name="details"
              className="form-control"
              rows="4"
              placeholder="Additional details"
              value={formData.details}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>

          {message && (
            <div className="alert alert-info mt-3 text-center">{message}</div>
          )}
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="container-fluid contact-section">
      <div className="container py-5 text-center">
        <h2 className="mb-4">Contact Us</h2>
        <p>Email: abletoserverestaurant@gmail.com</p>
        <p>Phone: +234 000 000 0000</p>
        <p>Address: Able To Serve Restaurant, Lagos, Nigeria</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="container-fluid footer-section">
      <div className="container text-center py-3">
        <p className="mb-0">
          © 2026 Able To Serve Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default App;