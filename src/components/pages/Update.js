import React, { useState, useEffect } from 'react';
import useData from '../../hooks/useData';
import Axios from '../../api/Axios';

const Update = () => {

  const { set_edit, prof_id } = useData();

  const [ first_name, set_first_name ] = useState('');
  const [ last_name, set_last_name ] = useState('');
  const [ domain, set_domain ] = useState('');
  const [ gender, set_gender ] = useState('');
  const [ email, set_email ] = useState('');
  const [ avail, set_avail ] = useState('');

  const [ is_fetch_loading, set_is_fetch_loading ] = useState(true);
  const [ fetch_err, set_fetch_err ] = useState('');

  const [ button, set_button ] = useState('Update');

  const button_styles = { pointerEvents: button === 'Update' ? 'auto' : 'none'}

  useEffect(() =>
  {
    const fetch_professional_handler = async () =>
    {
      try
      {
        const response = await Axios.get(
          `/fetch_professionals/${prof_id}`,
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );

        if(response.status === 200)
        {
          const { professional } = response.data;
          set_first_name(professional.first_name);
          set_last_name(professional.last_name);
          set_domain(professional.domain);
          set_gender(professional.gender);
          set_email(professional.email);
          set_avail(professional.available);
        }
      }
      catch(err)
      {
        set_fetch_err(err.message);
      }
      finally
      {
        set_is_fetch_loading(false);
      }
    };

    fetch_professional_handler();
  }, []);

  const update_handler = async (e) =>
  {
    e.preventDefault();
    set_button('Updating');

    try
    {
      const response = await Axios.post(
        '/api/update',
        {
          id: prof_id,
          first_name,
          last_name,
          domain,
          gender,
          email,
          available: avail
        },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) set_edit(false);
    }
    catch(err)
    {
      set_button('Failed');
    }
    finally
    {
      setTimeout(() =>
      {
        set_button('Update')          
      }, 3000);
    }
  };

  return (
    <div className='update_prof'>
      {
        is_fetch_loading ?
          <p className='update_prof_loading'>Loading</p> :
            fetch_err ?
              <p className='update_prof_fetch_err'>{fetch_err}</p> :
                <form className='update_prof_form' onSubmit={update_handler}>
                  <div className='update_prof_form_heading'>
                    <p>
                      Update Form
                    </p>
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='first_name'
                    >
                      First name:
                    </label>
                    <input 
                      id='first_name'
                      className='update_prof_form_box_first_name'
                      required
                      value={first_name}
                      onChange={e => set_first_name(e.target.value)}
                    />
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='last_name'
                    >
                      Last name:
                    </label>
                    <input 
                      id='last_name'
                      className='update_prof_form_box_last_name'
                      required
                      value={last_name}
                      onChange={e => set_last_name(e.target.value)}
                    />
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='domain'
                    >
                      Domain:
                    </label>
                    <input 
                      id='domain'
                      className='update_prof_form_box_domain'
                      required
                      value={domain}
                      onChange={e => set_domain(e.target.value)}
                    />
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='gender'
                    >
                      Gender:
                    </label>
                    <input 
                      id='gender'
                      className='update_prof_form_box_gender'
                      required
                      value={gender}
                      onChange={e => set_gender(e.target.value)}
                    />
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='email'
                    >
                      Email:
                    </label>
                    <input 
                      id='email'
                      className='update_prof_form_box_email'
                      required
                      value={email}
                      onChange={e => set_email(e.target.value)}
                    />
                  </div>
                  <div className='update_prof_form_box'>
                    <label
                      htmlFor='avail'
                    >
                      Avail:
                    </label>
                    <input 
                      type='checkbox'
                      id='avail'
                      className='update_prof_form_box_avail'
                      checked={avail}
                      onChange={e => set_avail(prev => !prev)}
                    />
                  </div>
                  <button
                    className='update_prof_form_submit'          
                    type='submit'
                    style={button_styles}
                  >
                    {button}
                  </button>
                  <button 
                    className='update_prof_form_close'
                    type='button'                    
                    onClick={() => set_edit(prev => !prev)}
                  >
                    Close
                  </button>
                </form>
      }      
    </div>
  )
}

export default Update