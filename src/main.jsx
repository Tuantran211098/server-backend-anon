import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as App from './index';

createRoot(wdocument.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
