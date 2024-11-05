import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { loggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
