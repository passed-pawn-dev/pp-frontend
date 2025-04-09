export const environment = {
  production: true,
  keycloak: {
    authority: 'http://auth-local.passed-pawn.com',
    redirectUri: 'http://pp-local.passed-pawn.com',
    postLogoutRedirectUri: 'http://pp-local.passed-pawn.com',
    realm: 'passed-pawn',
    clientId: 'pp-frontend'
  },
  test: 'development'
};
