import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-chapter-tile',
  standalone: true,
  imports: [],
  templateUrl: './course-chapter-tile.component.html',
  styleUrl: './course-chapter-tile.component.scss'
})
export class CourseChapterTileComponent {
  @Input() public chapter!: [string, boolean];

  @Input() public chapterNumber!: number;

  @Input() public lessons!: [string, boolean][];

  protected showLessons: boolean = false;

  protected toggleLessons(): void {
    this.showLessons = !this.showLessons;
  }
}
