import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-upload-image',
  imports: [],
  templateUrl: './coach-upload-image.component.html',
  styleUrl: './coach-upload-image.component.scss'
})
export class CoachUploadImageComponent {
  private messageService = inject(MessageService);
  private courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  @Output() public imageSubmitted = new EventEmitter<void>();
  @Input({ required: true }) public maxSizeInBytes!: number;
  @Input({ required: true }) public acceptedFileTypes!: string[];
  @Input({ required: true }) public fileTypeErrorMessage!: string;

  protected thumbnailErrorMessage: string | null = null;

  protected thumbnail: File | null = null;
  protected submitThumbnail(event: Event): void {
    event.preventDefault();
    this.imageSubmitted.emit();
    const formData = new FormData();
    formData.append('thumbnail', this.thumbnail!);
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const courseId = params.get('id')!;
        this.courseService
          .updateThumbnail(courseId, formData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Thumbnail updated successfully'
              });
            },
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Failed to update thumbnail'
              })
          });
      });
  }

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (this.acceptedFileTypes.find((type) => !file.type.startsWith(type))) {
      this.thumbnailErrorMessage = this.fileTypeErrorMessage;
      this.thumbnail = null;
      return;
    }

    if (file.size > this.maxSizeInBytes) {
      alert('File must be less than 5MB.');
      this.thumbnail = null;
      return;
    }

    this.thumbnailErrorMessage = null;
    this.thumbnail = file;
  }
}
