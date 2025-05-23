import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentQuizResolver } from './student-quiz.resolver';
import { QuizDetails } from '../models/quiz-details.model';

describe('studentQuizResolver', () => {
  const executeResolver: ResolveFn<QuizDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => studentQuizResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
