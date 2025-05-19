import { Component, DestroyRef, inject, Input } from '@angular/core';
import { CoachUploadImageComponent } from '../../components/coach-upload-image/coach-upload-image.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseService } from '../../service/course.service';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fileTypeValidator } from '../../../shared/validators/file-type-validator';

@Component({
  selector: 'app-coach-add-video',
  standalone: true,
  imports: [CoachUploadImageComponent, ValidationErrorsComponent, ReactiveFormsModule],
  templateUrl: './coach-add-video.component.html',
  styleUrl: './coach-add-video.component.scss'
})
export class CoachAddVideoComponent {
  @Input({ required: true }) public lessonId!: string;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  protected acceptedFileTypes = ['video/*'];
  protected addVideoForm = this.fb.group({
    video: [
      null,
      [
        Validators.required,
        fileTypeValidator(
          this.acceptedFileTypes,
          'Please provide a valid video file type, e.g. mp4, mkv'
        )
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

  protected onSubmit(): void {
    const video = this.addVideoForm.controls.video.value;

    if (video) {
      const formData = new FormData();
      formData.append('order', this.addVideoForm.controls.order.value!);
      formData.append('video', video);
      formData.append('title', this.addVideoForm.controls.title.value!);
      formData.append('description', this.addVideoForm.controls.description.value!);

      this.courseService
        .addVideo(this.lessonId, formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Thumbnail updated successfully'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: 'Failed to update thumbnail'
            });
          }
        });
    }
  }

  protected fileSelected(file: any): void {
    this.addVideoForm.markAsDirty();
    this.addVideoForm.markAsTouched();

    this.addVideoForm.patchValue({
      video: file
    });
  }
}
