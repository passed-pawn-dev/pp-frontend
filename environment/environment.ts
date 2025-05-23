export const environment = {
  production: false,
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
      'pk_test_51MikJiIzKdUh2PVUJDwuSn4OthMvaRFoSgqyIW5UNBoUJn4q6Y7lKPzCSEnK5Hv2SV1wBz6w8UY92oJ0h94NMmU700sDgO95Gf'
  }
};
