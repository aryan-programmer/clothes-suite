import ReactDOM from 'react-dom/client';
import "reflect-metadata";
import {app} from './app/init/app-init';
import "./app/init/fontawesome-icons";
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);
serviceWorkerRegistration.register();
reportWebVitals();
