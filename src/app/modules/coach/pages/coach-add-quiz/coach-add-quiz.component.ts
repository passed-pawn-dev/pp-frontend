import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ChessboardEditorComponent } from '../../../shared/components/chessboard-editor/chessboard-editor.component';
import { StepIndicatorComponent } from '../../../shared/components/step-indicator/step-indicator.component';
import {
  AbstractControl,
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
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { TalkingBobComponent } from '../../../shared/components/talking-bob/talking-bob.component';

@Component({
  selector: 'app-coach-add-quiz',
  imports: [
    ChessboardEditorComponent,
    StepIndicatorComponent,
    ReactiveFormsModule,
    TextareaModule,
    RadioButtonModule,
    QuizComponent,
    ValidationErrorsComponent,
    FormsModule,
    TalkingBobComponent
  ],
  templateUrl: './coach-add-quiz.component.html',
  styleUrl: './coach-add-quiz.component.scss'
})
export class CoachAddQuizComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private messageService = inject(MessageService);

  protected lessonId: string | null = null;
  protected includeChessboard: boolean = true;
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
    order: 1,
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

  protected answerBoardAppliedArray: boolean[] = [false, false];

  protected addAnswerToBoardAppliedArray(): void {
    this.answerBoardAppliedArray = [...this.answerBoardAppliedArray, false];
  }

  protected applyToBoardAppliedArray(index: number): void {
    this.answerBoardAppliedArray = this.answerBoardAppliedArray.map((ans, i) =>
      index === i ? false : ans
    );

    setTimeout(() => {
      this.answerBoardAppliedArray = this.answerBoardAppliedArray.map((ans, i) =>
        index === i ? true : ans
      );
    }, 200);
  }

  protected deleteFromBoardAppliedArray(index: number): void {
    this.answerBoardAppliedArray = this.answerBoardAppliedArray.filter(
      (ans, i) => i !== index
    );
  }

  protected tab: number = 1;

  protected showQuizTab(): void {
    this.tab = 1;
  }

  protected showAddingsTab(): void {
    this.tab = 2;
  }

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

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.lessonId = params.get('lessonId')!;
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
    this.addAnswerToBoardAppliedArray();
  }

  protected addPositionToAnswer(answerIdx: number): void {
    const answersArray = this.quizForm.get('answers') as FormArray;
    const answerGroup = answersArray.at(answerIdx) as FormGroup;
    answerGroup.get('newPosition')?.patchValue(this.currentPositionForAnswer);
    this.applyToBoardAppliedArray(answerIdx);
  }

  protected removeAnswer(idx: number): void {
    this.answers.removeAt(idx);
    this.deleteFromBoardAppliedArray(idx);
  }

  protected nextStep(): void {
    this.step++;
  }

  protected prevStep(): void {
    this.step--;
  }

  protected onNewFen(event: string): void {
    this.quiz.fen = event;
  }

  protected submit(): void {
    this.courseService
      .addQuiz(this.lessonId!, this.quiz)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quiz created successfully'
          });
          this.location.back();
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Quiz could not be created'
          });
        }
      });
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

  protected toggleIncludeChessboard(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.includeChessboard = input.checked;
    this.quiz.fen = undefined;
  }
}
