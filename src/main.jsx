import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { config } from './config.js'

// Inject dynamic theme colors from config
const rootStyle = document.documentElement.style;
Object.entries(config.colors).forEach(([key, value]) => {
  rootStyle.setProperty(`--${key}`, value);
});

// Set document title
document.title = config.title;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
