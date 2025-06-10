export interface AddVideoRequestPayload {
  title: string;
  description: string;
  order: number | null;
  videoPublicId: string;
}
