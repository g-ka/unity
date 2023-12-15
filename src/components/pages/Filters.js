import React, { useEffect, useState } from 'react';

const Filters = ({
  set_page_number,
  domain,
  set_domain,
  gender,
  set_gender,
  avail,
  set_avail,
  search,
  set_search
}) => {

  return (
    <section className='filter_section'>
      <div className='filter_section_box'>
        <input 
          type='text'
          className='filter_section_box_search'
          placeholder='Search by name'
          value={search}
          onChange={e => set_search(e.target.value)}
        />
        <div className='filter_section_box_filters'>
          <div>
            <label htmlFor="domains">Domain:</label>
            <select
              id="domains" 
              name="domains" 
              value={domain}
              onChange={e => 
                {
                  set_domain(e.target.value);
                  set_page_number(1);
                }
              }
             >
              <option value="All">All</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
              <option value="Management">Management</option>
              <option value="UI Designing">UI Designing</option>
              <option value="Business Development">Business Development</option>
            </select>            
          </div>
          <div>
            <label htmlFor="genders">Gender:</label>
            <select 
              id='genders' 
              name="genders"
              value={gender}
              onChange={e => 
                {
                  set_gender(e.target.value);
                  set_page_number(1);
                }
              }
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="avail">Availability:</label>
            <select 
              id='avail' 
              name="avail"
              value={avail}
              onChange={e => 
                {
                  set_avail(e.target.value);
                  set_page_number(1);
                }
              }
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Not available">Not available</option>          
            </select>
          </div>        
        </div>
      </div>      
    </section>
  )
}

export default Filters