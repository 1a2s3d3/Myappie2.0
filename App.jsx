import React, { useState } from "react";
import "./bootstrap.css";
import "./style.css";
import Logo from "./assets/restaurantlogo.jpg";

import MenuImg1 from "./assets/menu1.jpg";
import MenuImg2 from "./assets/menu2.jpg";
import MenuImg3 from "./assets/menu3.jpg";
import MenuImg4 from "./assets/menu4.jpg";
import MenuImg5 from "./assets/menu5.jpg";

import Navbar from "./components/Navbar";
import { Home, Menu, About, Contact, Footer } from "./components/Section";
import Order from "./components/Order";

function App() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Order", href: "#order" },
    { label: "Contact", href: "#contact" },
  ];

  const menuImages = [MenuImg1, MenuImg2, MenuImg3, MenuImg4, MenuImg5];

  const contactInfo = [
    "Email: abletoserverestaurant@gmail.com",
    "Phone: +234 000 000 0000",
    "Address: Able To Serve Restaurant, Lagos, Nigeria",
  ];

  return (
    <>
      <Navbar
        logo={Logo}
        open={open}
        setOpen={setOpen}
        navItems={navItems}
      />

      <Home />
      <Menu images={menuImages} />
      <About />
      <Order />
      <Contact contactInfo={contactInfo} />
      <Footer />
    </>
  );
}

export default App;