import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ai-chat',
  imports: [ReactiveFormsModule],
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
    'Hello, ask me any question about Passed Pawn, and I will try to help.'
  ];

  protected questionForm = this.fb.group({
    question: ['', [Validators.required, Validators.min(1), Validators.max(50)]]
  });

  protected onSubmit(): void {
    if (this.questionForm.invalid) return;
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
    // TODO: change to primeng virtual scroll [MAYBE]
    setTimeout(() => {
      const container: ElementRef | null = this.messagesContainer;
      if (container) {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
      }
    }, 100);
  }

  protected show(): void {
    this.isHidden = false;
    this.scrollToBottom();
  }

  protected hide(): void {
    this.isHidden = true;
  }
}
