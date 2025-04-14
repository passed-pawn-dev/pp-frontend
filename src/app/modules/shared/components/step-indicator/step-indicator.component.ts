import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  imports: [],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss'
})
export class StepIndicatorComponent implements OnInit {
  @Input({ required: true }) public stepNumber!: number;
  @Input({ required: true }) public currentStep!: number;

  protected steps: number[] = [];

  public ngOnInit(): void {
    this.steps = [...Array(this.stepNumber)].map((_, i) => i + 1);
  }
}
