import { Lesson } from './models/Lesson';
import { LessonDetails } from './models/LessonDetails';
import { MyCourseDetails } from './models/MyCourseDetails';
import { MyCourse } from './models/MyCourse';

export const lessonDetails: LessonDetails = {
  id: '1',
  lessonNumber: 1,
  video: {
    id: '1',
    title: 'lesson 1',
    description: 'how to play chess',
    url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4'
  },
  exercises: [],
  examples: []
};

export const course: MyCourseDetails = {
  id: '1',
  title: 'Mastering the Opening: Strategies for Success',
  description:
    'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
  coachName: 'Grandmaster John Doe',
  thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg',
  lessons: [
    {
      id: 'abc',
      title: 'Introduction',
      lessonNumber: 1
    },
    {
      id: 'def',
      title: 'Piece movement',
      lessonNumber: 2
    }
  ]
};

export const courses: MyCourse[] = [
  {
    id: '1',
    title: 'Mastering the Opening: Strategies for Success',
    description:
      'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
    coachName: 'Grandmaster John Doe',
    thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg'
  },
  {
    id: '2',
    title: 'Endgame Essentials: Turning Small Advantages into Victory',
    description:
      'This course dives deep into endgame techniques, including king and pawn endings, rook endgames, and the principles needed to convert small advantages into a decisive win.',
    coachName: 'Grandmaster Alice Smith',
    thumbnail: 'https://example.com/thumbnails/endgame-essentials.jpg'
  },
  {
    id: '3',
    title: 'Tactics & Combinations: Sharpen Your Chess Mind',
    description:
      "Master the art of tactical play with this course. We'll explore pins, forks, skewers, and other crucial tactics, along with exercises to help you recognize winning combinations on the spot.",
    coachName: 'International Master Bob Lee',
    thumbnail: 'https://example.com/thumbnails/tactics-combinations.jpg'
  },
  {
    id: '4',
    title: 'Positional Play: Building a Strong Foundation',
    description:
      'Gain a deep understanding of positional chess. Topics include controlling key squares, planning pawn structures, and creating long-term strategies to outmaneuver your opponents.',
    coachName: 'FIDE Master Sarah Khan',
    thumbnail: 'https://example.com/thumbnails/positional-play.jpg'
  },
  {
    id: '5',
    title: 'Attacking Chess: Going for the Kill',
    description:
      'Learn how to play aggressive chess and keep your opponents on the defensive. This course covers attacking patterns, sacrifices, and powerful setups for checkmating attacks.',
    coachName: 'Grandmaster Victor Ivanov',
    thumbnail: 'https://example.com/thumbnails/attacking-chess.jpg'
  }
];
