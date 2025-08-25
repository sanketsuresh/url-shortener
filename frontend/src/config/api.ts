const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || window.location.origin
    : 'http://localhost:5000',
  
  endpoints: {
    shorten: '/api/shorten',
    urls: '/api/urls',
    redirect: (shortCode: string) => `/${shortCode}`
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

export const getShortUrl = (shortCode: string) => {
  return `${API_CONFIG.baseURL}/${shortCode}`;
};

export default API_CONFIG;
