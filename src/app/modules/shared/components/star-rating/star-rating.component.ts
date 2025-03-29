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
  @Input() public ratingsNumber: number | null = null;

  protected starsArray: number[] = [];

  public ngOnInit(): void {
    this.starsArray = Array(this.rating).fill(0);
  }
}
