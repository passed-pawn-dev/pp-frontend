import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coach-courses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-courses-list.component.html',
  styleUrl: './coach-courses-list.component.scss'
})
export class CoachCoursesListComponent {
  protected courses = [
    {
      id: '1',
      title: 'Mastering the Opening: Strategies for Success',
      description:
        'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
      averageReviewScore: 4.6,
      lessons: 15,
      coachName: 'Grandmaster John Doe',
      price: 35,
      thumbnail: 'https://cataas.com/cat'
    },
    {
      id: '2',
      title: 'Intermediate Tactics: Outplaying Your Opponent',
      description:
        'Dive into advanced tactics and learn how to outthink your opponent with precise calculations and counterplays. This course will teach you how to handle complex midgame positions.',
      averageReviewScore: 4.8,
      lessons: 20,
      coachName: 'Grandmaster Jane Smith',
      price: 45,
      thumbnail: 'https://cataas.com/cat'
    },
    {
      id: '3',
      title: 'Endgame Mastery: Converting Advantage to Victory',
      description:
        'Master the art of converting a winning position into a victory. This course focuses on endgame strategies, including king and pawn endgames, rook endgames, and more.',
      averageReviewScore: 4.9,
      lessons: 18,
      coachName: 'Grandmaster Alex Brown',
      price: 40,
      thumbnail: 'https://cataas.com/cat'
    },
    {
      id: '4',
      title: 'Advanced Opening Systems: The Art of Surprising Your Opponent',
      description:
        'Take your opening repertoire to the next level with this course on advanced opening systems. Learn how to surprise your opponent and play more aggressive setups.',
      averageReviewScore: 4.7,
      lessons: 25,
      coachName: 'Grandmaster Maria White',
      price: 50,
      thumbnail: 'https://cataas.com/cat'
    },
    {
      id: '5',
      title: 'Psychology of Chess: Outplaying the Mind',
      description:
        'Learn the psychological aspects of chess and how to handle pressure, improve concentration, and exploit your opponent’s weaknesses in their mental game.',
      averageReviewScore: 4.5,
      lessons: 12,
      coachName: 'Grandmaster Lisa Green',
      price: 30,
      thumbnail: 'https://cataas.com/cat'
    }
  ];
}
