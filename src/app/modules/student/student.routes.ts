import { Route } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { MyCoachesComponent } from './pages/my-coaches/my-coaches.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { MyCourseComponent } from './pages/my-course/my-course.component';
import { LessonDetailsComponent } from './pages/lesson-details/lesson-details.component';

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
        path: 'my-courses',
        component: MyCoursesComponent
      },
      {
        path: 'my-courses/:id',
        component: MyCourseComponent
      },
      {
        path: 'my-courses/:id/lessons/:id',
        component: LessonDetailsComponent
      },
      {
        path: 'my-games',
        component: MyGamesComponent
      }
    ]
  }
];
