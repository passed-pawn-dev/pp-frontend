import { Component, inject, input } from '@angular/core';
import { Course } from '../../models/course.model';
import { RouterLink } from '@angular/router';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { StudentPaymentComponent } from '../payment/student-payment.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CourseService } from '../../services/course.service';
import { MessageService } from 'primeng/api';
import { SseService } from '../../service/sse.service';
import { Dialog } from 'primeng/dialog';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-student-course-tile',
  standalone: true,
  imports: [
    RouterLink,
    StarRatingComponent,
    CourseDifficultyComponent,
    Dialog,
    PaymentComponent
  ],
  templateUrl: './student-course-tile.component.html',
  styleUrl: './student-course-tile.component.scss'
})
export class StudentCourseTileComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private courseService: CourseService = inject(CourseService);
  private messageService: MessageService = inject(MessageService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private sseService: SseService = inject(SseService);

  public course = input.required<Course>();

  protected clientSecret: string | undefined;
  protected showPaymentModal: boolean = false;
  protected courseBought: boolean = false;

  protected buyCourse(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_params) => {
        this.courseService
          .getPaymentIntent(this.course().id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (clientSecret) => {
              this.clientSecret = clientSecret;
              this.showPaymentModal = true;
            },
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Course could not be bought'
              })
          });
      });
  }

  protected paymentModalClosed(): void {
    this.showPaymentModal = false;
    this.clientSecret = undefined;
  }

  protected paymentSuccessful(): void {
    this.showPaymentModal = false;
    this.clientSecret = undefined;
    this.courseBought = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Payment successful! Course will be added to your list shortly'
    });
  }

  protected paymentAttempted(): void {
    this.sseService.connect('/api/sse').subscribe({
      next: (_) =>
        this.messageService.add({
          severity: 'info',
          summary: 'Course has been added to list'
        })
    });
  }

  protected paymentFailed(details: string): void {
    this.sseService.disconnect();

    this.messageService.add({
      severity: 'error',
      summary: 'Failure',
      detail: details
    });
  }
}
