import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import {
  ChessTitle,
  chessTitleToLabelMapping
} from '../../../shared/enums/chess-titles.enum';
import { Student } from '../../models/Student';
import { StudentService } from '../../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NationalityService } from '../../../shared/service/nationality.service';
import { Nationality } from '../../../shared/models/Nationality';

@Component({
  selector: 'app-student-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    AutoCompleteModule,
    CalendarModule,
    ValidationErrorsComponent
  ],
  templateUrl: './student-register-form.component.html',
  styleUrl: './student-register-form.component.scss'
})
export class StudentRegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private studentService = inject(StudentService);
  private nationalityService = inject(NationalityService);
  private router = inject(Router);

  protected chessTitles = enumToObjectArray(ChessTitle, chessTitleToLabelMapping);
  protected nationalities: Nationality[] = [];
  protected filteredCountries: string[] = [];
  protected maxDate = new Date();

  protected registerForm = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth: [Date.now()],
    elo: [0, [Validators.min(1000)]],
    chessTitle: [null],
    nationalityId: ['']
  });

  public ngOnInit(): void {
    this.nationalityService.getAll().subscribe((res) => {
      this.nationalities = res;
    });
  }

  protected filterCountries(event: AutoCompleteCompleteEvent): void {
    const countryNames: string[] = this.nationalities.map(
      (nationality) => nationality.fullName
    );
    const query = event.query;

    const filteredCountries = countryNames.filter((country) =>
      country.toLowerCase().startsWith(query.toLowerCase())
    );

    this.filteredCountries = filteredCountries;
  }

  private parseDate(isoDate: number): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const dateOfBirth = this.parseDate(this.registerForm.value.dateOfBirth!);
      const nationalityId = this.nationalities.find(
        (n) => n.fullName === this.registerForm.getRawValue().nationalityId
      )!.id;
      const registerData: Student = {
        ...this.registerForm.getRawValue(),
        dateOfBirth: dateOfBirth,
        nationalityId: nationalityId
      };
      this.studentService.register(registerData).subscribe((res) => {
        this.router.navigate(['/student']);
      });
    }
  }
}
