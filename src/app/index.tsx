import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../reportWebVitals';
import '../style/style.scss';
import {app} from './init/app-init';
import "./init/fontawesome-icons";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);
reportWebVitals();
