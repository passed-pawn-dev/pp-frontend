import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ChessboardEditorComponent } from '../../../shared/components/chessboard-editor/chessboard-editor.component';
import { StepIndicatorComponent } from '../../../shared/components/step-indicator/step-indicator.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { QuizDetails } from '../../../student/models/QuizDetails';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QuizComponent } from '../../../shared/components/quiz/quiz.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';

@Component({
  selector: 'app-coach-add-quiz-component',
  imports: [
    ChessboardEditorComponent,
    StepIndicatorComponent,
    ReactiveFormsModule,
    TextareaModule,
    RadioButtonModule,
    QuizComponent,
    ValidationErrorsComponent
  ],
  templateUrl: './coach-add-quiz-component.component.html',
  styleUrl: './coach-add-quiz-component.component.scss'
})
export class CoachAddQuizComponentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  protected step: number = 1;
  protected stepNumber: number = 4;
  protected currentPositionForAnswer: string = '';
  protected stepHeaders: string[] = [
    '1. Basic info',
    '2. Base position',
    '3. Question and answers',
    '4. Preview'
  ];
  protected quiz: QuizDetails = {
    title: '',
    question: '',
    answers: [
      { text: '', newPosition: '' },
      { text: '', newPosition: '' }
    ],
    solution: 0
  };

  protected quizForm = this.fb.group({
    title: ['', Validators.required],
    question: ['', Validators.required],
    answers: this.fb.array([this.createAnswer(), this.createAnswer()]),
    solution: [0],
    hint: [''],
    explanation: ['']
  });

  protected get solutionControl(): FormControl<number | null> {
    return this.quizForm.get('solution') as FormControl<number | null>;
  }

  protected get answers(): FormArray {
    return this.quizForm.get('answers') as FormArray;
  }

  public ngOnInit(): void {
    this.quizForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((changes) => {
        this.quiz.title = changes.title!;
        this.quiz.question = changes.question!;
        this.quiz.answers = changes.answers!;
        this.quiz.solution = changes.solution!;
        this.quiz.hint = changes.hint!;
        this.quiz.explanation = changes.explanation!;
      });
  }

  private createAnswer(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      newPosition: ['']
    });
  }

  protected addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  protected addPositionToAnswer(answerIdx: number): void {
    const answersArray = this.quizForm.get('answers') as FormArray;
    const answerGroup = answersArray.at(answerIdx) as FormGroup;
    answerGroup.get('newPosition')?.patchValue(this.currentPositionForAnswer);
  }

  protected removeAnswer(idx: number): void {
    this.answers.removeAt(idx);
  }

  protected nextStep(): void {
    this.step++;
  }

  protected prevStep(): void {
    this.step--;
  }

  protected onNewFen(event: string): void {
    this.quiz.positon = event;
  }

  protected submit(): void {
    // console.log(this.quiz);
  }

  protected newPositionForAnswer(position: string): void {
    this.currentPositionForAnswer = position;
  }

  protected isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.quizForm.get('title')!.valid;
      case 3:
        return (
          this.quizForm.get('question')!.valid &&
          this.answers.controls.every((control) => control.get('text')?.valid)
        );
      default:
        return true;
    }
  }

  protected markStepAsTouched(step: number): void {
    switch (step) {
      case 1:
        this.quizForm.get('title')?.markAsTouched();
        break;
      case 3:
        this.quizForm.get('question')?.markAsTouched();
        this.answers.controls.forEach((control) => {
          control.get('text')?.markAsTouched();
        });
        break;
    }
  }
}
