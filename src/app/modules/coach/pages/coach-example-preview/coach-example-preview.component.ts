import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CourseExampleDto } from '../../../shared/models/course-example-dto.model';

@Component({
  selector: 'app-coach-example-preview',
  imports: [],
  templateUrl: './coach-example-preview.component.html',
  styleUrl: './coach-example-preview.component.scss'
})
export class CoachExamplePreviewComponent {
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private exampleElementData: CourseExampleDto = this.route.snapshot.data['exampleId'];
}
