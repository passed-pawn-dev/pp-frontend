import { Directive, ElementRef, Input, Renderer2, OnInit, inject } from '@angular/core';
import { PieceImageString } from '../pipes/piece-image-string.pipe';

@Directive({
  selector: '[appChessPiece]',
  standalone: true,
  providers: [PieceImageString]
})
export class ChessPieceDirective implements OnInit {
  @Input() public appChessPiece: string | null = null;
  private pieceImageString = inject(PieceImageString);

  public constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    console.log('setting piece');
    if (this.appChessPiece) {
      const imagePath = `assets/${this.pieceImageString.transform(this.appChessPiece)}.svg`;
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', imagePath);
      this.renderer.setAttribute(img, 'alt', this.appChessPiece);
      this.renderer.appendChild(this.el.nativeElement, img);
    }
  }
}
