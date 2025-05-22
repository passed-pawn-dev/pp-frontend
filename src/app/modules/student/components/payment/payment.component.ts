import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-payment',
  imports: [],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  private stripe!: Stripe;
  private cardElement!: StripeCardElement;

  @Input({ required: true }) public clientSecret!: string;

  @Output() public paymentStarted = new EventEmitter<void>();
  @Output() public paymentSuccess = new EventEmitter<void>();
  @Output() public paymentFailure = new EventEmitter<string>();

  public async ngOnInit(): Promise<void> {
    this.stripe = (await loadStripe(environment.stripe.publishableKey)) as Stripe;

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  protected async pay(): Promise<void> {
    this.paymentStarted.emit();

    const result = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.cardElement
      }
    });

    if (result.error) {
      this.paymentFailure.emit(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      this.paymentSuccess.emit();
    }
  }
}
