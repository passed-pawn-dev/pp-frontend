import { Component } from '@angular/core';
import { StudentNavbarComponent } from './components/student-navbar/student-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentNavbarComponent, RouterOutlet],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {}
