export interface StudentVideoElementRequestDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly publicId: string;
  readonly temporaryVideoDownloadUrl: string;
}
