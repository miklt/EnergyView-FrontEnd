// export const environment = {
//   production: true,
//   apiUrl: 'http://143.107.102.8:8883'
// };
export const environment = {
  production: true,
  apiUrl: 'http://143.107.102.8:8000',
  mqtt: {
    server: '143.107.102.8',
    port: 8883,
    protocol: 'ws',
    clientId: 'cliente-web',
    username: 'garsoft-java',
    password: 'garsoft-java',
    path:'/mqtt'
  }
};
