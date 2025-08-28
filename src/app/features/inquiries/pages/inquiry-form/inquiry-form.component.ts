import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule, FormBuilder, Validators,
  ValidatorFn, AbstractControl, ValidationErrors
} from '@angular/forms';
import { InquiriesService } from '../../../../core/services/inquiries.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

type CreateInquiryDto = {
  name: string;
  phone: string;
  email: string;
  departmentIds: number[];
  description: string;
};

type Dept = { id: number; name: string };

const requiredTrimmed: ValidatorFn = (control: AbstractControl<string>): ValidationErrors | null => {
  const value = control.value ?? '';
  return value.trim().length > 0 ? null : { requiredTrimmed: true };
};

const PHONE_PREFIXES = ['050', '052', '053', '054', '055', '058'] as const;

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss']
})
export class InquiryFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(InquiriesService);
  private snack = inject(MatSnackBar);

  departments = toSignal(this.api.getDepartments() as unknown as import('rxjs').Observable<Dept[]>, {
    initialValue: [] as Dept[]
  });

  submitting = signal(false);
  phonePrefixes = PHONE_PREFIXES.slice();

  form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', Validators.required),

    phone: this.fb.nonNullable.group({
      prefix: this.fb.nonNullable.control<string>(PHONE_PREFIXES[0], Validators.required),
      number: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^\d{7}$/)
      ])
    }),

    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    departmentIds: this.fb.nonNullable.control<number[]>([], Validators.required),
    description: this.fb.nonNullable.control('', [Validators.required, requiredTrimmed]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    const raw = this.form.getRawValue();
    const fullPhone = `${raw.phone.prefix}${raw.phone.number}`;

    const dto: CreateInquiryDto = {
      name: raw.name,
      phone: fullPhone,
      email: raw.email,
      departmentIds: raw.departmentIds,
      description: raw.description.trim()
    };

    this.api.create(dto)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.form.reset({
            name: '',
            phone: { prefix: PHONE_PREFIXES[0], number: '' },
            email: '',
            departmentIds: [],
            description: ''
          });
          this.snack.open('הפנייה נשלחה בהצלחה', 'סגור', { duration: 3000, direction: 'rtl' });
        },
        error: () => {
          this.snack.open('ארעה שגיאה בשליחת הפנייה. נסו שוב.', 'סגור', { duration: 4000, direction: 'rtl' });
        }
      });
  }
}
