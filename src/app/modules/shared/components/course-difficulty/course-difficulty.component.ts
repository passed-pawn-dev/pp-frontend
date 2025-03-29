import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-difficulty',
  standalone: true,
  imports: [],
  templateUrl: './course-difficulty.component.html',
  styleUrl: './course-difficulty.component.scss'
})
export class CourseDifficultyComponent implements OnInit {
  @Input() public difficulty!: number;

  protected filledCircles: number[] = [];
  protected emptyCircles: number[] = [];

  private colors: string[] = ['#84d7fd', '#79f1a0', '#fec552', '#f68a74', '#4f4f4f'];
  private headers: string[] = [
    'Novice',
    'Beginer',
    'Intermidiate',
    'Advanced',
    'Expert'
  ];
  protected color: string = '';
  protected header: string = '';

  public ngOnInit(): void {
    this.filledCircles = Array(this.difficulty).fill(0);
    this.emptyCircles = Array(5 - this.difficulty).fill(0);
    this.color = this.colors[this.difficulty - 1];
    this.header = this.headers[this.difficulty - 1];
  }
}
