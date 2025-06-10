import { Component, HostListener, input } from '@angular/core';

@Component({
  selector: 'app-private-video-player',
  imports: [],
  templateUrl: './private-video-player.component.html',
  styleUrl: './private-video-player.component.scss'
})
export class PrivateVideoPlayerComponent {
  public videoPlayUrl = input.required<string | null>();

  @HostListener('contextmenu', ['$event'])
  private disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
