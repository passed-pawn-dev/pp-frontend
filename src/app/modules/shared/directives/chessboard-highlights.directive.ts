import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { Severity } from '../enums/severities.enum';

@Directive({
  selector: '[appChessboardHighlights]'
})
export class ChessboardHighlightsDirective implements AfterViewInit, OnChanges {
  private el = inject(ElementRef);

  @Input() public appChessboardHighlights: Map<number, Severity> | null = new Map();

  private severityToColors: Map<Severity, string[]> = new Map([
    [Severity.Warning, ['#ffcb29', '#ffdf2e']],
    [Severity.Danger, ['#d40000', '#ff3333']],
    [Severity.Info, ['#008cff', '#38b6ff']],
    [Severity.Correct, ['#39aa67', '#51ce77']]
  ]);

  public ngAfterViewInit(): void {
    this.setHighlights();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.appChessboardHighlights == null) {
      this.appChessboardHighlights = new Map([]);
    }
    this.setHighlights();
  }

  private isWhite(fieldIndex: number): boolean {
    const row = Math.floor(fieldIndex / 8);
    const col = fieldIndex % 8;
    return (row + col) % 2 === 0;
  }

  private setHighlights(): void {
    const children: HTMLCollectionOf<HTMLElement> = this.el.nativeElement.children;

    Array.from(children).forEach((field: HTMLElement, index: number) => {
      if (this.appChessboardHighlights!.has(index)) {
        const severity = this.appChessboardHighlights!.get(index)!;
        const color: string = this.isWhite(index)
          ? this.severityToColors.get(severity)![1]
          : this.severityToColors.get(severity)![0];
        field.style.backgroundColor = color;
      } else {
        field.style.backgroundColor = '';
      }
    });
  }
}
