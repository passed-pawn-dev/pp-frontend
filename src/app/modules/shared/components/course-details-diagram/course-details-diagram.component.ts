import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details-diagram',
  standalone: true,
  imports: [],
  templateUrl: './course-details-diagram.component.html',
  styleUrl: './course-details-diagram.component.scss'
})
export class CourseDetailsDiagramComponent implements OnInit {
  @Input() public detailsArray: [number, string][] = [];

  protected max: number = 0;

  public ngOnInit(): void {
    this.max = this.detailsArray.reduce((max, [num, str]) => Math.max(max, num), 0);
  }
}
