import { Route } from '@angular/router';
import { CoachComponent } from './coach/coach.component';
import { CoachCoursesListComponent } from './pages/coach-courses-list/coach-courses-list.component';
import { CoachMyProfileComponent } from './pages/coach-my-profile/coach-my-profile.component';
import { CoachCourseDetailsComponent } from './pages/coach-course-details/coach-course-details.component';
import { CoachCourseFormComponent } from './pages/coach-course-form/coach-course-form.component';
import { CoachLessonFormComponent } from './pages/coach-lesson-form/coach-lesson-form.component';

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
        path: 'courses/new',
        component: CoachCourseFormComponent
      },
      {
        path: 'courses/:id',
        component: CoachCourseDetailsComponent
      },
      {
        path: 'courses/:id/lessons/new',
        component: CoachLessonFormComponent
      },
      {
        path: 'courses/:id/edit',
        component: CoachCourseFormComponent
      },
      {
        path: 'profile',
        component: CoachMyProfileComponent
      }
    ]
  }
];
