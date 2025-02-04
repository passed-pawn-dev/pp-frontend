import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/Course';
import { CourseService } from '../../service/course.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-coach-courses-list',
  standalone: true,
  imports: [RouterLink, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './coach-courses-list.component.html',
  styleUrl: './coach-courses-list.component.scss'
})
export class CoachCoursesListComponent implements OnInit {
  protected courses: Course[] = [];

  public constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getAll();
  }

  protected getAll(): void {
    this.courseService.getAll().subscribe((res) => {
      this.courses = res;
    });
  }

  protected deleteCourse(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this course?',
      header: 'Confirm',
      accept: () => {
        this.courseService.delete(id).subscribe(() => {
          this.getAll();
        });
      },
      reject: () => {}
    });
  }
}
