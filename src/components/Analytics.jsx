import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics component for tracking page views and events
 * This component uses Umami Analytics, a privacy-focused analytics solution
 * 
 * @returns {null} This component doesn't render anything
 */
const Analytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    // Only track page views if umami is loaded
    if (window.umami) {
      window.umami.trackView(location.pathname);
    }
  }, [location]);

  // Initialize event tracking
  useEffect(() => {
    // Add event listeners to track specific events
    const trackButtonClick = (e) => {
      const button = e.target.closest('button, a');
      if (button && window.umami) {
        const eventName = button.getAttribute('data-umami-event') || 
                         button.textContent?.trim() || 
                         'button-click';
        window.umami.trackEvent(eventName);
      }
    };

    // Add event listener to document to capture all button clicks
    document.addEventListener('click', trackButtonClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackButtonClick);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default Analytics;