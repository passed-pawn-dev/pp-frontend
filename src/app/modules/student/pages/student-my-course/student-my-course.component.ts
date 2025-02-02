import { Component, OnInit, signal } from '@angular/core';
import { StudentLessonTileComponent } from '../../components/student-lesson-tile/student-lesson-tile.component';
import { myCourse } from '../../example-data';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [StudentLessonTileComponent, StudentCourseReviewFormComponent],
  templateUrl: './student-my-course.component.html',
  styleUrl: './student-my-course.component.scss'
})
export class StudentMyCourseComponent implements OnInit {
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    lessons: [],
    reviews: []
  });

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.getById(params.get('id')!).subscribe((res) => {
        this.course.set(res);
      });
    });
  }
}
