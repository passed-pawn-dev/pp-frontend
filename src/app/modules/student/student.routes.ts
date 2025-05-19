import { Route } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentMyCoursesComponent } from './pages/student-my-courses/student-my-courses.component';
import { StudentMyCourseComponent } from './pages/student-my-course/student-my-course.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { StudentCourseComponent } from './pages/student-course/student-course.component';
import { StudentSolveExerciseComponent } from './pages/student-solve-exercise/student-solve-exercise.component';
import { studentExerciseResolver } from './resolvers/student-exercise.resolver';
import { StudentSolveQuizComponent } from './pages/student-solve-quiz/student-solve-quiz.component';
import { studentQuizResolver } from './resolvers/student-quiz.resolver';
import { studentBoughtCourseResolver } from './resolvers/student-bought-course.resolver';
import { studentCourseResolver } from './resolvers/student-course.resolver';
import { StudentExampleComponent } from './pages/student-example/student-example.component';
import { studentExampleResolver } from './resolvers/student-example.resolver';
import { StudentCoachProfileComponent } from './pages/student-coach-profile/student-coach-profile.component';
import { studentCoachProfileResolver } from './resolvers/student-coach-profile.resolver';

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
      // {
      //   path: 'my-coaches',
      //   component: StudentMyCoachesComponent
      // },
      // {
      //   path: 'my-coaches/:id',
      //   component: StudentMyCoachComponent
      // },
      {
        path: 'my-courses',
        component: StudentMyCoursesComponent
      },
      {
        path: 'my-courses/:id',
        component: StudentMyCourseComponent,
        resolve: {
          course: studentBoughtCourseResolver
        }
      },
      // {
      //   path: 'my-courses/:id/lessons',
      //   component: StudentLessonsComponent,
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: '1',
      //       pathMatch: 'full'
      //     },
      //     {
      //       path: ':id',
      //       component: StudentLessonDetailsComponent
      //     }
      //   ]
      // },
      {
        path: 'my-courses/:id/lesson/:lessonId/puzzle/:exerciseId',
        component: StudentSolveExerciseComponent,
        resolve: {
          exercise: studentExerciseResolver
        }
      },
      {
        path: 'my-courses/:id/lesson/:lessonId/quiz/:quizId',
        component: StudentSolveQuizComponent,
        resolve: {
          quiz: studentQuizResolver
        }
      },
      {
        path: 'my-courses/:id/lesson/:lessonId/example/:exampleId',
        component: StudentExampleComponent,
        resolve: {
          example: studentExampleResolver
        }
      },
      // {
      //   path: 'my-games',
      //   component: StudentMyGamesComponent
      // },
      {
        path: 'courses',
        component: StudentCoursesComponent
      },
      {
        path: 'courses/:id',
        component: StudentCourseComponent,
        resolve: {
          course: studentCourseResolver
        }
      },
      {
        path: 'coach/:id/profile',
        component: StudentCoachProfileComponent,
        resolve: {
          coachProfile: studentCoachProfileResolver
        }
      }
      // {
      //   path: 'profile',
      //   component: StudentMyProfileComponent
      // }
    ]
  }
];
