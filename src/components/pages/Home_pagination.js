import React from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home_pagination = ({ page_number, set_page_number }) => {
  return (
    <section className='pagination_section'>
      <div className='pagination_section_toggle'>
        <FontAwesomeIcon 
          className='pagination_section_toggle_previous' 
          icon={faArrowLeft} 
          onClick={() =>
          {
            if(page_number > 1)
            {
              set_page_number(prev => prev-1);
              window.scrollBy(0,-window.pageYOffset);
            } 
          }}
        />
        <p className='pagination_section_toggle_number'>{page_number}</p>
        <FontAwesomeIcon 
          className='pagination_section_toggle_next' 
          icon={faArrowRight}
          onClick={() =>
          {
            if(page_number < 50) 
            {
              set_page_number(prev => prev+1);
              window.scrollBy(0,-window.pageYOffset);
            }
          }}
        />
      </div>      
    </section>
  )
}

export default Home_pagination