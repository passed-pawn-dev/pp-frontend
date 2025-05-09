import { Severity } from '../../shared/enums/severities.enum';
import { Arrow } from '../../shared/models/Arrow';

interface Highlight {
  position: string;
  severity: Severity;
}

interface Step {
  order: number;
  fen: string;
  description: string;
  arrows: Arrow[];
  highlights: Highlight[];
}

export interface NewExample {
  title: string;
  initialDescription: string;
  order: number;
  steps: Step[];
}
