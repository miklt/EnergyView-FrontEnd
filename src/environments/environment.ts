// export const environment = {
//   production: true,
//   apiUrl: 'http://143.107.102.8:8883'
// };
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  mqtt: {    
    clientId: 'cliente-web2',
    username: 'garsoft-java',
    password: 'garsoft-java',
    path: '/mqtt',
    url: 'wss://garsoft.com.br:8883/mqtt',
  },
};
