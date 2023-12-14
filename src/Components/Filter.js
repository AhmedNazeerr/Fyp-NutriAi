import React, { useState, useEffect } from 'react';
import './Filter.css';
import { Modal } from 'react-bootstrap';

const Filter = ({ subcategoryContent, subheadingContent }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubheading, setSelectedSubheading] = useState(null);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSubheadingClick = (index) => {
    setSelectedSubheading(selectedSubheading === index ? null : index);
    setSelectedSubcategory(null); // Unselect the subcategory when a subheading is clicked
  };

  const handleMainCategoryClick = () => {
    setSelectedSubcategory(null);
    setSelectedSubheading(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (!isMobileView) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileView]);

  return (
    <>
      {isMobileView && (
        <button
          className={`filter-toggle-button ${isFilterOpen ? 'active' : ''}`}
          onClick={handleFilterToggle}
        >
          FILTER
        </button>
      )}

      <Modal
        size="sm"
        animation={false}
        show={isFilterOpen && isMobileView}
        onHide={handleFilterToggle}
        dialogClassName={`custom-modal ${isFilterOpen && isMobileView ? '' : 'hidden'}`}
      >
        <Modal.Header>
          <div className="modal-header-content">
            <div className="modal-title">
              <span>Filter</span>
            </div>
            <div className="close-button" onClick={handleFilterToggle}>
              Close
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <h2
            className={`filter-heading ${selectedSubcategory !== null || selectedSubheading !== null ? 'active' : ''}`}
            onClick={handleMainCategoryClick}
          >
            FILTER
          </h2>
          <hr className="filter-line" />

          <h3 className={`filter-subcategory ${selectedSubcategory !== null ? 'active' : ''}`}>
            {subcategoryContent}
          </h3>
          {subheadingContent.map((subheading, index) => (
            <div
              className={`filter-subheading ${selectedSubheading === index ? 'active' : ''}`}
              onClick={() => handleSubheadingClick(index)}
              key={index}
            >
              {subheading}
            </div>
          ))}

          <hr className="filter-line" />

          <div className="filter-size-section">
            <h2 className="filter-size-heading">Volume</h2>
            <label className="filter-size-checkbox">
              <input type="checkbox" />
              <span className="filter-size-label">500 ml</span>
            </label>
            <label className="filter-size-checkbox">
              <input type="checkbox" />
              <span className="filter-size-label">875 ml</span>
            </label>
            <label className="filter-size-checkbox">
              <input type="checkbox" />
              <span className="filter-size-label">1000 ml</span>
            </label>
            <label className="filter-size-checkbox">
              <input type="checkbox" />
              <span className="filter-size-label">2.5 l</span>
            </label>
            <label className="filter-size-checkbox">
              <input type="checkbox" />
              <span className="filter-size-label">5 l</span>
            </label>
          </div>

          
        </Modal.Body>
      </Modal>

      <div className= "filter-content">
        <h2
          className={`filter-heading ${selectedSubcategory !== null || selectedSubheading !== null ? 'active' : ''}`}
          onClick={handleMainCategoryClick}
        >
          FILTER
        </h2>
        <hr className="filter-line" />

        <h3 className={`filter-subcategory ${selectedSubcategory !== null ? 'active' : ''}`}>
          {subcategoryContent}
        </h3>
        {subheadingContent.map((subheading, index) => (
          <div
            className={`filter-subheading ${selectedSubheading === index ? 'active' : ''}`}
            onClick={() => handleSubheadingClick(index)}
            key={index}
          >
            {subheading}
          </div>
        ))}
        <hr className="filter-line" />

        <div className="filter-size-section">
          <h2 className="filter-size-heading">Volume</h2>
          <label className="filter-size-checkbox">
            <input type="checkbox" />
            <span className="filter-size-label">500 ml</span>
          </label>
          <label className="filter-size-checkbox">
            <input type="checkbox" />
            <span className="filter-size-label">875 ml</span>
          </label>
          <label className="filter-size-checkbox">
            <input type="checkbox" />
            <span className="filter-size-label">1000 ml</span>
          </label>
          <label className="filter-size-checkbox">
            <input type="checkbox" />
            <span className="filter-size-label">2.5 l</span>
          </label>
          <label className="filter-size-checkbox">
            <input type="checkbox" />
            <span className="filter-size-label">5 l</span>
          </label>
          {/* <hr className="filter-line" /> */}
        </div>
        <hr className="filter-line" />
      </div>
     
    
    </>
  );
};

export default Filter;
