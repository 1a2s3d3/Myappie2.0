import React, { useState } from "react";
import Main from "../assets/img-3.jpg";

export function Home() {
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

export function Menu({ images }) {
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
          <SliderButton direction="left" onClick={prevImage} />
          <MenuImage image={images[currentIndex]} index={currentIndex} />
          <SliderButton direction="right" onClick={nextImage} />
        </div>
      </div>
    </section>
  );
}

function SliderButton({ direction, onClick }) {
  return (
    <button
      className={`arrow ${direction === "left" ? "left-arrow" : "right-arrow"}`}
      onClick={onClick}
    >
      {direction === "left" ? "<" : ">"}
    </button>
  );
}

function MenuImage({ image, index }) {
  return (
    <div className="menu-image-box">
      <img src={image} alt={`Menu ${index + 1}`} />
    </div>
  );
}

export function About() {
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

export function Contact({ contactInfo }) {
  return (
    <section id="contact" className="container-fluid contact-section">
      <div className="container py-5 text-center">
        <h2 className="mb-4">Contact Us</h2>
        {contactInfo.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
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