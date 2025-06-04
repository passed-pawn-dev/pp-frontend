export interface AddVideoRequestPayload {
  title: string;
  description: string;
  order: number | null;
  videoUrl: string;
  videoPublicId: string;
}
