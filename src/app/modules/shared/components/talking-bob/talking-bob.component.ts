import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-talking-bob',
  imports: [],
  templateUrl: './talking-bob.component.html',
  styleUrl: './talking-bob.component.scss'
})
export class TalkingBobComponent {
  @Input({ required: true }) public text!: string;
}
