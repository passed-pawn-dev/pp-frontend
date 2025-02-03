import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/Course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-coach-courses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-courses-list.component.html',
  styleUrl: './coach-courses-list.component.scss'
})
export class CoachCoursesListComponent implements OnInit {
  protected courses: Course[] = [];

  public constructor(private courseService: CourseService) {}

  public ngOnInit(): void {
    this.getAll();
  }

  protected getAll(): void {
    this.courseService.getAll().subscribe((res) => {
      this.courses = res;
    });
  }

  protected deleteCourse(id: string): void {
    this.courseService.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
