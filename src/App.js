import { Routes, Route } from 'react-router-dom';
import Axios from './api/Axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Team from './components/pages/Team';
import Footer from './components/Footer';
import Update from './components/pages/Update';
import { useEffect, useState } from 'react';
import useData from './hooks/useData';

function App() {

  const { edit } = useData();
  
  const [ is_session_loading, set_is_session_loading ] = useState(true);
  const [ err_msg, set_err_msg ] = useState('');

  const main_styles = { opacity: edit ? '0.5' : '1', pointerEvents: edit ? 'none' : 'auto' }; 

  useEffect(() =>
  {
    const session_check = async () =>
    {
      try
      {
        await Axios.get(
          '/session_check',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );
      }        
      catch(err)
      {
        set_err_msg(err.message);
      }
      finally
      {
        set_is_session_loading(false);
      }
    }

    session_check();
  }, []);

  return (
    <>
      <main style={main_styles}>
        <Header />
        {
          is_session_loading ?
            <div className='open_loading'>
              <p>Loading...</p>
            </div> :
              err_msg ?
              <p>{err_msg}</p> :
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/team' element={<Team />} />
                  </Routes>
        }
        <Footer />
      </main>
      {
        edit ?
          <Update /> :
            <></>
      }
    </>      
  );
}

export default App;