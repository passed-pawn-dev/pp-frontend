export interface Course {
  id: string;
  title: string;
  description: string;
  eloRangeStart: number | null;
  eloRangeEnd: number | null;
  coachName: string;
  coachPfpUrl: string | null;
  thumbnailUrl?: string;
  price: number;
  averageScore: number;
  isBought: boolean;
}
