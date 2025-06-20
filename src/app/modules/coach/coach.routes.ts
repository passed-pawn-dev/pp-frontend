import { Route } from '@angular/router';
import { CoachComponent } from './coach.component';
import { CoachCoursesListComponent } from './pages/coach-courses-list/coach-courses-list.component';
import { CoachCourseDetailsComponent } from './pages/coach-course-details/coach-course-details.component';
import { CoachCourseFormComponent } from './pages/coach-course-form/coach-course-form.component';
import { CoachAddPuzzleComponent } from './pages/coach-add-puzzle/coach-add-puzzle.component';
import { CoachAddQuizComponent } from './pages/coach-add-quiz/coach-add-quiz.component';
import { coachCourseResolver } from './resolvers/coach-course.resolver';
import { CoachAddExampleComponent } from './pages/coach-add-example/coach-add-example.component';
import { CoachVideoPreviewComponent } from './pages/coach-video-preview/coach-video-preview.component';
import { privateVideoPreviewResolver } from '../shared/resolvers/private-video-preview.resolver';
import { examplePreviewResolver } from '../shared/resolvers/example-preview.resolver';
import { CoachExampleEditComponent } from './pages/coach-example-edit/coach-example-edit.component';
import { CoachExamplePreviewComponent } from './pages/coach-example-preview/coach-example-preview.component';
import { puzzlePreviewResolver } from '../shared/resolvers/puzzle-preview.resolver';
import { CoachPuzzlePreviewComponent } from './pages/coach-puzzle-preview/coach-puzzle-preview.component';
import { CoachPuzzleEditComponent } from './coach-puzzle-edit/coach-puzzle-edit.component';
import { CoachQuizPreviewComponent } from './pages/coach-quiz-preview/coach-quiz-preview.component';
import { CoachQuizEditComponent } from './pages/coach-quiz-edit/coach-quiz-edit.component';
import { quizPreviewResolver } from '../shared/resolvers/quiz-preview.resolver';

export const COACH_ROUTES: Route[] = [
  {
    path: '',
    component: CoachComponent,
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
      {
        path: 'courses',
        component: CoachCoursesListComponent
      },
      {
        path: 'courses/new',
        component: CoachCourseFormComponent
      },
      {
        path: 'courses/:courseId',
        component: CoachCourseDetailsComponent,
        resolve: {
          course: coachCourseResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/puzzle/add',
        component: CoachAddPuzzleComponent
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/quiz/add',
        component: CoachAddQuizComponent
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/example/add',
        component: CoachAddExampleComponent
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/puzzle/:puzzleId',
        component: CoachPuzzlePreviewComponent,
        resolve: {
          puzzle: puzzlePreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/puzzle/:puzzleId/edit',
        component: CoachPuzzleEditComponent,
        resolve: {
          puzzle: puzzlePreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/example/:exampleId',
        component: CoachExamplePreviewComponent,
        resolve: {
          example: examplePreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/example/:exampleId/edit',
        component: CoachExampleEditComponent,
        resolve: {
          example: examplePreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/video/:videoId',
        component: CoachVideoPreviewComponent,
        resolve: {
          video: privateVideoPreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/quiz/:quizId',
        component: CoachQuizPreviewComponent,
        resolve: {
          quiz: quizPreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/quiz/:quizId/edit',
        component: CoachQuizEditComponent,
        resolve: {
          quiz: quizPreviewResolver
        }
      },
      {
        path: 'courses/:courseId/edit',
        component: CoachCourseFormComponent,
        resolve: {
          course: coachCourseResolver
        }
      }
      // {
      //   path: 'profile',
      //   component: CoachMyProfileComponent
      // }
    ]
  }
];
