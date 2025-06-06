import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseVideoElementViewRequestDto } from '../../../shared/models/course-video-element-view-request-dto.model';
import { PrivateVideoPlayerComponent } from '../../../shared/components/private-video-player/private-video-player.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FileHandlingService } from '../../../shared/services/file-handling.service';
import { CoachEditVideoDialogComponent } from '../../components/coach-edit-video-dialog/coach-edit-video-dialog.component';
import { CourseService } from '../../../shared/services/course.service';

@Component({
  selector: 'app-coach-video-preview',
  imports: [PrivateVideoPlayerComponent, RouterLink],
  providers: [DialogService],
  templateUrl: './coach-video-preview.component.html',
  styleUrl: './coach-video-preview.component.scss'
})
export class CoachVideoPreviewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private courseService = inject(CourseService);
  private fileHandlingService = inject(FileHandlingService);
  protected videoElementData: CourseVideoElementViewRequestDto =
    this.route.snapshot.data['video'];
  private videoId = this.route.snapshot.paramMap.get('videoId')!;
  protected videoPlayUrl: string | null = null;

  public ngOnInit(): void {
    this.getVideo();
  }

  private getVideo(): void {
    this.fileHandlingService
      .downloadPrivateVideo(this.videoElementData.temporaryVideoDownloadUrl)
      .subscribe({
        next: (blob: Blob) => {
          if (this.videoPlayUrl) {
            URL.revokeObjectURL(this.videoPlayUrl);
          }

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

  protected openEditVideoDialog(): void {
    this.dialogService
      .open(CoachEditVideoDialogComponent, {
        header: 'Edit video element',
        closable: true,
        modal: true,
        inputValues: {
          lessonVideoElementData: {
            videoPlayUrl: this.videoPlayUrl,
            title: this.videoElementData.title,
            description: this.videoElementData.description,
            cloudinaryVideoPublicId: this.videoElementData.videoPublicId,
            order: this.videoElementData.order,
            videoId: this.videoId
          }
        }
      })
      .onClose.subscribe({
        next: (res: 'success' | undefined) => {
          if (res === 'success') {
            this.getVideoElementData();
          }
        }
      });
  }

  private getVideoElementData(): void {
    this.courseService.getVideoById(this.videoId).subscribe({
      next: (res: CourseVideoElementViewRequestDto) => {
        this.videoElementData = res;
        this.getVideo();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail:
            'There was an error refreshing the data. Please try refreshing the page manually.'
        });
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.videoPlayUrl) {
      URL.revokeObjectURL(this.videoPlayUrl);
    }
  }
}
