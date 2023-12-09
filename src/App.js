import { Routes, Route } from 'react-router-dom';
import Axios from './api/Axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Team from './components/pages/Team';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {

  const [ is_loading, set_is_loading ] = useState(true);
  const [ is_session_loading, set_is_session_loading ] = useState(true);
  const [ err_msg, set_err_msg ] = useState('');

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
      <Header />
      {
        is_session_loading || is_loading ?
          <div className='open_loading'>
            <p>Loading...</p>
          </div> :
            err_msg ?
             <p>{err_msg}</p> :
              <main>
                <Routes>
                  <Route path='/' element={<Home 
                    is_loading={is_loading}
                    set_is_loading={set_is_loading}
                  />} />
                  <Route path='/team' element={<Team />} />
                </Routes>
              </main>   
      }
      <Footer />
    </>      
  );
}

export default App;