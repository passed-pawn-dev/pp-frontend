import { Component, DestroyRef, inject, Input } from '@angular/core';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { CoachCourseService } from '../../services/coach-course.service';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../../shared/validators/file-type-validator';
import { fileSizeValidator } from '../../../shared/validators/file-size-validator';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloudinarySecureUrlResponse } from '../../../shared/models/cloudinary-secure-url-response';
import { FileUploadService } from '../../../shared/services/file-upload.service';

@Component({
  selector: 'app-coach-add-video',
  standalone: true,
  imports: [FileUploadComponent, ValidationErrorsComponent, ReactiveFormsModule],
  templateUrl: './coach-add-video.component.html',
  styleUrl: './coach-add-video.component.scss'
})
export class CoachAddVideoComponent {
  @Input({ required: true }) public lessonId!: string;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private coachCourseService = inject(CoachCourseService);
  private fileUploadService = inject(FileUploadService);
  private destroyRef = inject(DestroyRef);
  private ref = inject(DynamicDialogRef);

  // supported video types in html5
  protected acceptedFileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  protected submitting = false;
  protected addVideoForm = this.fb.group({
    video: [
      null,
      [
        Validators.required,
        fileTypeValidator(
          this.acceptedFileTypes,
          'Please provide a valid video file type, e.g. mp4, webm or ogg'
        ),
        fileSizeValidator(100 * 1024 * 1024)
      ]
    ],
    title: [
      '',
      [Validators.required, Validators.maxLength(100), Validators.minLength(1)]
    ],
    description: [
      '',
      [Validators.required, Validators.maxLength(400), Validators.minLength(1)]
    ],
    order: [null, [Validators.required, Validators.min(1)]]
  });

  private displayVideoUploadErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Fail',
      detail: message
    });
  }

  protected fileSelected(file: any): void {
    this.addVideoForm.controls.video.markAsDirty();
    this.addVideoForm.controls.video.markAsTouched();

    this.addVideoForm.patchValue({
      video: file
    });
  }

  protected onSubmit(): void {
    this.coachCourseService.getSecureUploadUrl().subscribe({
      next: (res: CloudinarySecureUrlResponse) => {
        this.uploadVideo(res);
      },
      error: () => {
        this.displayVideoUploadErrorMessage(
          'There was a problem initializing video upload. Please try again later.'
        );
        this.submitting = false;
      }
    });
  }

  private uploadVideo(res: CloudinarySecureUrlResponse): void {
    const video = this.addVideoForm.controls.video.value;

    if (video) {
      const formData = new FormData();

      formData.append('file', video);
      formData.append('api_key', res.apiKey);
      formData.append('timestamp', res.timestamp);
      formData.append('signature', res.signature);
      formData.append('resource_type', res.resourceType);
      formData.append('folder', res.folder);
      formData.append('access_control', res.accessControl);
      formData.append('invalidate', res.invalidate);
      formData.append('type', res.accessType);

      this.fileUploadService.uploadVideo(formData, res.cloudName).subscribe({
        next: (res: any) => {
          this.uploadForm(res.secure_url, res.public_id);
        },
        error: () => {
          this.displayVideoUploadErrorMessage(
            'There was a problem uploading the video. Please try again later.'
          );
          this.submitting = false;
        }
      });
    }
  }

  private uploadForm(videoUrl: string, videoPublicId: string): void {
    this.submitting = true;

    const playload = {
      order: this.addVideoForm.controls.order.value!,
      title: this.addVideoForm.controls.title.value!,
      description: this.addVideoForm.controls.description.value!,
      videoUrl,
      videoPublicId
    };

    this.coachCourseService
      .addVideo(this.lessonId, playload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'The video element has been added succesfully!'
          });

          this.ref.close();
        },
        error: () => {
          this.displayVideoUploadErrorMessage(
            'There was a problem uploading the video element form.'
          );
          this.submitting = false;
        }
      });
  }
}
