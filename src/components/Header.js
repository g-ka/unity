import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/' className='header_name'>Unity</Link>
      <div className='header_nav'>
        <Link to='/' className='header_nav_home'>Home</Link>
        <Link to='/team' className='header_nav_teams'>Team</Link>
      </div>      
    </header>
  )
}

export default Header