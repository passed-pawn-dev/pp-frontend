import { Route } from '@angular/router';
import { CoachComponent } from './coach/coach.component';
import { MyStudentsListComponent } from './pages/my-students-list/my-students-list.component';

export const COACH_ROUTES: Route[] = [
  {
    path: '',
    component: CoachComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-students',
        pathMatch: 'full'
      },
      {
        path: 'my-students',
        component: MyStudentsListComponent
      }
    ]
  }
];
