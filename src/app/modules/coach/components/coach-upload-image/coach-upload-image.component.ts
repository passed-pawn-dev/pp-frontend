import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coach-upload-image',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coach-upload-image.component.html',
  styleUrl: './coach-upload-image.component.scss'
})
export class CoachUploadImageComponent {
  @Output() public fileSelected = new EventEmitter<any>();
  @Input({ required: true }) public acceptedFileTypes!: string[];

  protected file: File | null = null;

  protected filePreviewSrc: ArrayBuffer | string | null = null;

  protected onFileChange(event: Event): void {
    this.filePreviewSrc = null;

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.file = file;

    this.fileSelected.emit(file);

    if (file.type.startsWith('video') || file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.filePreviewSrc = event.target!.result;
      };
    }
  }
}
