import { Severity } from '../enums/severities.enum';
import { Arrow } from './arrow.model';

interface Highlight {
  position: number;
  severity: Severity;
}

interface Step {
  fen: string;
  description: string;
  arrows: Arrow[];
  highlights: Highlight[];
}

export interface CourseExampleDto {
  id: string;
  title: string;
  initialDescription: string;
  order: number;
  steps: Step[];
}
