import { Component, inject } from '@angular/core';
import { StudentVideoElementRequestDto } from '../../models/student-video-element-request-dto.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentVideoPlayerComponent } from '../../components/student-video-player/student-video-player.component';

@Component({
  selector: 'app-student-video',
  imports: [StudentVideoPlayerComponent, RouterLink],
  templateUrl: './student-video.component.html',
  styleUrl: './student-video.component.scss'
})
export class StudentVideoComponent {
  private route = inject(ActivatedRoute);
  protected videoElementData: StudentVideoElementRequestDto =
    this.route.snapshot.data['video'];
}
