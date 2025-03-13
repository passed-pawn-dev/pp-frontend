import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/Course';
import { CourseService } from '../../service/course.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-coach-courses-list',
  standalone: true,
  imports: [RouterLink, Button],
  providers: [],
  templateUrl: './coach-courses-list.component.html',
  styleUrl: './coach-courses-list.component.scss'
})
export class CoachCoursesListComponent implements OnInit {
  protected courses: Course[] = [];

  public constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.getAll();
  }

  protected getAll(): void {
    this.courseService.getAll().subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (_) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Courses could not be fetched'
        })
    });
  }

  protected deleteCourse(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this course?',
      header: 'Confirm',
      accept: () => {
        this.courseService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Course deleted successfully'
            });
            this.getAll();
          },
          error: (_) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Course failed to delete'
            })
        });
      },
      reject: () => {}
    });
  }
}
