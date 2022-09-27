import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { isBrowser } from 'react-device-detect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App isBrowser = { isBrowser } />
);
