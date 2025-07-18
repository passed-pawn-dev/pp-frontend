import { Component, computed, input } from '@angular/core';
import { FormErrors } from '../../models/form-errors.model';
import { FileSizePipe } from '../../pipes/file-size.pipe';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [FileSizePipe],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss'
})
export class ValidationErrorsComponent {
  public errors = input.required<FormErrors | null>();
  public touched = input.required<boolean>();
  public dirty = input.required<boolean>();

  private markedForCheck = computed(() => {
    return this.touched() && this.dirty() && this.errors() !== null;
  });

  private requiredError = computed(() => this.errors()?.required);
  private emailError = computed(() => this.errors()?.email);
  private maxlengthError = computed(() => this.errors()?.maxlength);
  private minLengthError = computed(() => this.errors()?.minlength);
  private minValueError = computed(() => this.errors()?.min);
  private maxValueError = computed(() => this.errors()?.max);
  private fileTypeError = computed(() => this.errors()?.fileType);
  private fileSizeError = computed(() => this.errors()?.fileSize);

  protected state = {
    markedForCheck: this.markedForCheck,
    requiredError: this.requiredError,
    emailError: this.emailError,
    maxlengthError: this.maxlengthError,
    minLengthError: this.minLengthError,
    minValueError: this.minValueError,
    maxValueError: this.maxValueError,
    fileTypeError: this.fileTypeError,
    fileSizeError: this.fileSizeError
  };
}
