import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// Create context
const ThreeDContext = createContext();

// Provider component
export const ThreeDProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [lastErrorTime, setLastErrorTime] = useState(0);
  
  // Handle errors with rate limiting
  const handleError = useCallback((error) => {
    console.warn('3D rendering error detected', error);
    
    const now = Date.now();
    // Reset error count if last error was more than 1 minute ago
    if (now - lastErrorTime > 60000) {
      setErrorCount(1);
    } else {
      setErrorCount(prev => prev + 1);
    }
    
    setLastErrorTime(now);
    setHasError(true);
  }, [lastErrorTime]);
  
  // Reset error state
  const resetError = useCallback(() => {
    setHasError(false);
  }, []);
  
  return (
    <ThreeDContext.Provider 
      value={{ 
        hasError, 
        handleError,
        resetError,
        errorCount
      }}
    >
      {children}
    </ThreeDContext.Provider>
  );
};

ThreeDProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook for using the context
export const useThreeD = () => useContext(ThreeDContext);

// Default export
export default ThreeDContext;