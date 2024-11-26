import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {}
