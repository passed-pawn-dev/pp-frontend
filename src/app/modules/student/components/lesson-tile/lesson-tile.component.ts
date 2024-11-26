import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../models/Lesson';

@Component({
  selector: 'app-lesson-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson-tile.component.html',
  styleUrl: './lesson-tile.component.scss'
})
export class LessonTileComponent {
  @Input({ required: true }) public lesson!: Lesson;
}
