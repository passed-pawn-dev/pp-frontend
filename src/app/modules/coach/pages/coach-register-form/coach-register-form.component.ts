import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender, genderToLabelMapping } from '../../../shared/enums/gender.enum';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import { CalendarModule } from 'primeng/calendar';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent
} from 'primeng/autocomplete';
import countries from '../../../../../assets/countries.json';
import { Nationality } from '../../../shared/models/Nationality';
import { NationalityService } from '../../../shared/service/nationality.service';
import { Coach } from '../../models/Coach';
import { CoachService } from '../../service/coach.service';
import { Router } from '@angular/router';
import {
  ChessTitle,
  chessTitleToLabelMapping
} from '../../../shared/enums/chess-titles.enum';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-coach-register-form',
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
  templateUrl: './coach-register-form.component.html',
  styleUrl: './coach-register-form.component.scss'
})
export class CoachRegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private nationalityService = inject(NationalityService);
  private coachService = inject(CoachService);
  private router = inject(Router);
  private messageService = inject(MessageService);

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
    chessTitle: [null],
    nationalityId: [''],
    shortDescription: [''],
    detailedDescription: ['']
  });

  public ngOnInit(): void {
    this.nationalityService.getAll().subscribe({
      next: (res) => {
        this.nationalities = res;
      },
      error: (_) => {
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Nationalities could not be fetched' });
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

      const registerData: Coach = {
        ...this.registerForm.getRawValue(),
        dateOfBirth: dateOfBirth,
        nationalityId: nationalityId
      };

      this.coachService.register(registerData).subscribe({
        next: (_) => this.router.navigate(['/coach']),
        error: (_) => this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Failed to register' })
      });
    }
  }
}
