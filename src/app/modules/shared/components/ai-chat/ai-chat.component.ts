import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { AiChatService } from '../../services/ai-chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ai-chat',
  imports: [ReactiveFormsModule, ValidationErrorsComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss'
})
export class AiChatComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private aiChatService: AiChatService = inject(AiChatService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef | null;

  protected isHidden: boolean = true;
  protected messages: string[] = [
    'question',
    'answer lorem ipsum dolor simet',
    'question',
    'answer lorem ipsum dolor simet',
    'question',
    'answer lorem ipsum dolor simet',
    'question',
    'answer lorem ipsum dolor simet'
  ];

  protected questionForm = this.fb.group({
    question: ['', [Validators.required, Validators.min(1), Validators.max(50)]]
  });

  protected onSubmit(): void {
    const question: string = this.questionForm.getRawValue().question!;
    this.questionForm.get('question')?.disable();
    this.questionForm.reset();
    this.messages.push(question);
    this.scrollToBottom();
    this.aiChatService
      .askQuestion(question)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (answer) => {
          this.messages.push(answer.answer);
          this.scrollToBottom();
          this.questionForm.get('question')?.enable();
        },
        error: (_) => {
          this.messages.push('Something went wrong. Try asking me later.');
          this.scrollToBottom();
          this.questionForm.get('question')?.enable();
        }
      });
  }

  protected scrollToBottom(): void {
    // TODO: change to primeng virtual scroll
    setTimeout(() => {
      const container: ElementRef | null = this.messagesContainer;
      if (container) {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
      }
    }, 0);
  }

  protected show(): void {
    this.isHidden = false;
  }

  protected hide(): void {
    this.isHidden = true;
  }
}
