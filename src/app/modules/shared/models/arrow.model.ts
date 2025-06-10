import { Severity } from '../enums/severities.enum';

export interface Arrow {
  source: number;
  destination: number;
  severity: Severity;
}

export interface ExampleArrowDto extends Arrow {
  id: string;
}
