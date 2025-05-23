import { Component, inject, input } from '@angular/core';
import { Course } from '../../models/Course';
import { RouterLink } from '@angular/router';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { StudentPaymentComponent } from '../payment/student-payment.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CourseService } from '../../service/course.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-course-tile',
  standalone: true,
  imports: [RouterLink, StarRatingComponent, CourseDifficultyComponent],
  providers: [DialogService],
  templateUrl: './student-course-tile.component.html',
  styleUrl: './student-course-tile.component.scss'
})
export class StudentCourseTileComponent {
  private dialogService: DialogService = inject(DialogService);
  private courseService: CourseService = inject(CourseService);
  private messageService: MessageService = inject(MessageService);

  public course = input.required<Course>();

  protected clientSecret: string | undefined;
  protected showPaymentModal: boolean = false;

  protected openBuyCourseDialog(): void {
    this.dialogService.open(StudentPaymentComponent, {
      header: `Buy course '${this.course().title}'`,
      closable: true,
      modal: true,
      inputValues: {
        courseId: this.course().id
      }
    });
  }

  protected acquireFreeCourse(): void {
    this.courseService.acquireFreeCourse(this.course().id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have been granted access to this course!'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'There was a problem obtaining the course'
        });
      }
    });
  }
}
