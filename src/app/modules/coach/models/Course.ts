export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  coachName: string;
  averageScore: number;
  eloRangeStart: number;
  eloRangeEnd: number;
  pictureUrl?: string;
  lessonCount: number;
  elementCount: number;
}
