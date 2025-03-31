import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
  @Input() public rating!: number;
  @Input() public ratingsNumber!: number;
  @Input() public showMinimal: boolean = false;

  protected starsArray: null[] = [];

  public ngOnInit(): void {
    this.starsArray = Array(this.rating).fill(null);
  }
}
