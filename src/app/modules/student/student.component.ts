import { Component, OnInit } from '@angular/core';
import { StudentNavbarComponent } from './components/student-navbar/student-navbar.component';
import { RouterOutlet } from '@angular/router';
import { SseService } from './service/sse.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentNavbarComponent, RouterOutlet],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  public constructor(private sseService: SseService) {}

  public ngOnInit(): void {
    this.sseService.connect('/api/sse').subscribe({
      next: (message) => console.log(message)
    });
  }
}
