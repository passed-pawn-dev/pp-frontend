export const environment = {
  production: false,
  keycloak: {
    authority: 'https://auth-dev.passed-pawn.com',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    realm: 'passed-pawn',
    clientId: 'pp-frontend',
    apiClientId: 'pp-api'
  },
  stripe: {
    publishableKey:
      'pk_test_51MikJiIzKdUh2PVUJDwuSn4OthMvaRFoSgqyIW5UNBoUJn4q6Y7lKPzCSEnK5Hv2SV1wBz6w8UY92oJ0h94NMmU700sDgO95Gf'
  }
};
