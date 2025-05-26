import { Component, Input, OnChanges } from '@angular/core';
import { difficultyRanges } from '../../constants/difficulty-ranges';

@Component({
  selector: 'app-course-difficulty',
  standalone: true,
  imports: [],
  templateUrl: './course-difficulty.component.html',
  styleUrl: './course-difficulty.component.scss'
})
export class CourseDifficultyComponent implements OnChanges {
  @Input({ required: true }) public eloRangeStart!: number | null;
  @Input({ required: true }) public eloRangeEnd!: number | null;

  protected minDifficulty!: number;
  protected maxDifficulty!: number;

  public ngOnChanges(): void {
    this.minDifficulty =
      this.eloRangeStart == null ? 0 : this.findRangeIndex(this.eloRangeStart);
    this.maxDifficulty =
      this.eloRangeEnd == null ? 4 : this.findRangeIndex(this.eloRangeEnd);
  }

  private findRangeIndex(value: number): number {
    const index = difficultyRanges.findIndex((range) => {
      const minValid = range.min == null || value >= range.min;
      const maxValid = range.max == null || value <= range.max;
      return minValid && maxValid;
    });
    return index;
  }

  protected difficulties = ['Novice', 'Beginner', 'Intermediate', 'Expert', 'Master'];
}
