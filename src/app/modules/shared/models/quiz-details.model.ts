import { TLastMove } from '../../../chess-logic/models';

export interface QuizDetails {
  id?: string;
  order?: number;
  title: string;
  question: string;
  answers: QuizAnswer[];
  solution: number;
  hint?: string;
  fen?: string;
  explanation?: string;
}

export interface QuizAnswer {
  text: string;
  lastMove?: TLastMove;
  newPosition?: string;
}
