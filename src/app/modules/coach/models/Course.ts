export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  coachName: string;
  averageScore: number;
  eloRangeStart: number | null;
  eloRangeEnd: number | null;
  pictureUrl?: string;
  lessonCount: number;
  elementCount: number;
}
