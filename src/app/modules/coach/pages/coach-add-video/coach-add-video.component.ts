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

  protected startFileUpload(): void {}

  protected onSubmit(): void {
    const video = this.addVideoForm.controls.video.value;

    if (video) {
      const formData = new FormData();
      formData.append('order', this.addVideoForm.controls.order.value!);
      formData.append('video', video);
      formData.append('title', this.addVideoForm.controls.title.value!);
      formData.append('description', this.addVideoForm.controls.description.value!);

      this.submitting = true;

      this.coachCourseService
        .addVideo(this.lessonId, formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Video element added successfully'
            });

            this.ref.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: 'Failed to add video element'
            });

            this.submitting = false;
          }
        });
    }
  }

  protected fileSelected(file: any): void {
    this.addVideoForm.controls.video.markAsDirty();
    this.addVideoForm.controls.video.markAsTouched();

    this.addVideoForm.patchValue({
      video: file
    });
  }
}
