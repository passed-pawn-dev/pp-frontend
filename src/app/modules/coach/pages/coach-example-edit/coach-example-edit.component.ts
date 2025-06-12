import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseExampleDto } from '../../../shared/models/course-example-dto.model';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { Severity } from '../../../shared/enums/severities.enum';
import { Arrow, ExampleArrowDto } from '../../../shared/models/arrow.model';
import { StepIndicatorComponent } from '../../../shared/components/step-indicator/step-indicator.component';
import { ChessboardEditorComponent } from '../../../shared/components/chessboard-editor/chessboard-editor.component';
import {
  CoachExampleUpsertDto,
  ExampleHighlight,
  Highlight
} from '../../models/new-example.model';
import { CoachCourseService } from '../../services/coach-course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-example-edit',
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    StepIndicatorComponent,
    ChessboardEditorComponent
  ],
  templateUrl: './coach-example-edit.component.html',
  styleUrl: './coach-example-edit.component.scss'
})
export class CoachExampleEditComponent {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private nnfb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  protected coachCourseService = inject(CoachCourseService);
  protected currentStep: number = 1;
  private exampleElementData: CourseExampleDto = this.route.snapshot.data['example'];
  private exampleId = this.route.snapshot.paramMap.get('exampleId');
  protected initialHighlights = this.exampleElementData.steps.map((step) =>
    this.getHighlightsMap(step.highlights as unknown as ExampleHighlight[])
  );

  protected initialArrows = this.exampleElementData.steps.map(
    (step) => step.arrows as unknown as ExampleArrowDto[]
  );
  protected exampleForm = this.nnfb.group({
    title: [this.exampleElementData.title, Validators.required],
    initialDescription: [
      this.exampleElementData.initialDescription,
      Validators.required
    ],
    steps: this.nnfb.array(
      this.exampleElementData.steps.map((step) =>
        this.nnfb.group({
          ...step,
          highlights: this.nnfb.array(step.highlights),
          arrows: this.nnfb.array(step.arrows)
        })
      )
    )
  });

  protected get steps(): FormArray {
    return this.exampleForm.get('steps') as FormArray;
  }

  protected stepPositions: string[] = this.exampleElementData.steps.map(
    (step) => step.fen
  );

  private createStep(): FormGroup {
    return this.nnfb.group({
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
    const arrowArray = stepGroup.get('arrows') as FormArray;

    arrowArray.clear();

    arrows.forEach((arrow) => arrowArray.push(this.nnfb.control(arrow)));
  }

  protected addHighlightsToStep(
    highlights: Map<number, Severity>,
    stepIdx: number
  ): void {
    const stepGroup = this.steps.at(stepIdx) as FormGroup;
    const highlightArray = stepGroup.get('highlights') as FormArray;

    highlightArray.clear();

    this.mapToHighlights(highlights).forEach((highlight) =>
      highlightArray.push(this.nnfb.control(highlight))
    );
  }

  protected removeStep(idx: number): void {
    this.steps.removeAt(idx);
    this.stepPositions.splice(idx, 1);
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  protected getHighlightsMap(highlights: ExampleHighlight[]): Map<number, Severity> {
    return highlights.reduce((map, highlight) => {
      map.set(highlight.position, highlight.severity);
      return map;
    }, new Map<number, Severity>());
  }

  protected mapToHighlights(inputMap: Map<number, Severity>): Highlight[] {
    return Array.from(inputMap, ([position, severity]) => ({ position, severity }));
  }

  protected submit(): void {
    const exampleForm = this.exampleForm.getRawValue();
    const example: CoachExampleUpsertDto = {
      order: this.exampleElementData.order,
      title: exampleForm.title,
      initialDescription: exampleForm.initialDescription,
      steps: exampleForm.steps.map((step, idx) => ({
        order: idx + 1,
        fen: step.fen,
        description: step.description,
        arrows: step.arrows,
        highlights: step.highlights
      }))
    };

    this.coachCourseService
      .editExample(this.exampleId!, example)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Example edited successfully'
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Example could not be edited'
          });
        }
      });
  }
}
