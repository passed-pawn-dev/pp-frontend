import { Component, OnInit, signal } from '@angular/core';
import { StudentLessonTileComponent } from '../../components/student-lesson-tile/student-lesson-tile.component';
import { myCourse } from '../../example-data';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [
    StudentLessonTileComponent,
    StudentCourseReviewFormComponent,
    RouterLink,
    ConfirmDialogModule
  ],
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
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.getBoughtById(params.get('id')!).subscribe((res) => {
        this.course.set(res);
      });
    });
  }

  protected signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to sign out from this course?',
      header: 'Confirm',
      accept: () => {
        // TODO
        console.log('sign out');
        this.router.navigate(['../']);
      },
      reject: () => {}
    });
  }
}
