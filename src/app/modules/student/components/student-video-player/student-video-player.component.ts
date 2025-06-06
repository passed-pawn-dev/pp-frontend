import {
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FileHandlingService } from '../../../shared/services/file-handling.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-video-player',
  imports: [],
  templateUrl: './student-video-player.component.html',
  styleUrl: './student-video-player.component.scss'
})
export class StudentVideoPlayerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) public temporaryVideoDownloadUrl!: string;
  private messageService = inject(MessageService);
  private fileHandlingService = inject(FileHandlingService);
  protected videoPlayUrl: string | null = null;

  public ngOnInit(): void {
    this.fileHandlingService
      .downloadPrivateVideo(this.temporaryVideoDownloadUrl)
      .subscribe({
        next: (blob: Blob) => {
          const url = URL.createObjectURL(blob);

          this.videoPlayUrl = url;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'There was an error retrieving the video. Please try again later.'
          });
        }
      });
  }

  @HostListener('contextmenu', ['$event'])
  private disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public ngOnDestroy(): void {
    if (this.videoPlayUrl) {
      URL.revokeObjectURL(this.videoPlayUrl);
    }
  }
}
