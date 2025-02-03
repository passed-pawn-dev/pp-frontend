import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { LandingPageComponent } from './modules/public/landing-page/landing-page.component';
import { StudentRegisterFormComponent } from './modules/student/pages/student-register-form/student-register-form.component';
import { CoachRegisterFormComponent } from './modules/coach/pages/coach-register-form/coach-register-form.component';

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
    canActivate: [loggedInGuard],
    loadChildren: () =>
      import('./modules/student/student.routes').then((mod) => mod.STUDENT_ROUTES)
  },
  {
    path: 'coach',
    canActivate: [loggedInGuard],
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
