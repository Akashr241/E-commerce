import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
//port { BrowserRouter  } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   //BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
    
   ///BrowserRouter>
  
);

reportWebVitals();
