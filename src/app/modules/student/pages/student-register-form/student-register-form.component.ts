import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import {
  ChessTitle,
  chessTitleToLabelMapping
} from '../../../shared/enums/chess-titles.enum';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Router, RouterLink } from '@angular/router';
import { NationalityService } from '../../../shared/services/nationality.service';
import { Nationality } from '../../../shared/models/nationality.model';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StepIndicatorComponent } from '../../../shared/components/step-indicator/step-indicator.component';
import { CarouselDirective } from '../../../shared/carousel.directive';

@Component({
  selector: 'app-student-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    InputNumberModule,
    AutoCompleteModule,
    DatePickerModule,
    ValidationErrorsComponent,
    StepIndicatorComponent,
    RouterLink,
    CarouselDirective
  ],
  templateUrl: './student-register-form.component.html',
  styleUrl: './student-register-form.component.scss'
})
export class StudentRegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private studentService = inject(StudentService);
  private nationalityService = inject(NationalityService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected chessTitles = enumToObjectArray(ChessTitle, chessTitleToLabelMapping);
  protected nationalities: Nationality[] = [];
  protected filteredCountries: string[] = [];
  protected maxDate = new Date();
  protected step: number = 1;

  protected registerForm = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth: [Date.now()],
    elo: [0, [Validators.min(1000)]],
    nationalityId: ['']
  });

  public ngOnInit(): void {
    this.nationalityService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
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

    this.filteredCountries = filteredCountries.concat('Not Set');
  }

  private parseDate(isoDate: number): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  protected nextStep(): void {
    this.step++;
  }

  protected prevStep(): void {
    this.step--;
  }

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const dateOfBirth = this.parseDate(this.registerForm.value.dateOfBirth!);
      const nationality = this.nationalities.find(
        (n) => n.fullName === this.registerForm.getRawValue().nationalityId
      );

      let registerData: Student;
      if (nationality) {
        registerData = {
          ...this.registerForm.getRawValue(),
          dateOfBirth: dateOfBirth,
          nationalityId: nationality.id
        };
      } else {
        registerData = {
          ...this.registerForm.getRawValue(),
          dateOfBirth: dateOfBirth
        };
        delete registerData.nationalityId;
      }
      this.studentService
        .register(registerData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate(['/student']);
        });
    }
  }
}
