import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';
import { myCourses } from '../../example-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-my-courses.component.html',
  styleUrl: './student-my-courses.component.scss'
})
export class StudentMyCoursesComponent implements OnInit {
  protected courses: MyCourse[] = [];
  protected httpClient: HttpClient = inject(HttpClient);

  public ngOnInit(): void {
    this.httpClient.get('http://localhost:5500/api/course').subscribe((res) => {
      console.log(res);
    });
  }
}
