import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChessTitle } from '../../../shared/enums/chess-title.enum';
import { Gender, genderToLabelMapping } from '../../../shared/enums/gender.enum';
import { chessTitleToLabelMapping } from '../../../shared/enums/chess-title.enum';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import countries from '../../../../../assets/countries.json';

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
export class CoachRegisterFormComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected chessTitles = enumToObjectArray(ChessTitle, chessTitleToLabelMapping);
  protected genders = enumToObjectArray(Gender, genderToLabelMapping);
  protected filteredCountries: string[] = [];
  protected maxDate = new Date();

  protected registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth: [],
    elo: [null, [Validators.min(1000)]],
    chessTitle: [ChessTitle.NoTitle],
    gender: [Gender.NOT_SPECIFIED],
    nationality: ['']
  });

  protected filterCountries(event: AutoCompleteCompleteEvent): void {
    const countryNames = Object.keys(countries);
    const query = event.query;

    const filteredCountries = countryNames.filter((country) =>
      country.toLowerCase().startsWith(query.toLowerCase())
    );

    this.filteredCountries = filteredCountries;
  }

  protected onSubmit(): void {}
}
