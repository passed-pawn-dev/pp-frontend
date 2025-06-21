import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject,
  signal,
  SimpleChanges,
  input
} from '@angular/core';
import { ChessBoard } from '../../../../chess-logic/board';
import {
  Color,
  TChessboard,
  TChessboardView,
  pieceImagePaths
} from '../../../../chess-logic/models';
import { FenConverter } from '../../../../chess-logic/FenConverter';
import { Rook } from '../../../../chess-logic/pieces/rook';
import { Knight } from '../../../../chess-logic/pieces/knight';
import { Bishop } from '../../../../chess-logic/pieces/bishop';
import { King } from '../../../../chess-logic/pieces/king';
import { Queen } from '../../../../chess-logic/pieces/queen';
import { Pawn } from '../../../../chess-logic/pieces/pawn';
import { Piece } from '../../../../chess-logic/pieces/piece';
import { DragDropModule } from 'primeng/dragdrop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FenValidator } from '../../../../chess-logic/FenValidator';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChessboardHighlightsDirective } from '../../directives/chessboard-highlights.directive';
import { Severity } from '../../enums/severities.enum';
import { Arrow } from '../../models/arrow.model';
import { ChessboardArrowsDirective } from '../../directives/chessboard-arrows.directive';

enum Mode {
  Draw = 'Draw',
  Move = 'Move',
  Erase = 'Erase'
}

@Component({
  selector: 'app-chessboard-editor',
  imports: [
    DragDropModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ChessboardHighlightsDirective,
    ChessboardArrowsDirective
  ],
  templateUrl: './chessboard-editor.component.html',
  styleUrl: './chessboard-editor.component.scss'
})
export class ChessboardEditorComponent implements OnInit, OnChanges {
  @Input({ required: true }) public useArrowsAndHighlights: boolean = true;
  public initialHighlights = input<Map<number, Severity>>(new Map([]));
  public initialArrows = input<Arrow[]>([]);
  public startingPositionInput = input<string>(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );

  @Output() public newFenEvent = new EventEmitter<string>();
  @Output() public newHighlightsEvent = new EventEmitter<Map<number, Severity>>();
  @Output() public newArrowsEvent = new EventEmitter<Arrow[]>();

  private fb: FormBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  protected startingPosition =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  protected standardStartingFen: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private FILES = ChessBoard.FILES;
  private RANKS = ChessBoard.RANKS;
  private chessboard: TChessboard = new Map(
    this.RANKS.flatMap((RANK) => this.FILES.map((FILE) => [`${FILE}${RANK}`, null]))
  );
  protected colors: Color[] = [Color.White, Color.Black];
  protected cursorStyle: string = 'default';
  protected currentPiece: Piece | undefined;
  public fen: string = '';
  protected pieceImagePaths = pieceImagePaths;
  protected fenInputErrors: string[] = [];
  protected Mode = Mode;
  protected Severity = Severity;
  protected _mode: Mode = Mode.Move;
  protected currentSeverity = Severity.Info;
  protected arrowStartField = 0;

  protected highlights = signal(this.initialHighlights());
  protected arrows = signal(this.initialArrows());

  protected fenForm = this.fb.group({
    sideToMove: [Color.White],
    enPassant: [null] as [string | null],
    whiteShort: [false],
    whiteLong: [false],
    blackShort: [false],
    blackLong: [false],
    halfMoveClock: [0, Validators.min(0)],
    fullMoveNumber: [1, Validators.min(1)]
  });

  protected whitePieces = [
    new King(Color.White),
    new Queen(Color.White),
    new Rook(Color.White),
    new Bishop(Color.White),
    new Knight(Color.White),
    new Pawn(Color.White)
  ];
  protected blackPieces = [
    new King(Color.Black),
    new Queen(Color.Black),
    new Rook(Color.Black),
    new Bishop(Color.Black),
    new Knight(Color.Black),
    new Pawn(Color.Black)
  ];

  protected get chessboardView(): TChessboardView {
    const chessboardView = new Map();
    for (let [square, piece] of this.chessboard) {
      chessboardView.set(square, piece?.fenChar || null);
    }

    return chessboardView;
  }

  protected get mode(): Mode {
    return this._mode;
  }

  protected set mode(value: Mode) {
    this._mode = value;
    switch (value) {
      case Mode.Move:
        this.cursorStyle = 'grab';
        break;
      case Mode.Draw:
        this.cursorStyle = `url("${pieceImagePaths[this.currentPiece!.fenChar]}") 10 10, auto`;
        break;
      case Mode.Erase:
        this.cursorStyle = 'url("icons/eraser.svg") 10 10, auto';
        break;
    }
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    this.setHighlightsAndArrows();
    this.startingPosition = this.startingPositionInput();
    this.resetToInputtedStartingPosition();

    this.updateFenAndSave();
  }

