export interface QuizDetails {
  id: string;
  title: string;
  question: string;
  answers: QuizAnswer[];
  solution: number;
  hint?: string;
  positon?: string;
  explanation?: string;
}

interface QuizAnswer {
  text: string;
  move?: string;
  newPosition?: string;
}
