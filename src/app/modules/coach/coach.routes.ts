import { Route } from '@angular/router';
import { CoachComponent } from './coach.component';
import { CoachCoursesListComponent } from './pages/coach-courses-list/coach-courses-list.component';
import { CoachCourseDetailsComponent } from './pages/coach-course-details/coach-course-details.component';
import { CoachCourseFormComponent } from './pages/coach-course-form/coach-course-form.component';
import { CoachLessonFormComponent } from './pages/coach-lesson-form/coach-lesson-form.component';
import { CoachAddExerciseComponent } from './pages/coach-add-exercise/coach-add-exercise.component';
import { CoachExercisePreviewComponent } from './pages/coach-exercise-preview/coach-exercise-preview.component';
import { coachExerciseResolver } from './resolvers/coach-exercise.resolver';
import { CoachAddQuizComponent } from './pages/coach-add-quiz/coach-add-quiz.component';
import { coachCourseResolver } from './resolvers/coach-course.resolver';
import { CoachAddExampleComponent } from './pages/coach-add-example/coach-add-example.component';
import { CoachVideoPreviewComponent } from './pages/coach-video-preview/coach-video-preview.component';
import { privateVideoPreviewResolver } from '../shared/resolvers/private-video-preview.resolver';

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
        path: 'courses/:courseId/lesson/:lessonId/exercise/add',
        component: CoachAddExerciseComponent
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
        path: 'courses/:courseId/lesson/:lessonId/exercise/:exerciseId',
        component: CoachExercisePreviewComponent,
        resolve: {
          exercise: coachExerciseResolver
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
        path: 'courses/:courseId/lessons/new',
        component: CoachLessonFormComponent
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
