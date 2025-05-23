import { Routes } from '@angular/router';

import { loggedInGuard } from './modules/core/guards/logged-in.guard';
import { LandingPageComponent } from './modules/public/landing-page/landing-page.component';
import { StudentRegisterFormComponent } from './modules/student/pages/student-register-form/student-register-form.component';
import { CoachRegisterFormComponent } from './modules/coach/pages/coach-register-form/coach-register-form.component';
import { coachGuard } from './modules/core/guards/coach.guard';
import { studentGuard } from './modules/core/guards/student.guard';
import { NotFoundPageComponent } from './modules/public/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'student/register',
    component: StudentRegisterFormComponent
  },
  {
    path: 'coach/register',
    component: CoachRegisterFormComponent
  },
  {
    path: 'student',
    canActivate: [loggedInGuard, studentGuard],
    loadChildren: () =>
      import('./modules/student/student.routes').then((mod) => mod.STUDENT_ROUTES)
  },
  {
    path: 'coach',
    canActivate: [loggedInGuard, coachGuard],
    loadChildren: () =>
      import('./modules/coach/coach.routes').then((mod) => mod.COACH_ROUTES)
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    canActivate: [loggedInGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
