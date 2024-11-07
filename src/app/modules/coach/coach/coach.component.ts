import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss'
})
export class CoachComponent {}
