import { useState, useEffect } from 'react';

const useSecurityCheck = () => {
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    // Get the hostname and protocol from the window.location object
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Check if the hostname is localhost
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    // Check if the protocol is HTTPS
    const isHTTPS = protocol === 'https:';

    // Update the state based on security checks
    setIsSecure(isLocalhost || isHTTPS);
  }, []); // Empty dependency array ensures this effect runs once on mount

  return isSecure;
};

export default useSecurityCheck;