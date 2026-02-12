import React, { useEffect, useRef, useCallback } from 'react';

// Extend Window interface to include phoneEmailListener
declare global {
  interface Window {
    phoneEmailListener?: (userObj: { user_json_url: string }) => void;
  }
}

interface PhoneOTPButtonProps {
  onVerificationSuccess: (userJsonUrl: string, phoneNumber: string, countryCode: string) => void;
  phoneNumber?: string;
}

const PhoneOTPButton: React.FC<PhoneOTPButtonProps> = ({ onVerificationSuccess, phoneNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Memoize the callback to avoid recreating it
  const handleVerificationSuccess = useCallback(async (userObj: { user_json_url: string }) => {
    const user_json_url = userObj.user_json_url;
    
    try {
      // Fetch the verified phone details from the JSON URL
      const response = await fetch(user_json_url);
      const jsonData = await response.json();
      
      const user_country_code = jsonData.user_country_code;
      const user_phone_number = jsonData.user_phone_number;
      
      // Call the success callback with verified phone details
      onVerificationSuccess(user_json_url, user_phone_number, user_country_code);
    } catch (error) {
      console.error('Error fetching phone verification data:', error);
      // Still call the callback with the URL, backend can verify
      onVerificationSuccess(user_json_url, '', '');
    }
  }, [onVerificationSuccess]);

  useEffect(() => {
    // Define the listener function on window - must be available globally
    window.phoneEmailListener = handleVerificationSuccess;

    // Load the external script
    if (!scriptLoadedRef.current && containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = "https://www.phone.email/sign_in_button_v1.js";
      script.async = true;
      script.onload = () => {
        console.log('Phone.email script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load phone.email script');
      };
      containerRef.current.appendChild(script);
      scriptLoadedRef.current = true;
    }

    return () => {
      // Don't clear the listener on unmount if we're just re-rendering
    };
  }, [handleVerificationSuccess]);

  // Re-initialize when component remounts
  useEffect(() => {
    return () => {
      scriptLoadedRef.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-400 text-sm mb-4 text-center">
        Click the button below to verify your phone number
        {phoneNumber && <strong className="text-white block mt-1">+91 {phoneNumber}</strong>}
      </p>
      <div 
        ref={containerRef}
        className="pe_signin_button" 
        data-client-id="11512328133974708871"
        style={{ minHeight: '50px', minWidth: '200px' }}
      />
      <p className="text-zinc-500 text-xs mt-4 text-center">
        A popup will open where you can enter your phone number and receive an OTP
      </p>
    </div>
  );
};

export default PhoneOTPButton;
