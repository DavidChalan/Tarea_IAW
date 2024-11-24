import { StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

// Crear el root y renderizar la aplicación

createRoot(document.getElementById('root')).render(

    <StrictMode>
      <App />
    </StrictMode>
)




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
