import React, { useState } from 'react';
import Axios from '../../api/Axios';
import useData from '../../hooks/useData';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Professionals_list = ({ is_loading, professionals_list }) => {

  const { set_edit, set_prof_id } = useData();

  const [ clash_msg, set_clash_msg ] = useState('');

  const clash_msg_style = {
    position: 'fixed',
    backgroundColor: clash_msg === 'None' ? 'green' : 'red',
    color: 'white',
    top: '250px',left: '20px',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    display: clash_msg ? 'inline-block' : 'none'
  };

  const team_add_handler = async (prof_id) =>
  {
    try
    {
      const response = await Axios.post(
        '/team/add',
        { prof_id },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) set_clash_msg(response.data.clash);
    }
    catch(err)
    {
      set_clash_msg(err.message);
    }
    finally
    {
      setTimeout(() =>
      {
        set_clash_msg('');
      }, 4000);
    }
  };

  return (
    <section className='professionals_section'>
      <p style={clash_msg_style}>Clash: {clash_msg}</p>
      {
        is_loading ?
          <div className='professionals_section_loading'>
            <p>Loading...</p>
          </div> :
            <ul className='professionals_section_list'>
              {
                professionals_list.map(professional =>
                  {
                    return(
                      <li className='professionals_section_list_card' key={professional.id}>
                        <p className='professionals_section_list_card_header'>{professional.domain}</p>
                        <div className='professionals_section_list_card_body'>
                          <img src={professional.avatar} className='professionals_section_list_card_body_image' />
                          <div className='professionals_section_list_card_body_basic_info'>
                            <p className='professionals_section_list_card_body_basic_info_name'>{professional.first_name} {professional.last_name}</p>
                            <p className='professionals_section_list_card_body_basic_info_gender'>{professional.gender}</p>
                            <p className='professionals_section_list_card_body_basic_info_email'>{professional.email}</p>
                            <div className='professionals_section_list_card_body_basic_info_avail'>
                              {
                                professional.available ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />
                              }                                                
                            </div>     
                            <div className='professionals_section_list_card_body_basic_info_add'>
                              <button onClick={() => team_add_handler(professional.id)}>add</button>   
                              <button onClick={() => { set_edit(prev => !prev); set_prof_id(professional.id); }}>
                                update
                              </button>     
                              <button>delete</button>   
                            </div>                 
                          </div>          
                        </div>                     
                      </li>
                    )
                  })
              }
            </ul>  
      }          
    </section>
  )
}

export default Professionals_list