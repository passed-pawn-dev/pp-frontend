import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss'
})
export class ValidationErrorsComponent {
  @Input({ required: true }) public control!: AbstractControl | null;

  protected get markedForCheck(): boolean {
    return (
      this.control!.touched && this.control!.dirty && this.control!.errors !== null
    );
  }
  protected get requiredError(): boolean {
    return this.control!.hasError('required');
  }

  protected get maxlengthError(): boolean {
    return this.control!.hasError('maxlength');
  }

  protected get minLengthError(): boolean {
    return this.control!.hasError('minlength');
  }

  protected get emailError(): boolean {
    return this.control!.hasError('email');
  }

  protected get minValueError(): boolean {
    return this.control!.hasError('min');
  }
}
