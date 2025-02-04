import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoachNavbarComponent } from '../component/coach-navbar/coach-navbar.component';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [RouterOutlet, CoachNavbarComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss'
})
export class CoachComponent {}
