import { Route } from '@angular/router';
import { CoachComponent } from './coach/coach.component';
import { CoachCoursesListComponent } from './pages/coach-courses-list/coach-courses-list.component';
import { CoachRegisterFormComponent } from './pages/coach-register-form/coach-register-form.component';

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
        path: 'register',
        component: CoachRegisterFormComponent
      }
    ]
  }
];
