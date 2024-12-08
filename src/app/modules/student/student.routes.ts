import { Route } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { MyCoachesComponent } from './pages/my-coaches/my-coaches.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { MyCourseComponent } from './pages/my-course/my-course.component';
import { LessonDetailsComponent } from './pages/lesson-details/lesson-details.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { MyCoachComponent } from './pages/my-coach/my-coach.component';

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
        component: MyCoachesComponent
      },
      {
        path: 'my-coaches/:id',
        component: MyCoachComponent
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent
      },
      {
        path: 'my-courses/:id',
        component: MyCourseComponent
      },
      {
        path: 'my-courses/:id/lessons',
        component: LessonsComponent,
        children: [
          {
            path: '',
            redirectTo: '1',
            pathMatch: 'full'
          },
          {
            path: ':id',
            component: LessonDetailsComponent
          }
        ]
      },
      {
        path: 'my-games',
        component: MyGamesComponent
      }
    ]
  }
];
