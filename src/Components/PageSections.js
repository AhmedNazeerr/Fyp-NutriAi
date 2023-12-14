import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Shop.css';
import './PageSections.css';
import CategoryContent from './CategoryContent';


export default function PageSections(props) {
  const categories = [
    {
      name: 'Features',
      content: props.content.FeatureContent //from the stored stuff file
    },
    {
      name: 'How to Apply',
      content: props.content.ApplyContent  //from the stored stuff file
    },
    {
      name: 'FAQs',
      content: props.content.FAQContent  //from the stored stuff file
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const handleClick = (category, index) => {
    console.log("catgory ---------------> ",category);
    setSelectedCategory(category);
    setActiveButtonIndex(index);
  };


  return (
    <div className="shop-containerPS">
      <div className="categoriesPS">
        {categories.map((category, index) => {
          const buttonClass = `category-button ${index === activeButtonIndex ? 'active' : ''}`;
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleClick(category, index)}
            >
              {category.name}
              <div className="category-line"></div>
            </button>
          );
        })}
      </div>

      <div className="category-content">
        <CategoryContent category={selectedCategory} />
      </div>
    </div>
  );
}