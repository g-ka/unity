import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Axios from '../../api/Axios';

const Filters = ({
  page_number,
  set_page_number,
  set_professionals_list,
  domain,
  set_domain,
  gender,
  set_gender,
  avail,
  set_avail,
  search,
  set_search
}) => {

  useEffect(() =>
  {
    const cancelTokenSource = axios.CancelToken.source();

    const search_handler = async () =>
    {
      set_domain('All');
      set_gender('All');
      set_avail('All');

      try
      {
        const response = await Axios.post(
          '/search',          
          { search, page_number },
          {
            cancelToken: cancelTokenSource.token,
            headers :{ "Content-Type": 'application/json' },
            withCredentials: true
          }
        );

        if(response.status === 200) set_professionals_list(response.data.search_list);     
      }
      catch(err)
      {
        // if (axios.isCancel(err)) {
        //   console.log('Request cancelled:', err.message);
        // } else {
        //   console.error('Error:', err.message);
        // }
        return
      }      
    };

    search_handler();

    return () => {
      cancelTokenSource.cancel('Request cancelled due to component unmount');
    };
  }, [search]);

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
              <option value="UI Designing">Business Development</option>
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