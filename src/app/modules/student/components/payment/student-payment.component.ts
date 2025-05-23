import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../../../../environment/environment';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { SseService } from '../../services/sse.service';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-student-payment',
  imports: [DividerModule],
  standalone: true,
  templateUrl: './student-payment.component.html',
  styleUrl: './student-payment.component.scss'
})
export class StudentPaymentComponent implements OnInit {
  @Input({ required: true }) public courseId!: string;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private courseService: CourseService = inject(CourseService);
  private messageService: MessageService = inject(MessageService);
  private sseService: SseService = inject(SseService);
  private ref = inject(DynamicDialogRef);

  private clientSecret: string | null = null;
  private stripe: Stripe | null = null;
  private cardElement: StripeCardElement | null = null;

  public async ngOnInit(): Promise<void> {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_params) => {
        this.courseService
          .getPaymentIntent(this.courseId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (clientSecret) => {
              this.clientSecret = clientSecret;
            },
            error: (_) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'An error occured while preparing payment details'
              });
              this.ref.close();
            }
          });
      });
    this.stripe = (await loadStripe(environment.stripe.publishableKey)) as Stripe;

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  protected async pay(): Promise<void> {
    this.listenForCourseObtainmentNotification();

    if (this.stripe && this.clientSecret && this.cardElement) {
      const result = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.cardElement
        }
      });

      if (result.error) {
        this.sseService.disconnect();

        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Course could not be bought'
        });
      } else if (result.paymentIntent.status === 'succeeded') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Payment successful! You will soon be granted access to the course'
        });
      }
    }
  }

  private listenForCourseObtainmentNotification(): void {
    this.sseService.connect('/api/sse').subscribe({
      next: (_) =>
        this.messageService.add({
          severity: 'info',
          summary: 'You have been granted access to the course'
        })
    });
  }
}
