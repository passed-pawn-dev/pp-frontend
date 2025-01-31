import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';
import { myCourses } from '../../example-data';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-student-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-my-courses.component.html',
  styleUrl: './student-my-courses.component.scss'
})
export class StudentMyCoursesComponent implements OnInit {
  protected courses: MyCourse[] = [];

  public constructor(private courseService: CourseService) {}

  public ngOnInit(): void {
    this.courseService.getAll().subscribe((res) => {
      console.log(res);
    });
  }
}
