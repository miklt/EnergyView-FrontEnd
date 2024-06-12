// export const environment = {
//   production: false,
//   apiUrl: 'http://143.107.102.8:8083'
// };
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  mqtt: {
    server: '143.107.102.8',
    port: 8883,
    protocol: 'ws',
    clientId: 'cliente-web',
    username: 'garsoft-java',
    password: 'garsoft-java',
    path: '/mqtt',
  },
};
