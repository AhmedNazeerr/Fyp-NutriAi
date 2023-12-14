import React from 'react'
import FeaturesContent from './FeaturesContent';
import HowToApplyContent from './HowToApplyContent';
import FAQsContent from './FAQsContent';

function CategoryContent(props) {
    const category = props.category.name;
    console.log("Inside Category Content -------> ", {props})
    if (category === 'Features') {
        return <FeaturesContent content={props.category.content} />;
    }
    else if (category === 'How to Apply'){
        return <HowToApplyContent content={props.category.content} />;
    }
    else if (category === 'FAQs'){
        return <FAQsContent content={props.category.content} />;
    }
    else {
        // return <FeaturesContent />;
    }
}

export default CategoryContent