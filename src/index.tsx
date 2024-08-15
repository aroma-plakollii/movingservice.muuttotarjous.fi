import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Helsinki');

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const dataStep = document.getElementById('root')?.getAttribute('data-step');
const stepNumber = dataStep ? parseInt(dataStep) : 1;

ReactDOM.render(
  <React.StrictMode>
    <App dataStep={stepNumber}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
