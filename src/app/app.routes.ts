import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { LandingPageComponent } from './modules/public/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.routes').then((mod) => mod.STUDENT_ROUTES)
  },
  {
    path: 'coach',
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
