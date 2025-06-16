import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizPreviewResolver } from './quiz-preview.resolver';
import { QuizDetails } from '../models/quiz-details.model';

describe('quizPreviewResolver', () => {
  const executeResolver: ResolveFn<QuizDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => quizPreviewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
