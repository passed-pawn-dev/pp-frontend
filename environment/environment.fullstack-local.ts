export const environment = {
  production: false,
  keycloak: {
    authority: 'http://localhost:8081',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  },
  stripe: {
    publishableKey:
      'pk_test_51RQVAE8unQpRs68U54iASrcVaJLAe1nhzY7mzTTJ3qwKw1wtrnWUePSeAlAjltKHz1MWv8wrUwNREBYn7ezTY7lZ00pnePUMbv'
  }
};
