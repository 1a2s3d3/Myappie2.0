import React from "react";

function Navbar({ logo, open, setOpen, navItems }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <a href="#home" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Restaurant Logo" className="logo-img" />
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

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label, onClick }) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={href} onClick={onClick}>
        {label}
      </a>
    </li>
  );
}

export default Navbar;