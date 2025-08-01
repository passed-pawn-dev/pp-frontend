// import { Lesson } from './models/Lesson';
// import { LessonDetails } from './models/LessonDetails';
// import { MyCourseDetails } from './models/MyCourseDetails';
// import { MyCourse } from './models/MyCourse';
// import { Coach } from './models/Coach';
// import { Title } from './models/Title';
// import { Course } from './models/Course';
// import { CourseDetails } from './models/CourseDetails';
// import { CourseReview } from './models/CourseReview';

// export const lessonDetails: LessonDetails = {
//   id: '1',
//   lessonNumber: 1,
//   video: {
//     id: '1',
//     title: 'lesson 1',
//     description: 'how to play chess',
//     url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4'
//   },
//   exercises: [],
//   examples: []
// };

// // export const myCourse: MyCourseDetails = {
// //   id: '1',
// //   title: 'Mastering the Opening: Strategies for Success',
// //   description:
// //     'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
// //   coachName: 'Grandmaster John Doe',
// //   thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg',
// //   lessons: [
// //     {
// //       id: 'abc',
// //       lessonNumber: 1
// //     },
// //     {
// //       id: 'def',
// //       lessonNumber: 2
// //     }
// //   ]
// // };

// export const myCourses: MyCourse[] = [
//   {
//     id: '1',
//     title: 'Mastering the Opening: Strategies for Success',
//     description:
//       'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
//     coachName: 'Grandmaster John Doe',
//     thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg'
//   },
//   {
//     id: '2',
//     title: 'Endgame Essentials: Turning Small Advantages into Victory',
//     description:
//       'This course dives deep into endgame techniques, including king and pawn endings, rook endgames, and the principles needed to convert small advantages into a decisive win.',
//     coachName: 'Grandmaster Alice Smith',
//     thumbnail: 'https://example.com/thumbnails/endgame-essentials.jpg'
//   },
//   {
//     id: '3',
//     title: 'Tactics & Combinations: Sharpen Your Chess Mind',
//     description:
//       "Master the art of tactical play with this course. We'll explore pins, forks, skewers, and other crucial tactics, along with exercises to help you recognize winning combinations on the spot.",
//     coachName: 'International Master Bob Lee',
//     thumbnail: 'https://example.com/thumbnails/tactics-combinations.jpg'
//   },
//   {
//     id: '4',
//     title: 'Positional Play: Building a Strong Foundation',
//     description:
//       'Gain a deep understanding of positional chess. Topics include controlling key squares, planning pawn structures, and creating long-term strategies to outmaneuver your opponents.',
//     coachName: 'FIDE Master Sarah Khan',
//     thumbnail: 'https://example.com/thumbnails/positional-play.jpg'
//   },
//   {
//     id: '5',
//     title: 'Attacking Chess: Going for the Kill',
//     description:
//       'Learn how to play aggressive chess and keep your opponents on the defensive. This course covers attacking patterns, sacrifices, and powerful setups for checkmating attacks.',
//     coachName: 'Grandmaster Victor Ivanov',
//     thumbnail: 'https://example.com/thumbnails/attacking-chess.jpg'
//   }
// ];

