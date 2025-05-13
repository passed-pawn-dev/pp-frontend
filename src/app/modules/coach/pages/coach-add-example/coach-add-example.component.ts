import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject
} from '@angular/core';
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
import { Arrow } from '../../../shared/models/Arrow';
import { Severity } from '../../../shared/enums/severities.enum';
import { CourseService } from '../../service/course.service';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { NewExample } from '../../models/NewExample';
import { ActivatedRoute } from '@angular/router';

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
export class CoachAddExampleComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected courseService = inject(CourseService);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  protected currentStep: number = 1;

  protected lessonId: string | null = null;

  protected get steps(): FormArray {
    return this.exampleForm.get('steps') as FormArray;
  }

  protected stepPositions: string[] = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  ];

  protected exampleForm = this.fb.group({
    title: ['', Validators.required],
    initialDescription: ['', Validators.required],
    steps: this.fb.array([this.createStep()])
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.lessonId = params.get('lessonId')!;
      });
  }

  private createStep(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      fen: ['', Validators.required],
      arrows: [[]],
      highlights: [[]]
    });
  }

  protected addStep(): void {
    const stepGroup = this.steps.at(this.steps.length - 1) as FormGroup;
    this.steps.push(this.createStep());
    const lastFen = stepGroup.get('fen')?.value;
    this.stepPositions.push(lastFen);
    this.currentStep = this.steps.length;
  }

  protected nextStep(): void {
    this.currentStep++;
  }

  protected prevStep(): void {
    this.currentStep--;
  }

  protected addPositionToStep(fen: string, stepIdx: number): void {
    const stepGroup = this.steps.at(stepIdx) as FormGroup;
    stepGroup.get('fen')?.patchValue(fen);
  }

  protected addArrowsToStep(arrows: Arrow[], stepIdx: number): void {
    const stepGroup = this.steps.at(stepIdx) as FormGroup;
    stepGroup.get('arrows')?.patchValue(arrows);
  }

  protected addHighlightsToStep(
    highlights: Map<number, Severity>,
    stepIdx: number
  ): void {
    const stepGroup = this.steps.at(stepIdx) as FormGroup;
    stepGroup.get('highlights')?.patchValue(highlights);
  }

  protected removeStep(idx: number): void {
    this.steps.removeAt(idx);
    this.stepPositions.splice(idx, 1);
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  protected submit(): void {
    const exampleForm = this.exampleForm.getRawValue();

    const example: NewExample = {
      title: exampleForm.title!,
      initialDescription: exampleForm.title!,
      order: null,
      steps: []
    };

    const steps = this.exampleForm.getRawValue().steps;
    steps.forEach((step, idx) => {
      example.steps.push({
        order: idx + 1,
        fen: step['fen'],
        description: step['description'],
        arrows: step['arrows'],
        highlights: Array.from(step['highlights'], ([position, severity]) => ({
          position,
          severity
        }))
      });
    });

    this.courseService
      .addExample(this.lessonId!, example)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Example created successfully'
          });
          this.location.back();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Example could not be created'
          });
        }
      });
  }
}
