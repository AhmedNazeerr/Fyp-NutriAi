import React from 'react'
import './bar.css'

function Bar(props) {

  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }



  return (
    <div className='bar'>
      {/* <div className='filter'> */}
        <div className="dropdown">
          <button onClick={myFunction} className="dropbtn">Sort By</button>
          <div id="myDropdown" className="dropdown-content">
            <a href="/#">Link 1</a>
            <a href="/#">Link 2</a>
            <a href="/#">Link 3</a>
          </div>
        </div>
      {/* </div> */}
      <div className='prod-count'>
        <span className='prod-count-span'>{props.count} products</span>
      </div>
    </div>
  )
}

export default Bar