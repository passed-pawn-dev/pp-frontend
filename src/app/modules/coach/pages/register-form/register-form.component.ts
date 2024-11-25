import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ChessTitle } from '../../../shared/enums/chess-titles.enum';
import { Gender, genderToLabelMapping } from '../../../shared/enums/gender.enum';
import { chessTitleToLabelMapping } from '../../../shared/enums/chess-titles.enum';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { enumToObjectArray } from '../../../shared/utils/enum-to-object-array';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-register-form',
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
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected chessTitles = enumToObjectArray(ChessTitle, chessTitleToLabelMapping);
  protected genders = enumToObjectArray(Gender, genderToLabelMapping);

  protected filteredCountries: string[] = [];

  protected registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth: [null],
    elo: [null, [Validators.min(1000)]],
    chessTitle: [ChessTitle.NO_TITLE],
    gender: [Gender.NOT_SPECIFIED],
    nationality: ['']
  });

  protected get lastName(): AbstractControl<string | null> | null {
    return this.registerForm.get('lastName');
  }

  protected get firstName(): AbstractControl<string | null> | null {
    return this.registerForm.get('firstName');
  }

  protected get email(): AbstractControl<string | null> | null {
    return this.registerForm.get('email');
  }

  protected get phoneNumber(): AbstractControl<string | null> | null {
    return this.registerForm.get('phoneNumber');
  }

  protected get elo(): AbstractControl<string | null> | null {
    return this.registerForm.get('elo');
  }

  protected filterCountries(event: AutoCompleteCompleteEvent): void {
    const countries = ['POLSKA GÓRĄ'];
    const query = event.query;

    const filteredCountries = countries.filter((country) =>
      country.toLowerCase().startsWith(query.toLowerCase())
    );

    this.filteredCountries = filteredCountries;
  }

  protected onSubmit(): void {}
}
