import React from 'react'
import './SDSProductCard.css'
import { useNavigate } from 'react-router-dom';


const SDSProductCard = (props) => {
    const navigate = useNavigate();
    const handleProductItemClick = (Pname) => {
        console.log(`Clicked on ${Pname}`);
        navigate(`/Products/${Pname}`);
    };
    
  
    return (
        
        <div onClick={() => handleProductItemClick(props.discription)} className='prod-Card'>
            {/* <div className='img-conntent'> */}
            <div className='img-container'>
              
                <div className="imgPC">
                    <img className='prodIMG' src={props.img} alt='productImage' />
                </div>
            </div>
            {/* </div> */}
            <div className="detailsPC">
                <h3 className='underline disc'>{props.discription}</h3>
                <div className='option'>
                    <p className='underline text-dull'>{props.option}</p>
                </div>

            </div>
        </div>
    )
}

export default SDSProductCard;