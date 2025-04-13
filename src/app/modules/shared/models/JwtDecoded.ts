export interface JwtDecoded {
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
}
