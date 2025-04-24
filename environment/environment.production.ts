export const environment = {
  production: true,
  keycloak: {
    authority: 'https://auth-dev.passed-pawn.com',
    redirectUri: 'https://pp-dev.passed-pawn.com',
    postLogoutRedirectUri: 'https://pp-dev.passed-pawn.com',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  }
};