// export const coaches: Coach[] = [
//   {
//     id: '1',
//     firstName: 'Magnus',
//     lastName: 'Carlsen',
//     photoId: 'photo_1',
//     dateOfBirth: new Date('1990-11-30'),
//     ELO: 2850,
//     title: Title.GM,
//     countryId: 'NOR'
//   },
//   {
//     id: '2',
//     firstName: 'Hou',
//     lastName: 'Yifan',
//     photoId: 'photo_2',
//     dateOfBirth: new Date('1994-02-27'),
//     ELO: 2650,
//     title: Title.WGM,
//     countryId: 'CHN'
//   },
//   {
//     id: '3',
//     firstName: 'Anish',
//     lastName: 'Giri',
//     photoId: 'photo_3',
//     dateOfBirth: new Date('1994-06-28'),
//     ELO: 2760,
//     title: Title.GM,
//     countryId: 'NED'
//   },
//   {
//     id: '4',
//     firstName: 'Judith',
//     lastName: 'Polgar',
//     photoId: 'photo_4',
//     dateOfBirth: new Date('1976-07-23'),
//     ELO: 2735,
//     title: Title.GM,
//     countryId: 'HUN'
//   },
//   {
//     id: '5',
//     firstName: 'Viswanathan',
//     lastName: 'Anand',
//     photoId: 'photo_5',
//     dateOfBirth: new Date('1969-12-11'),
//     ELO: 2750,
//     title: Title.GM,
//     countryId: 'IND'
//   }
// ];

// export const courses: Course[] = [
//   {
//     id: '1',
//     title: 'Mastering the Opening: Strategies for Success',
//     coachName: 'Grandmaster John Doe',
//     thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg',
//     price: 1.99,
//     reviewScore: 4.5
//   },
//   {
//     id: '2',
//     title: 'Endgame Essentials: Turning Small Advantages into Victory',
//     coachName: 'Grandmaster Alice Smith',
//     thumbnail: 'https://example.com/thumbnails/endgame-essentials.jpg',
//     price: 5,
//     reviewScore: 5
//   },
//   {
//     id: '3',
//     title: 'Tactics & Combinations: Sharpen Your Chess Mind',
//     coachName: 'International Master Bob Lee',
//     thumbnail: 'https://example.com/thumbnails/tactics-combinations.jpg',
//     price: 20.99,
//     reviewScore: 3
//   },
//   {
//     id: '4',
//     title: 'Positional Play: Building a Strong Foundation',
//     coachName: 'FIDE Master Sarah Khan',
//     thumbnail: 'https://example.com/thumbnails/positional-play.jpg',
//     price: 3.0,
//     reviewScore: 4.5
//   },
//   {
//     id: '5',
//     title: 'Attacking Chess: Going for the Kill',
//     coachName: 'Grandmaster Victor Ivanov',
//     thumbnail: 'https://example.com/thumbnails/attacking-chess.jpg',
//     price: 4.5,
//     reviewScore: 5
//   }
// ];

// // export const course: CourseDetails = {
// //   id: '1',
// //   title: 'Mastering the Opening: Strategies for Success',
// //   description:
// //     'Learn the essential opening strategies to gain an early advantage in the game. This course covers popular openings, traps, and tactics to help you control the board from the very first move.',
// //   coachName: 'Grandmaster John Doe',
// //   thumbnail: 'https://example.com/thumbnails/opening-strategies.jpg',
// //   price: 4.99,
// //   lessons: 5,
// //   reviewScore: 4.5,
// //   reviews: [
// //     {
// //       id: '1',
// //       value: 4.5,
// //       content:
// //         'The course was excellent! The explanations were clear, and the exercises helped me improve my strategy significantly.',
// //       studentId: '1'
// //     },
// //     {
// //       id: '2',
// //       value: 3.0,
// //       content:
// //         'Decent course, but some of the lessons were too advanced for beginners. Could use better pacing.',
// //       studentId: '2'
// //     },
// //     {
// //       id: '3',
// //       value: 5.0,
// //       content:
// //         'Absolutely fantastic! Learned so much about openings and tactics. Highly recommended for intermediate players.',
// //       studentId: '3'
// //     },
// //     {
// //       id: '4',
// //       value: 2.5,
// //       content:
// //         "The content was okay, but the instructor's explanations were sometimes confusing, and there were no live examples.",
// //       studentId: '4'
// //     },
// //     {
// //       id: '5',
// //       value: 4.0,
// //       content:
// //         'Great course! The puzzles were very challenging and enjoyable, but I wish there were more endgame lessons.',
// //       studentId: '5'
// //     }
// //   ]
// // };
