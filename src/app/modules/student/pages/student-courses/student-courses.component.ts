import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { StudentCourseTileComponent } from '../../components/student-course-tile/student-course-tile.component';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [StudentCourseTileComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent implements OnInit {
  protected courses: Course[] = [];

  public constructor(private courseService: CourseService) {}

  public ngOnInit(): void {
    this.courseService.getAll().subscribe((res) => {
      this.courses = res;
    });
  }
}
