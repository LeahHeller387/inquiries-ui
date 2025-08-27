import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { InquiriesService } from '../../../../core/services/inquiries.service';

type MonthlyReportRow = {
  departmentName: string;
  currentMonthCount: number;
  prevMonthCount: number;
  sameMonthLastYearCount: number;
};

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressBarModule
  ],
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent {
  private api = inject(InquiriesService);

  year  = signal(new Date().getFullYear());
  month = signal(new Date().getMonth() + 1);

  loading = signal(false);
  error   = signal<string | null>(null);

  data = signal<MonthlyReportRow[]>([]);

  displayedColumns = ['department', 'current', 'prev', 'lastYear'] as const;

  private refetchTick = signal(0);

  constructor() {
    effect(() => {
      const y = this.year();
      const m = this.month();
      const _ = this.refetchTick(); 

      this.loading.set(true);
      this.error.set(null);

      const sub = this.api.monthlyReport({ year: y, month: m })
        .subscribe({
          next: rows => this.data.set(rows ?? []),
          error: () => this.error.set('אירעה שגיאה בטעינת הדוח'),
          complete: () => this.loading.set(false)
        });

      return () => sub.unsubscribe();
    });
  }

  reload() {
    this.refetchTick.update(n => n + 1);
  }
}
