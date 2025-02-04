import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';

import { CourseService } from '../../service/course.service';
import { Course } from '../../models/Course';

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
    this.courseService.getAllBought().subscribe((res) => {
      this.courses = res;
      console.log(res)
    
    });
  }
}
