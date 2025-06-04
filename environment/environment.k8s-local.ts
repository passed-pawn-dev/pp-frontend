export const environment = {
  production: true,
  keycloak: {
    authority: 'https://auth-local.passed-pawn.com',
    redirectUri: 'https://pp-local.passed-pawn.com',
    postLogoutRedirectUri: 'https://pp-local.passed-pawn.com',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  },
  stripe: {
    publishableKey:
      'pk_test_51RQVAE8unQpRs68U54iASrcVaJLAe1nhzY7mzTTJ3qwKw1wtrnWUePSeAlAjltKHz1MWv8wrUwNREBYn7ezTY7lZ00pnePUMbv'
  },
  apiUrl: '/api'
};
