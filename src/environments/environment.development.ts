// export const environment = {
//   production: false,
//   apiUrl: 'http://143.107.102.8:8083'
// };
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  mqtt: {        
    clientId: 'cliente-web2',
    username: 'garsoft-java',
    password: 'garsoft-java',
    path: '/mqtt',
    url: 'ws://garsoft.com.br:8884/mqtt',
  },
};
