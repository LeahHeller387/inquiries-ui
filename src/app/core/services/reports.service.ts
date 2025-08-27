import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MonthlyReportItem } from '../../shared/models/monthly-report.model';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/reports`;

  getMonthly(year?: number, month?: number) {
    let params = new HttpParams();
    if (year)  params = params.set('year', year);
    if (month) params = params.set('month', month);
    return this.http.get<MonthlyReportItem[]>(`${this.base}/monthly`, { params });
  }
}
