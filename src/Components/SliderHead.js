import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SliderHead = ({title, sliderRef}) => {
  const scrollLeft = (event, element) => {
    event.preventDefault();
    element.current.scrollLeft -= 120;
  }

  function scrollRight(event, element) {
    event.preventDefault();
    element.current.scrollLeft += 120;
  }
  return (
    <div className="row justify-content-center align-self-center align-items-base" style={{columnGap: '20px', padding: '0 10px'}}>
      <span className="col-auto align-self-center" style={{textTransform: 'uppercase', fontWeight: 600, fontSize: '15px', color: '#0003'}}>
        {title}
      </span>
      <hr className="col" style={{height: '4px', borderWidth: '2px', color: '#0004'}}/>
      <div className="col-auto align-self-center">
        <i className="text-purple mr-1" style={{cursor: "pointer"}} onClick={(e) => scrollLeft(e, sliderRef)}>
          <FaChevronLeft fontSize={16}/>
        </i>
        <i className="text-purple" style={{cursor: "pointer"}} onClick={(e) => scrollRight(e, sliderRef)}>
          <FaChevronRight fontSize={16}/>
        </i>
      </div>
    </div>
  )
}

export default SliderHead