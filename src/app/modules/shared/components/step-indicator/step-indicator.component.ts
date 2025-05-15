import { Component, Input, OnChanges, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  imports: [],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss'
})
export class StepIndicatorComponent implements OnChanges {
  // @Input({ required: true }) public stepNumber!: number;
  // @Input({ required: true }) public currentStep!: number;
  public stepNumber = input<number>();
  public currentStep = input<number>();

  protected steps: number[] = [];

  public ngOnChanges(): void {
    this.steps = [...Array(this.stepNumber())].map((_, i) => i + 1);
  }
}
