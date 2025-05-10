import { Component, OnInit, signal } from '@angular/core';
import { CoachProfile } from '../../models/CoachProfile';
import { ActivatedRoute } from '@angular/router';
import { StudentCourseTileComponent } from '../../components/student-course-tile/student-course-tile.component';

@Component({
  selector: 'app-student-coach-profile',
  standalone: true,
  imports: [StudentCourseTileComponent],
  templateUrl: './student-coach-profile.component.html',
  styleUrl: './student-coach-profile.component.scss'
})
export class StudentCoachProfileComponent implements OnInit {
  protected coachProfile = signal<CoachProfile>({
    fullName: '',
    email: '',
    elo: 0,
    chessTitle: null,
    nationality: null,
    detailedDescription: null,
    shortDescription: null,
    photoUrl: null,
    courses: []
  });

  public constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    const coachProfile = this.route.snapshot.data['coachProfile'];
    this.coachProfile.set(coachProfile);
  }
}
