import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from './context/AuthContext';

//port { BrowserRouter  } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
      <AuthProvider>
        <App/>
      </AuthProvider>
    
  </React.StrictMode>
);

   //</BrowserRouter>
  


