import { Component, OnInit, signal } from '@angular/core';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Exercise } from '../../models/Exercise';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [StudentCourseReviewFormComponent, RouterLink, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './student-my-course.component.html',
  styleUrl: './student-my-course.component.scss'
})
export class StudentMyCourseComponent implements OnInit {
  protected course = signal<MyCourseDetails>({
    id: '',
    title: '',
    description: '',
    coachName: '',
    thumbnail: '',
    lessons: []
  });

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.getBoughtById(params.get('id')!).subscribe((res) => {
        this.course.set(res);
      });
    });
  }

  protected getSortedExercises(exerciseList: Exercise[]): Exercise[] {
    return exerciseList.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  protected signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to sign out from this course?',
      header: 'Confirm',
      accept: () => {
        this.route.paramMap.subscribe((params) => {
          this.courseService.signOut(params.get('id')!).subscribe({
            next: (_) => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed out successfully' }),
            error: (_) => this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Could not sign out' })
          });
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      reject: () => {}
    });
  }
}
