import React, { useEffect, useState } from 'react';
import Axios from '../../api/Axios';
import Filters from './Filters';
import Professionals_list from './Professionals_list';
import Home_pagination from './Home_pagination';
import useData from '../../hooks/useData';

const Home = () => {

  const { edit } = useData();

  const [ page_number, set_page_number ] = useState(1);
  const [ professionals_list, set_professionals_list ] = useState([]);

  const [ search, set_search ] = useState('');

  const [ domain, set_domain ] = useState('All');
  const [ gender, set_gender ] = useState('All');
  const [ avail, set_avail ] = useState('All');

  const [ is_loading, set_is_loading ] = useState(true);
  const [ pl_fetch_err, set_pl_fetch_err ] = useState('');

  useEffect(() =>
  {
    const fetch_professionals = async (page_number) =>
    {
      try
      {
        const response = await Axios.get(
          `/fetch_professionals?page_number=${page_number}&domain=${domain}&gender=${gender}&avail=${avail}`,
          {
            headers: {"Content-Type": 'application/json'},
            withCredentials: true
          }
        );

        if(response.status === 200) set_professionals_list(response.data.professionals_list); 
      }
      catch(err)
      {
        set_pl_fetch_err(err.message);
      }
      finally
      {
        set_is_loading(false);
      }
    };

    fetch_professionals(page_number);
  }, [page_number, domain, gender, avail, edit]);

  return(
    <>
      <Filters 
        page_number={page_number}
        set_page_number={set_page_number}
        set_professionals_list={set_professionals_list}
        domain={domain}
        set_domain={set_domain}
        gender={gender}
        set_gender={set_gender}
        avail={avail}
        set_avail={set_avail}
        search={search}
        set_search={set_search}
      />
      <Professionals_list 
        is_loading={is_loading}
        professionals_list={professionals_list}
      />
      {
        search === '' ?
          <Home_pagination 
            page_number={page_number}
            set_page_number={set_page_number}
          /> :
            <></>
      }      
    </>    
  )
}

export default Home