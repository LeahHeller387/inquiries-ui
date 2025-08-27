import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
    CreateInquiryDto,
    Department,
    Inquiry,
    MonthlyReportItem
} from '../../shared/models/inquiry.model';

@Injectable({ providedIn: 'root' })
export class InquiriesService {
    private http = inject(HttpClient);
    private base = `${environment.apiBaseUrl}/inquiries`;
    private reportsBase = `${environment.apiBaseUrl}/reports`;
    private departmentsBase = `${environment.apiBaseUrl}/departments`;

    getAll() {
        return this.http.get<Inquiry[]>(this.base);
    }

    create(dto: CreateInquiryDto) {
        return this.http.post<{ id: number }>(this.base, dto);
    }

    update(id: number, dto: CreateInquiryDto) {
        return this.http.put<void>(`${this.base}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.base}/${id}`);
    }

    getDepartments() {
        return this.http.get<Department[]>(`${environment.apiBaseUrl}/departments`);
    }


    monthlyReport(params?: { year?: number; month?: number }) {
        let qp = new HttpParams();
        if (params?.year !== undefined) qp = qp.set('year', String(params.year));
        if (params?.month !== undefined) qp = qp.set('month', String(params.month));
        return this.http.get<MonthlyReportItem[]>(`${this.reportsBase}/monthly`, { params: qp });
    }
}

