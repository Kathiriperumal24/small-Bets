// useAuth.js

export function useAuth() {
    // Assuming you're validating email in the useAuth hook
  
    const validateEmail = (str) => {
      if (!str) return false;
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Fixed unnecessary escape characters
      return pattern.test(str);
    };
  
    return {
      validateEmail,
    };
  }
  