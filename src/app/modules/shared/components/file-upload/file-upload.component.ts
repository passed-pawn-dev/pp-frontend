import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { validateFileAgainstAcceptTypes } from '../../validators/file-type-validator';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, ReactiveFormsModule, FileSizePipe],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
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
        if (validateFileAgainstAcceptTypes(file, this.acceptedFileTypes)) {
          this.filePreviewSrc = event.target!.result;
        }
      };
    }
  }
}
