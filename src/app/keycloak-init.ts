import { KeycloakService } from "keycloak-angular";
import { environment } from "../../environment/environment";

export const initializeKeycloak = (keycloak: KeycloakService) => async () =>
  keycloak.init({
    config: {
      url: environment.keycloak.authority,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
      window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
      redirectUri: environment.keycloak.redirectUri,
    },
  });
