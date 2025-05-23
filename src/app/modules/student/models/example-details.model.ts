import { Severity } from '../../shared/enums/severities.enum';
import { Arrow } from '../../shared/models/arrow.model';

interface Highlight {
  position: string;
  severity: Severity;
}

interface Step {
  fen: string;
  description: string;
  arrows: Arrow[];
  highlights: Highlight[];
}

export interface ExampleDetails {
  id: string;
  title: string;
  initialDescription: string;
  order: number;
  steps: Step[];
}
