import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  inject
} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnChanges {
  @Input() public rating: number = 0;
  @Input() public ratingsNumber!: number;
  @Input() public showMinimal: boolean = false;

  protected starsArray: null[] = [];
  protected addHalfStar: Boolean = false;
  protected emptyStarArray: null[] = [];

  public ngOnChanges(): void {
    this.starsArray = [];
    this.emptyStarArray = [];
    this.addHalfStar = false;

    if (Number.isInteger(this.rating)) {
      this.starsArray = Array(this.rating).fill(null);
    } else {
      this.starsArray = Array(Math.floor(this.rating)).fill(null);

      this.addHalfStar = this.rating - Math.floor(this.rating) >= 0.5;
    }

    if (5 - Math.floor(this.rating) > 0) {
      if (this.rating - Math.floor(this.rating) >= 0.5) {
        this.emptyStarArray = Array(5 - Math.floor(this.rating) - 1).fill(null);
      } else {
        this.emptyStarArray = Array(5 - Math.floor(this.rating)).fill(null);
      }
    }
  }
}
