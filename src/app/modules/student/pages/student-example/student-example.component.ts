import { Component, HostListener, OnInit, inject } from '@angular/core';
import { DisplayChessboardComponent } from '../../../shared/components/display-chessboard/display-chessboard.component';
import { ExampleDetails } from '../../models/ExampleDetails';
import { ActivatedRoute } from '@angular/router';
import { Severity } from '../../../shared/enums/severities.enum';

@Component({
  selector: 'app-student-example',
  imports: [DisplayChessboardComponent],
  templateUrl: './student-example.component.html',
  styleUrl: './student-example.component.scss'
})
export class StudentExampleComponent implements OnInit {
  private route = inject(ActivatedRoute);

  protected example: ExampleDetails = {
    id: '1',
    title: 'example',
    initialDescription: 'description',
    order: 1,
    steps: [
      {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae inventore quasi ex alias velit porro nemo sequi ipsam corporis, animi architecto, adipisci aliquam natus quam laboriosam ab nostrum aliquid magnam culpa. Soluta ducimus, ullam dolores ut laboriosam repellendus odio fuga neque? Atque laborum tenetur dignissimos modi cumque distinctio commodi voluptas.',
        arrows: [],
        highlights: []
      },
      {
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae inventore quasi ex alias velit porro nemo sequi ipsam corporis, animi architecto, adipisci aliquam natus quam laboriosam ab nostrum aliquid magnam culpa. Soluta ducimus, ullam dolores ut laboriosam repellendus odio fuga neque? Atque laborum tenetur dignissimos modi cumque distinctio commodi voluptas. AAAAAaaaaaaaaaaaaaaaaaaaaaa',
        arrows: [],
        highlights: []
      }
    ]
  };

  protected hightlights: Map<number, Severity>[] = [];

  protected currentStep: number = 0;

  public ngOnInit(): void {
    const example = this.route.snapshot.data['example'];
    this.example = example;
    this.example.steps.forEach((step) => {
      const newHighlights: Map<number, Severity> = new Map([]);
      step.highlights.forEach((highlight) => {
        newHighlights.set(parseInt(highlight.position), highlight.severity);
      });
      this.hightlights.push(newHighlights);
    });
  }

  @HostListener('window:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.prevStep();
        break;
      case 'ArrowRight':
        this.nextStep();
        break;
    }
  }

  protected nextStep(): void {
    if (this.currentStep < this.example.steps.length - 1) {
      this.currentStep++;
    }
  }

  protected prevStep(): void {
    if (this.currentStep >= 1) {
      this.currentStep--;
    }
  }
}
