import React from 'react'
import './HowToApplyContent.css'

function HowToApplyContent(props) {
    return (
        <div className='directions'>
          <h1>Directions</h1>
          <li>{ props.content }</li>
          <li>{ props.content }</li>
          <li>{ props.content }</li>
          <li>{ props.content }</li>
        </div>
      )
}

export default HowToApplyContent