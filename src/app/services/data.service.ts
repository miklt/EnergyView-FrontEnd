import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getDailyConsumptionData(date: string): Observable<any> {
    const url = `${environment.apiUrl}/day-consumption-dashboard`;
    const params = new HttpParams().set('day', date);
    return this.http.get(url, {params});
  }

  getMonthlyConsumptionData(date: string): Observable<any> {
    const url = `${environment.apiUrl}//month-consumption-dashboard`;
    const params = new HttpParams().set('month', date);
    return this.http.get(url, {params});
  }

  getMonthlyFinancialData(date: string): Observable<any> {
    const url = `${environment.apiUrl}//month-financial-dashboard`;
    const params = new HttpParams().set('month', date);
    return this.http.get(url, {params});
  }
}