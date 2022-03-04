import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';
import "@popperjs/core"; 
import { AuthProvider } from './pages/utils/useAuth';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);