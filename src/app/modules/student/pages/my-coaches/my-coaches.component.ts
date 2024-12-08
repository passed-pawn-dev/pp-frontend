import { Component } from '@angular/core';
import { coaches } from '../../example-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-coaches',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-coaches.component.html',
  styleUrl: './my-coaches.component.scss'
})
export class MyCoachesComponent {
  protected coaches = coaches;
}
