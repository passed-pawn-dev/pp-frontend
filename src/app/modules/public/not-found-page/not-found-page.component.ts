import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { TalkingBobComponent } from '../../shared/components/talking-bob/talking-bob.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [TalkingBobComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPageComponent {
  private readonly location = inject(Location);

  protected back(): void {
    this.location.historyGo(-2);
  }
}
