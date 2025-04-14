import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo great-vibes-regular">Movies Radio</div>
      <ul className="nav-links">
        <li><a href="#About">About</a></li>
        <li><a href="#Work">Work</a></li>
        <li><a href="#Collab">Collab</a></li>
      </ul>
    </nav>
  );
}
