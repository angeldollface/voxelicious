/*
VOXELICIOUS by Alexander Abraham, a.k.a. "Angel Dollface".
Licensed under the MIT license.
*/

// Loading our styles.
import './global.scss';

// Main component is imported
// and loaded.
import App from './App';

// Standard React stuff.
import React from 'react';

// Needed for rendering.
import ReactDOM from 'react-dom/client';

// Instantiating the virtual DOM
// and rendering our app.
const root = ReactDOM.createRoot(
  document.body as HTMLElement
);
root.render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
);