export default {
    API_URL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL_PRO : process.env.REACT_APP_SERVER_URL_DEV
};