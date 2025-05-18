export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  coachName: string;
  averageScore: number;
  eloRangeStart: number | null;
  eloRangeEnd: number | null;
  thumbnailUrl?: string;
  lessonCount: number;
  elementCount: number;
}
