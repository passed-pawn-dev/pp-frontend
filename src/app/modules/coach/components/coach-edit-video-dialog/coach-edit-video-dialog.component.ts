import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { CoachCourseService } from '../../services/coach-course.service';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { fileTypeValidator } from '../../../shared/validators/file-type-validator';
import { fileSizeValidator } from '../../../shared/validators/file-size-validator';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloudinarySecureUrlResponse } from '../../../shared/models/cloudinary-secure-url-response';
import { FileHandlingService } from '../../../shared/services/file-handling.service';
import { PrivateVideoPlayerComponent } from '../../../shared/components/private-video-player/private-video-player.component';
import { CoachLessonVideoElementData } from '../../models/coach-lesson-video-element-data';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-coach-edit-video-dialog',
  standalone: true,
  imports: [
    FileUploadComponent,
    ValidationErrorsComponent,
    ReactiveFormsModule,
    PrivateVideoPlayerComponent,
    InputNumber
  ],
  templateUrl: './coach-edit-video-dialog.component.html',
  styleUrl: './coach-edit-video-dialog.component.scss'
})
export class CoachEditVideoDialogComponent implements OnInit {
  @Input({ required: true })
  public lessonVideoElementData!: CoachLessonVideoElementData;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private coachCourseService = inject(CoachCourseService);
  private fileHandlingService = inject(FileHandlingService);
  private destroyRef = inject(DestroyRef);
  private ref = inject(DynamicDialogRef);

  // supported video types in html5
  protected acceptedFileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  protected submitting = false;
  protected editVideoForm: FormGroup<{
    video: FormControl<null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    order: FormControl<number | null>;
  }> | null = null;

  public ngOnInit(): void {
    this.editVideoForm = this.fb.group({
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
        this.lessonVideoElementData.title,
        [Validators.required, Validators.maxLength(100), Validators.minLength(1)]
      ],
      description: [
        this.lessonVideoElementData.description,
        [Validators.required, Validators.maxLength(400), Validators.minLength(1)]
      ],
      order: [
        this.lessonVideoElementData.order,
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  private displayVideoUploadErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Fail',
      detail: message
    });
  }

  protected fileSelected(file: any): void {
    if (this.editVideoForm === null) return;

    this.editVideoForm.controls.video.markAsDirty();
    this.editVideoForm.controls.video.markAsTouched();

    this.editVideoForm.patchValue({
      video: file
    });
  }

  protected onSubmit(): void {
    this.coachCourseService.getVideoUploadSignature().subscribe({
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
    if (this.editVideoForm === null) return;

    const video = this.editVideoForm.controls.video.value;

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

      this.fileHandlingService.uploadVideo(formData, res.cloudName).subscribe({
        next: (res: any) => {
          this.uploadForm(res.public_id);
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

  private uploadForm(videoPublicId: string): void {
    if (this.editVideoForm === null) return;

    this.submitting = true;

    const payload = {
      order: this.editVideoForm.controls.order.value!,
      title: this.editVideoForm.controls.title.value!,
      description: this.editVideoForm.controls.description.value!,
      videoPublicId
    };

    this.coachCourseService
      .editVideo(this.lessonVideoElementData.videoId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'The video element has been updated successfully!'
          });

          this.ref.close('success');
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
