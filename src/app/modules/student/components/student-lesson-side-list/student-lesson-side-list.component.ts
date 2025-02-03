import { Component, OnInit, inject, signal } from '@angular/core';
import { myCourse } from '../../example-data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-student-lesson-side-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-lesson-side-list.component.html',
  styleUrl: './student-lesson-side-list.component.scss'
})
export class StudentLessonSideListComponent implements OnInit {
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
