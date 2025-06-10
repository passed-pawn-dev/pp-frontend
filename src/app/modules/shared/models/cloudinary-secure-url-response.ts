export interface CloudinarySecureUrlResponse {
  readonly timestamp: string;
  readonly signature: string;
  readonly apiKey: string;
  readonly cloudName: string;
  readonly folder: string;
  readonly resourceType: string;
  readonly accessType: string;
  readonly accessControl: string;
  readonly invalidate: string;
}
