import { Route } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentMyCoursesComponent } from './pages/student-my-courses/student-my-courses.component';
import { StudentMyCourseComponent } from './pages/student-my-course/student-my-course.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { StudentCourseComponent } from './pages/student-course/student-course.component';
import { StudentSolvePuzzleComponent } from './pages/student-solve-puzzle/student-solve-puzzle.component';
import { studentPuzzleResolver } from './resolvers/student-puzzle.resolver';
import { StudentSolveQuizComponent } from './pages/student-solve-quiz/student-solve-quiz.component';
import { studentBoughtCourseResolver } from './resolvers/student-bought-course.resolver';
import { studentCourseResolver } from './resolvers/student-course.resolver';
import { StudentExampleComponent } from './pages/student-example/student-example.component';
import { studentExampleResolver } from './resolvers/student-example.resolver';
import { StudentCoachProfileComponent } from './pages/student-coach-profile/student-coach-profile.component';
import { studentCoachProfileResolver } from './resolvers/student-coach-profile.resolver';
import { StudentVideoComponent } from './pages/student-video/student-video.component';
import { privateVideoPreviewResolver } from '../shared/resolvers/private-video-preview.resolver';
import { quizPreviewResolver } from '../shared/resolvers/quiz-preview.resolver';

export const STUDENT_ROUTES: Route[] = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-courses',
        pathMatch: 'full'
      },
      {
        path: 'my-courses',
        component: StudentMyCoursesComponent
      },
      {
        path: 'my-courses/:courseId',
        component: StudentMyCourseComponent,
        resolve: {
          course: studentBoughtCourseResolver
        }
      },
      {
        path: 'my-courses/:courseId/lesson/:lessonId/puzzle/:puzzleId',
        component: StudentSolvePuzzleComponent,
        resolve: {
          puzzle: studentPuzzleResolver
        }
      },
      {
        path: 'my-courses/:courseId/lesson/:lessonId/quiz/:quizId',
        component: StudentSolveQuizComponent,
        resolve: {
          quiz: quizPreviewResolver
        }
      },
      {
        path: 'my-courses/:courseId/lesson/:lessonId/example/:exampleId',
        component: StudentExampleComponent,
        resolve: {
          example: studentExampleResolver
        }
      },
      {
        path: 'my-courses/:courseId/lesson/:lessonId/video/:videoId',
        component: StudentVideoComponent,
        resolve: {
          video: privateVideoPreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/puzzle/:puzzleId',
        component: StudentSolvePuzzleComponent,
        resolve: {
          puzzle: studentPuzzleResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/quiz/:quizId',
        component: StudentSolveQuizComponent,
        resolve: {
          quiz: quizPreviewResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/example/:exampleId',
        component: StudentExampleComponent,
        resolve: {
          example: studentExampleResolver
        }
      },
      {
        path: 'courses/:courseId/lesson/:lessonId/video/:videoId',
        component: StudentVideoComponent,
        resolve: {
          video: privateVideoPreviewResolver
        }
      },
      {
        path: 'courses',
        component: StudentCoursesComponent
      },
      {
        path: 'courses/:courseId',
        component: StudentCourseComponent,
        resolve: {
          course: studentCourseResolver
        }
      },
      {
        path: 'coach/:coachId/profile',
        component: StudentCoachProfileComponent,
        resolve: {
          coachProfile: studentCoachProfileResolver
        }
      }
    ]
  }
];
