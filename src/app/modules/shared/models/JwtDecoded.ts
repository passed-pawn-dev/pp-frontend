export interface JwtDecoded {
  resource_access: {
    'api-client'?: {
      roles: string[];
    };
  };
}
