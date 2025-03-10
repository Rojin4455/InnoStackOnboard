import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Toaster, toast } from 'sonner';
import { Provider } from 'react-redux'
import { store } from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toaster position="top-center"/>
    <App />
    </Provider>
);


