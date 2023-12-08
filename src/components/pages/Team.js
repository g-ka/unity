import React, { useEffect, useState } from 'react';
import Axios from '../../api/Axios';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Team = () => {

  const [ team_name, set_team_name ] = useState('');
  const [ registered_team_name, set_registered_team_name ] = useState('');
  const [ registered_team_members, set_registered_team_members ] = useState([]);
  const [ refresh, set_refresh ] = useState(true);

  const [ is_load, set_is_load ] = useState(true);
  const [ button, set_button ] = useState('Create');

  const button_events = { pointerEvents: button === 'Create' ? 'auto' : 'none' };

  useEffect(() =>
  {
    const team_details_handler = async () =>
    {
      try
      {
        const response = await Axios.get(
          '/team/details',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );

        if(response.status === 200) 
        {
          set_registered_team_name(response.data.team_name);
          set_registered_team_members(response.data.team_members_list);
        }
      }
      catch(err)
      {
        console.log(err.message);
      }
      finally
      {
        set_is_load(false);
      }
    };

    team_details_handler();
  }, [refresh]);

  const team_create_handler = async (e) =>
  {
    e.preventDefault();
    set_button('Creating');

    try
    {
      const response = await Axios.post(
        '/team/create',
        { team_name },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) 
      {        
        set_button('Created');
        set_team_name('');
        set_refresh(prev => !prev);
      }
    }
    catch(err)
    {
      set_button('Failed');
    }
    finally
    {
      setTimeout(() =>
      {
        set_button('Create');
      }, 2000);
    }
  };

  const team_delete_handler = async (id) =>
  {
    try
    {
      const response = await Axios.delete(
        `/team/delete/${id}`,
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) set_refresh(prev => !prev);
    }
    catch(err)
    {
      return
    }
  }

  return (
    <section className='team_section'>
      {
        is_load ?
          <div className='team_section_loading'>
            <p>Loading...</p>
          </div> :
            registered_team_name ?
              <>
                <p className='team_section_name'>{registered_team_name}</p> 
                {
                  !registered_team_members.length ? 
                    <p className='team_section_msg'>Go to Home and select new members to your team</p> :
                      <ul className='team_section_list'>
                        {
                          registered_team_members.map(member =>
                            {
                              return(
                                <li className='team_section_list_card' key={member.id}>
                                  <p className='team_section_list_card_header'>{member.domain}</p>
                                  <div className='team_section_list_card_body'>
                                    <img src={member.avatar} className='team_section_list_card_body_image' />
                                    <div className='team_section_list_card_body_basic_info'>
                                      <p className='team_section_list_card_body_basic_info_name'>{member.first_name} {member.last_name}</p>
                                      <p className='team_section_list_card_body_basic_info_gender'>{member.gender}</p>
                                      <p className='team_section_list_card_body_basic_info_email'>{member.email}</p>
                                      <div className='team_section_list_card_body_basic_info_avail'>
                                        {
                                          member.available ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />
                                        }                                                
                                      </div>     
                                      <div className='team_section_list_card_body_basic_info_add'>
                                        <button onClick={() => team_delete_handler(member.id)}>delete</button>   
                                      </div>                 
                                    </div>          
                                  </div>                     
                                </li>
                              )
                            })
                        }
                      </ul>  
                }                
              </> :
                <>
                  <div className='team_section_desc'>
                    <p>seems like you haven't initiated your team yet. give a name and create one</p>
                  </div>
                  <form className='team_section_creation' onSubmit={team_create_handler}>
                    <input         
                      placeholder='Enter your team name(once created, not changeable)'
                      required
                      value={team_name}
                      onChange={e => set_team_name(e.target.value)}
                    />
                    <button
                      style={button_events}
                    >
                      {button}
                    </button>
                  </form>
                </>
      }      
    </section>
  )
}

export default Team