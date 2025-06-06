import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrivateVideoPlayerComponent } from '../../../shared/components/private-video-player/private-video-player.component';
import { CourseVideoElementViewRequestDto } from '../../../shared/models/course-video-element-view-request-dto.model';
import { FileHandlingService } from '../../../shared/services/file-handling.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-video',
  imports: [PrivateVideoPlayerComponent, RouterLink],
  templateUrl: './student-video.component.html',
  styleUrl: './student-video.component.scss'
})
export class StudentVideoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private fileHandlingService = inject(FileHandlingService);
  protected videoElementData: CourseVideoElementViewRequestDto =
    this.route.snapshot.data['video'];

  protected videoPlayUrl: string | null = null;

  public ngOnInit(): void {
    this.fileHandlingService
      .downloadPrivateVideo(this.videoElementData.temporaryVideoDownloadUrl)
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
}
