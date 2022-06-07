import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import './css/Vars.css';
import './css/Master.css';
import './css/Menu.css';
import Page from './components/Page';
import MainMenu from './components/MainMenu';
import DateMenu from './components/DateMenu';
import LoginMenu from './components/LoginMenu';
import RegisterMenu from './components/RegisterMenu';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Page />} >
                  <Route path='/' element={<MainMenu />} />
                  <Route path='date' element={<DateMenu />} />
                  <Route path='login' element={<LoginMenu />} />
                  <Route path='register' elemetn={<RegisterMenu />} />
                  <Route path='*' element={<p style={{fontSize: '32px'}}>404 ERROR: Page not found.</p>} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
