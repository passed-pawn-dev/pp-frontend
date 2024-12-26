import { Component } from '@angular/core';
import { coaches } from '../../example-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-my-coaches',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-my-coaches.component.html',
  styleUrl: './student-my-coaches.component.scss'
})
export class StudentMyCoachesComponent {
  protected coaches = coaches;
}
