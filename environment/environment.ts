export const environment = {
  production: false,
  keycloak: {
    authority: 'http://localhost:8081',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    realm: 'passed-pawn-dev',
    clientId: 'passed-pawn-frontend'
  }
};
