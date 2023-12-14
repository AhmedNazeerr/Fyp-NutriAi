import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './QADropdown.css'

function QADropdown({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`qa-item ${isOpen ? 'open' : ''}`}>
      <div className="qa-question" onClick={toggleDropdown}>
        {question}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="dropdown-icon" />
      </div>
      {isOpen && <div className="qa-answer">{answer}</div>}
    </div>
  );
}

export default QADropdown;
