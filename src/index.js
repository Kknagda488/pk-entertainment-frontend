import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./assets/scss/style.scss"
import App from './App';
import { Provider } from 'react-redux'
import { store } from './components/ui-component/store';
import { BrowserRouter } from 'react-router-dom';
import config from './config';
import { AuthProvider } from './context/auth.js';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={config.basename}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
