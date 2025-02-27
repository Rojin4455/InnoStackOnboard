import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Toaster, toast } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster position="top-center"/>
    <App />
  </React.StrictMode>
);


