import { ElementKind } from '../../shared/enums/element-kind.enum';

export interface Element {
  id: string;
  title: string;
  order: number;
  kind: ElementKind;
}
