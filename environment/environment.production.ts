export const environment = {
  production: true,
  keycloak: {
    authority: 'https://auth-dev.passed-pawn.com',
    redirectUri: 'https://pp-dev.passed-pawn.com',
    postLogoutRedirectUri: 'https://pp-dev.passed-pawn.com',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  },
  stripe: {
    publishableKey:
      'pk_test_51RQVAE8unQpRs68U54iASrcVaJLAe1nhzY7mzTTJ3qwKw1wtrnWUePSeAlAjltKHz1MWv8wrUwNREBYn7ezTY7lZ00pnePUMbv'
  }
};
