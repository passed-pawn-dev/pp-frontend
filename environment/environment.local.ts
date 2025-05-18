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
      'pk_test_51MikJiIzKdUh2PVUJDwuSn4OthMvaRFoSgqyIW5UNBoUJn4q6Y7lKPzCSEnK5Hv2SV1wBz6w8UY92oJ0h94NMmU700sDgO95Gf'
  }
};
