import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fileTypeValidator } from '../../../shared/validators/file-type-validator';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoachCourseService } from '../../services/coach-course.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloudinarySecureUrlResponse } from '../../../shared/models/cloudinary-secure-url-response';
import { FileHandlingService } from '../../../shared/services/file-handling.service';

@Component({
  selector: 'app-coach-add-course-thumbnail',
  imports: [FileUploadComponent, ValidationErrorsComponent, ReactiveFormsModule],
  templateUrl: './coach-add-course-thumbnail.component.html',
  styleUrl: './coach-add-course-thumbnail.component.scss'
})
export class CoachAddCourseThumbnailComponent {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private coachCourseService = inject(CoachCourseService);
  private readonly route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private ref = inject(DynamicDialogRef);
  private fileHandlingService = inject(FileHandlingService);

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
    this.submitting = true;
    this.coachCourseService.getCourseThumbnailUploadSignature().subscribe({
      next: (res: CloudinarySecureUrlResponse) => {
        this.uploadThumbnail(res);
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
  }

  private uploadThumbnail(res: CloudinarySecureUrlResponse): void {
    const thumbnail = this.uploadForm.controls.thumbnail.value;

    if (thumbnail) {
      const formData = new FormData();
      formData.append('file', thumbnail);
      formData.append('api_key', res.apiKey);
      formData.append('timestamp', res.timestamp);
      formData.append('signature', res.signature);
      formData.append('resource_type', res.resourceType);
      formData.append('folder', res.folder);
      formData.append('access_control', res.accessControl);
      formData.append('invalidate', res.invalidate);
      formData.append('type', res.accessType);

      this.fileHandlingService
        .uploadThumbnail(formData, res.cloudName)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.updateThumbnail(res.public_id, res.secure_url);
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
    }
  }

  private updateThumbnail(thumbnailPublicId: string, thumbnailUrl: string): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const courseId = params.get('courseId')!;
        this.coachCourseService
          .updateThumbnail(courseId, {
            photoPublicId: thumbnailPublicId,
            photoUrl: thumbnailUrl
          })
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

  // TODO - change type to file: File in pair with adding explicit typing to FormGroup
  protected fileSelected(file: any): void {
    this.uploadForm.markAsDirty();
    this.uploadForm.markAsTouched();

    this.uploadForm.patchValue({
      thumbnail: file
    });
  }
}
