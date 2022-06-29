import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './css/Vars.css';
import './css/Master.css';
import './css/Menu.css';
import Page from './components/Page';
import MainMenu from './components/MainMenu';
import DateMenu from './components/DateMenu';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          {/*Site routes. Page is parent element that the menus render on top of.*/}
          <Route path='/' element={<Page />} >
              <Route path='/' element={<MainMenu />} />
              <Route path='date' element={<DateMenu />} />
              <Route path='*' element={<p style={{fontSize: '32px'}}>404 ERROR: Page not found.</p>} />
          </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
