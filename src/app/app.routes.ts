import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/inquiries/pages/inquiry-form/inquiry-form.component')
        .then(c => c.InquiryFormComponent),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./features/reports/pages/monthly-report/monthly-report.component')
        .then(c => c.MonthlyReportComponent),
  },
  { path: '**', redirectTo: '' },
];
