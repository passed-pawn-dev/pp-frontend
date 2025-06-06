export interface CourseVideoElementViewRequestDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly videoPublicId: string;
  readonly temporaryVideoDownloadUrl: string;
}
