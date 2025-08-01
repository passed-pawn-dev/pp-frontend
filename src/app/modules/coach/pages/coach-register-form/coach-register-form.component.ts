import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Nationality } from '../../../shared/models/nationality.model';
import { NationalityService } from '../../../shared/services/nationality.service';
import { Coach } from '../../models/coach.model';
import { CoachService } from '../../services/coach.service';
import { Router, RouterLink } from '@angular/router';
import {
  ChessTitle,
  chessTitleToLabelMapping
} from '../../../shared/enums/chess-titles.enum';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-register-form',
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
    RouterLink
  ],
  templateUrl: './coach-register-form.component.html',
  styleUrl: './coach-register-form.component.scss'
})
export class CoachRegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private nationalityService = inject(NationalityService);
  private coachService = inject(CoachService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

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
    dateOfBirth: [],
    elo: [null, [Validators.min(1000)]],
    // chessTitle: [null],
    nationalityId: [''],
    shortDescription: [''],
    detailedDescription: ['']
  });

  public ngOnInit(): void {
    this.nationalityService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.nationalities = res;
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Nationalities could not be fetched'
          });
        }
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

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const dateOfBirth = this.parseDate(this.registerForm.value.dateOfBirth!);
      const nationality = this.nationalities.find(
        (n) => n.fullName === this.registerForm.getRawValue().nationalityId
      );
      let registerData: Coach;
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

      this.coachService
        .register(registerData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (_) => this.router.navigate(['/coach']),
          error: (_) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Failed to register'
            })
        });
    }
  }
}
