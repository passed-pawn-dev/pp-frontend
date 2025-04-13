export const environment = {
  production: true,
  keycloak: {
    authority: 'https://auth-local.passed-pawn.com',
    redirectUri: 'https://pp-local.passed-pawn.com',
    postLogoutRedirectUri: 'https://pp-local.passed-pawn.com',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  }
};
