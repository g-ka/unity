import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Data_provider } from './context/Data_box';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename='/unity'>
      <Data_provider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>  
      </Data_provider>             
    </Router>    
  </React.StrictMode>
);