import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/Fetch/app.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App></App>
    </Provider>
    </React.StrictMode>
 

);
