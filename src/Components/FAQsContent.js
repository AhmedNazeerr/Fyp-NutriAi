import React from 'react'
import QADropdown from './QADropdown';
import './FAQsContent.css';

function FAQsContent(props) {
    return (
        <div className="qa-container">
                {/* .map function will be applied here depending on how u stored.... for syntax see below commented code */}
                {/* { temp.map((product) => (
                    <ProductCard  key= {products.id} product = {product} />
                    ))} */}
          <QADropdown
            question="Q1: What is JavaScript?"
            answer="A1: JavaScript is a programming language used to make web pages interactive."
          />
          <QADropdown
            question="Q2: How do you declare a variable in JavaScript?"
            answer="A2: You can declare a variable using the 'var', 'let', or 'const' keyword."
          />
          <QADropdown
            question="Q3: What is a function in JavaScript?"
            answer="A3: A function is a reusable block of code that performs a specific task."
          />
        </div>
    );
}

export default FAQsContent