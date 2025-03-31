import { Component, Input } from '@angular/core';

export interface CourseDetailsDiagram {
  title: string;
  amount: number;
}

@Component({
  selector: 'app-course-details-diagram',
  imports: [],
  templateUrl: './course-details-diagram.component.html',
  styleUrl: './course-details-diagram.component.scss'
})
export class CourseDetailsDiagramComponent {
  @Input() public courseDetails: CourseDetailsDiagram[] = [];

  protected findMax(): number {
    return Math.max(...this.courseDetails.map((details) => details.amount));
  }

  protected calculateWidth(amount: number): string {
    const value = (100 * amount) / this.findMax();

    return `${value}%`;
  }
}
