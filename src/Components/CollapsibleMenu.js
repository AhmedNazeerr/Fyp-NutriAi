import React, { useState } from 'react';
import './CollapsibleMenu.css';


const CollapsibleMenu = ({ title, items, className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setExpanded(!expanded);

  };
  const [expanded, setExpanded] = useState(false);


  return (
    <div className={`collapsible-menu ${className}`}>
      <div className="menu-heading" onClick={toggleMenu}>
        {title}
        <span className={`arrow-icon ${expanded ? 'down' : 'up'}`}>&#9650;</span>
      </div>
      <ul className={`quick-linksCM ${menuOpen ? 'expanded' : ''}`}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CollapsibleMenu;
