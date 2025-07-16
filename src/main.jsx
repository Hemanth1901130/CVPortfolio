import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// PWA update notification component
const UpdateNotification = ({ onUpdate }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50 flex flex-col items-start">
      <p className="mb-2">A new version is available!</p>
      <button
        onClick={onUpdate}
        className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        Update now
      </button>
    </div>
  );
};

// Main app wrapper with PWA update handling
const AppWrapper = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateRegistration, setUpdateRegistration] = useState(null);

  useEffect(() => {
    // Check if we're in a browser environment and if the registerSW function exists
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      import('virtual:pwa-register').then(({ registerSW }) => {
        const updateSW = registerSW({
          onNeedRefresh() {
            setNeedRefresh(true);
            setUpdateRegistration(updateSW);
          },
          onOfflineReady() {
            console.log('App is ready for offline use');
          },
        });
      }).catch(err => {
        console.error('Failed to register service worker:', err);
      });
    }
  }, []);

  const handleUpdate = () => {
    if (updateRegistration) {
      updateRegistration(true);
    }
  };

  return (
    <React.StrictMode>
      <App />
      {needRefresh && <UpdateNotification onUpdate={handleUpdate} />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);
