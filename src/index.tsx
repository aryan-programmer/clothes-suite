import ReactDOM from 'react-dom/client';
import "reflect-metadata";
import {app} from './app/init/app-init';
import "./app/init/fontawesome-icons";
import reportWebVitals from './reportWebVitals';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);
reportWebVitals();
