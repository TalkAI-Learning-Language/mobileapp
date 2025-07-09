const DEV_API_URL = 'http://3.137.223.204:8080/api/v1/';
const PROD_API_URL = 'https://your-production-url.com/api/v1/';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;