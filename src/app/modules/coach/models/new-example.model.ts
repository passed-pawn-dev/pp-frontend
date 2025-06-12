import { Severity } from '../../shared/enums/severities.enum';
import { Arrow } from '../../shared/models/arrow.model';

export interface Highlight {
  position: number;
  severity: Severity;
}

interface Step {
  order: number;
  fen: string;
  description: string;
  arrows: Arrow[];
  highlights: Highlight[];
}

export interface ExampleHighlight extends Highlight {
  id: string;
}

export interface CoachExampleUpsertDto {
  title: string;
  initialDescription: string;
  order: number | null;
  steps: Step[];
}