  public ngOnInit(): void {
    this.updateFenAndSave();
    this.updateArrows();
    this.updateHighlights();

    this.mode = Mode.Move;

    this.fenForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        this.updateSideToMove(values.sideToMove!);
        this.updateCastling([
          values.whiteShort!,
          values.whiteLong!,
          values.blackShort!,
          values.blackLong!
        ]);
        this.updateEnPassant(values.enPassant!);
        this.updateClocks(values.halfMoveClock!, values.fullMoveNumber!);
        this.newFenEvent.emit(this.fen);
      });
  }

  protected onFieldRightClicked(event: MouseEvent): void {
    event.preventDefault();
  }

  protected replaceFenSegment(index: number, replacement: string): void {
    const firstPart = this.fen.split(' ', index);
    const secondPart = this.fen.split(' ').slice(index + 1);
    this.fen = [...firstPart, replacement, ...secondPart].join(' ');
  }

  protected updateSideToMove(color: Color): void {
    const index = this.fen.indexOf(' ') + 1;
    const newColor = color === Color.White ? 'w' : 'b';
    this.fen = this.fen.substring(0, index) + newColor + this.fen.substring(index + 1);
  }

  protected updateCastling(rights: boolean[]): void {
    const whiteShort = rights[0] ? 'K' : '';
    const whiteLong = rights[1] ? 'Q' : '';
    const blackShort = rights[2] ? 'k' : '';
    const blackLong = rights[3] ? 'q' : '';
    const newRights = [whiteShort, whiteLong, blackShort, blackLong].join('');
    this.replaceFenSegment(2, newRights.length === 0 ? '-' : newRights);
  }

  protected updateEnPassant(square: string | null): void {
    const newSquare = square === null || square.match(/^$|.*\s.*/) ? '-' : square;
    this.replaceFenSegment(3, newSquare);
  }

  protected updateClocks(halfMoveClock: number, fullMoveNumber: number): void {
    this.replaceFenSegment(4, halfMoveClock.toString());
    this.replaceFenSegment(5, fullMoveNumber.toString());
  }

  protected drawWith(piece: Piece): void {
    this.currentPiece = piece;
    this.mode = Mode.Draw;
  }

  protected onFieldClicked(square: string): void {
    if (this.mode === Mode.Draw) {
      this.chessboard.set(square, this.currentPiece!);
    }
    if (this.mode === Mode.Erase) {
      this.chessboard.set(square, null);
    }
    this.updateFenAndSave();
  }

  protected onFieldDragStart(event: MouseEvent, field: number): void {
    if (event.button === 2) {
      this.arrowStartField = field;
    }
  }

  private setHighlight(fieldIndex: number, severity: Severity): void {
    const newMap = new Map(this.highlights());
    newMap.set(fieldIndex, severity);
    this.highlights.set(newMap);
    this.updateHighlights();
  }

  private removeHighlight(fieldIndex: number): void {
    const newMap = new Map(this.highlights());
    newMap.delete(fieldIndex);
    this.highlights.set(newMap);
    this.updateHighlights();
  }

  private addArrow(field: number): void {
    const newArray = [...this.arrows()];
    const newArrow = {
      source: this.arrowStartField,
      destination: field,
      severity: this.currentSeverity
    };
    newArray.push(newArrow);
    this.arrows.set(newArray);
    this.updateArrows();
  }

  private removeArrow(arrow: Arrow): void {
    const newArray = [...this.arrows()];
    newArray.splice(newArray.indexOf(arrow), 1);
    this.arrows.set(newArray);
    this.updateArrows();
  }

  protected onFieldDragEnd(event: MouseEvent, field: number): void {
    if (event.button !== 2) return;
    if (field === this.arrowStartField) {
      const currentHighlight: Severity | undefined = this.highlights().get(field);

      if (currentHighlight) {
        this.removeHighlight(field);
        if (currentHighlight !== this.currentSeverity) {
          this.setHighlight(field, this.currentSeverity);
        }
      } else {
        this.setHighlight(field, this.currentSeverity);
      }
    } else {
      const currentArrow: Arrow | undefined = this.arrows().find(
        (e: Arrow) => e.source === this.arrowStartField && e.destination === field
      );

      if (currentArrow) {
        this.removeArrow(currentArrow);
        if (currentArrow.severity !== this.currentSeverity) {
          this.addArrow(field);
        }
      } else {
        this.addArrow(field);
      }
    }
  }

  protected clearBoard(): void {
    ChessBoard.FILES.forEach((file) => {
      ChessBoard.RANKS.forEach((rank) => {
        this.chessboard.set(`${file}${rank}`, null);
      });
    });
    this.updateFenAndSave();
  }

  protected clearArrows(): void {
    this.arrows.set([]);
    this.updateArrows();
  }

  protected clearHighlights(): void {
    this.highlights.set(new Map([]));
    this.updateHighlights();
  }

  protected onInput(fen: string): void {
    const { result, errors } = FenValidator.validateFEN(this.fen);

    if (result) {
      this.fenInputErrors = [];
      const boardFromFen = FenConverter.convertFenToBoard(fen);
      this.chessboard = boardFromFen;
      this.updateFenForm();
    } else {
      this.fenInputErrors = errors!;
    }
  }

  protected updateFenForm(): void {
    const sideToMove = this.fen.split(' ')[1];
    const castlingRights = this.fen.split(' ')[2];
    const enPassant = this.fen.split(' ')[3];
    const halfMoveClock = this.fen.split(' ')[4];
    const fullMoveNumber = this.fen.split(' ')[5];
    this.fenForm
      .get('sideToMove')
      ?.setValue(sideToMove == 'w' ? Color.White : Color.Black);
    this.fenForm.get('whiteShort')?.setValue(castlingRights.includes('K'));
    this.fenForm.get('whiteLong')?.setValue(castlingRights.includes('Q'));
    this.fenForm.get('blackShort')?.setValue(castlingRights.includes('k'));
    this.fenForm.get('blackLong')?.setValue(castlingRights.includes('q'));
    this.fenForm.get('enPassant')?.setValue(enPassant === '-' ? null : enPassant);
    this.fenForm.get('halfMoveClock')?.setValue(parseInt(halfMoveClock));
    this.fenForm.get('fullMoveNumber')?.setValue(parseInt(fullMoveNumber));
  }

  protected resetToStartingPosition(): void {
    this.fen = this.standardStartingFen;
    this.updateFenForm();
    const boardFromFen = FenConverter.convertFenToBoard(this.standardStartingFen);
    this.chessboard = boardFromFen;
    this.updateFenAndSave();
  }

  protected resetToInputtedStartingPosition(): void {
    this.fen = this.startingPositionInput();
    this.updateFenForm();
    const boardFromFen = FenConverter.convertFenToBoard(this.startingPositionInput());
    this.chessboard = boardFromFen;
    this.updateFenAndSave();
  }

  private setHighlightsAndArrows(): void {
    this.highlights.set(this.initialHighlights());
    this.arrows.set(this.initialArrows());
  }

  protected onPieceDragStart(square: string): void {
    if (this.mode === Mode.Move) {
      const newPiece: Piece = this.chessboard.get(square)!;
      this.chessboard.set(square, null);
      this.currentPiece = newPiece;
    }
  }

  protected pieceListDragStart(piece: Piece): void {
    this.mode = Mode.Move;
    this.currentPiece = piece;
  }

  protected calculateFen(): void {
    this.fen = FenConverter.convertBoardToFen(
      this.chessboard,
      this.fenForm.get('sideToMove')?.value!,
      undefined,
      this.fenForm.get('halfMoveClock')?.value!,
      this.fenForm.get('fullMoveNumber')?.value!
    );
    this.updateCastling([
      this.fenForm.get('whiteShort')?.value!,
      this.fenForm.get('whiteLong')?.value!,
      this.fenForm.get('blackShort')?.value!,
      this.fenForm.get('blackLong')?.value!
    ]);
    this.updateEnPassant(this.fenForm.get('enPassant')?.value!);
  }

  protected dropPiece(square: string): void {
    if (this.mode === Mode.Move) {
      this.chessboard.set(square, this.currentPiece!);
      this.updateFenAndSave();
    }
  }

  protected flipBoard(): void {
    this.chessboard = new Map(Array.from(this.chessboard).reverse());
    this.updateFenAndSave();
  }

  protected isPieceSelected(piece: Piece): boolean {
    return this.mode === Mode.Draw && this.currentPiece === piece;
  }

  protected isSeveritySelected(severity: Severity): boolean {
    return this.currentSeverity === severity;
  }

  protected updateFenAndSave(): void {
    this.calculateFen();
    this.newFenEvent.emit(this.fen);
  }

  private updateHighlights(): void {
    this.newHighlightsEvent.emit(this.highlights());
  }

  private updateArrows(): void {
    this.newArrowsEvent.emit(this.arrows());
  }
}
