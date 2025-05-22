import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fileTypeValidator } from '../../../shared/validators/file-type-validator';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseService } from '../../service/course.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-coach-add-course-thumbnail',
  imports: [FileUploadComponent, ValidationErrorsComponent, ReactiveFormsModule],
  templateUrl: './coach-add-course-thumbnail.component.html',
  styleUrl: './coach-add-course-thumbnail.component.scss'
})
export class CoachAddCourseThumbnailComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private ref = inject(DynamicDialogRef);

  protected submitting = false;

  protected acceptedFileTypes = ['image/*'];
  protected uploadForm = this.fb.group({
    thumbnail: [
      null,
      [
        Validators.required,
        fileTypeValidator(
          this.acceptedFileTypes,
          'Please provide a valid image file type, e.g. png, jpg, jpeg'
        )
      ]
    ]
  });

  protected onSubmit(): void {
    const thumbnail = this.uploadForm.controls.thumbnail.value;

    if (thumbnail) {
      const formData = new FormData();
      formData.append('thumbnail', thumbnail);

      this.route.paramMap
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((params) => {
          const courseId = params.get('courseId')!;
          this.courseService
            .updateThumbnail(courseId, formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Thumbnail updated successfully'
                });

                this.ref.close();
              },
              error: () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Fail',
                  detail: 'Failed to update thumbnail'
                });

                this.submitting = false;
              }
            });
        });
    }
  }

  // TODO - change type to file: File in pair with adding explicit typing to FormGroup
  protected fileSelected(file: any): void {
    this.uploadForm.markAsDirty();
    this.uploadForm.markAsTouched();

    this.uploadForm.patchValue({
      thumbnail: file
    });
  }
}
