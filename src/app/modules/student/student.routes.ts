import { Route } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentMyCoachesComponent } from './pages/student-my-coaches/student-my-coaches.component';
import { StudentMyCoursesComponent } from './pages/student-my-courses/student-my-courses.component';
import { StudentMyGamesComponent } from './pages/student-my-games/student-my-games.component';
import { StudentMyCourseComponent } from './pages/student-my-course/student-my-course.component';
import { StudentLessonDetailsComponent } from './pages/student-lesson-details/student-lesson-details.component';
import { StudentLessonsComponent } from './pages/student-lessons/student-lessons.component';
import { StudentMyCoachComponent } from './pages/student-my-coach/student-my-coach.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { StudentCourseComponent } from './pages/student-course/student-course.component';
import { StudentMyProfileComponent } from './pages/student-my-profile/student-my-profile.component';
import { StudentSolveExerciseComponent } from './pages/student-solve-exercise/student-solve-exercise.component';

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
        path: 'my-coaches',
        component: StudentMyCoachesComponent
      },
      {
        path: 'my-coaches/:id',
        component: StudentMyCoachComponent
      },
      {
        path: 'my-courses',
        component: StudentMyCoursesComponent
      },
      {
        path: 'my-courses/:id',
        component: StudentMyCourseComponent
      },
      {
        path: 'my-courses/:id/lessons',
        component: StudentLessonsComponent,
        children: [
          {
            path: '',
            redirectTo: '1',
            pathMatch: 'full'
          },
          {
            path: ':id',
            component: StudentLessonDetailsComponent
          }
        ]
      },
      {
        path: 'my-courses/:id/lesson/:lessonId/exercise/:exerciseId',
        component: StudentSolveExerciseComponent
      },
      {
        path: 'my-games',
        component: StudentMyGamesComponent
      },
      {
        path: 'courses',
        component: StudentCoursesComponent
      },
      {
        path: 'courses/:id',
        component: StudentCourseComponent
      },
      {
        path: 'profile',
        component: StudentMyProfileComponent
      }
    ]
  }
];
