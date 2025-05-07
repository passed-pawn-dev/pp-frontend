import { Component, computed, inject } from '@angular/core';
import { ChessboardEditorComponent } from '../../../shared/components/chessboard-editor/chessboard-editor.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { StepIndicatorComponent } from '../../../shared/components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-coach-add-example',
  imports: [
    ChessboardEditorComponent,
    ValidationErrorsComponent,
    ReactiveFormsModule,
    StepIndicatorComponent
  ],
  templateUrl: './coach-add-example.component.html',
  styleUrl: './coach-add-example.component.scss'
})
export class CoachAddExampleComponent {
  private fb = inject(FormBuilder);

  protected currentStep: number = 1;

  protected stepNumber = computed(() => this.steps.controls.length);

  protected get steps(): FormArray {
    return this.exampleForm.get('steps') as FormArray;
  }

  protected exampleForm = this.fb.group({
    title: ['', Validators.required],
    initialDescription: ['', Validators.required],
    initialFen: ['', Validators.required],
    steps: this.fb.array([this.createStep()])
  });

  private createStep(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      fen: ['', Validators.required],
      arrows: [[]],
      highlights: [[]]
    });
  }

  protected addStep(): void {
    this.steps.push(this.createStep());
    console.log(this.steps.controls.length);
  }

  protected addPositionToStep(stepIdx: number): void {
    // const stepsArray = this.exampleForm.get('steps') as FormArray;
    // const stepGroup = stepsArray.at(stepIdx) as FormGroup;
    // stepGroup.get('fen')?.patchValue(this.currentPositionForstep);
  }

  protected removeStep(idx: number): void {
    this.steps.removeAt(idx);
  }
}
