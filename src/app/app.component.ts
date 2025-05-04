import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OverlayOptions } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { AiChatComponent } from './modules/shared/components/ai-chat/ai-chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule, AiChatComponent],
  providers: [ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public constructor(private primeng: PrimeNG) {}

  private title = 'pp-frontend';

  public ngOnInit(): void {
    this.primeng.overlayOptions = {
      appendTo: 'body'
    };
  }
}
