import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getDailyConsumptionData(dateString: string): Observable<any> {
    const url = 'http://143.107.102.8:8083/day-consumption-dashboard';
    const params = new HttpParams().set("day", dateString);
    return this.http.get(url, {params});
  }

  getMonthlyConsumptionData(dateString: string): Observable<any> {
    const url = 'http://143.107.102.8:8083/month-consumption-dashboard';
    const params = new HttpParams().set("month", dateString);
    return this.http.get(url, {params});
  }

  getMonthlyFinancialData(dateString: string): Observable<any> {
    const url = 'http://143.107.102.8:8083/month-financial-dashboard';
    const params = new HttpParams().set("month", dateString);
    return this.http.get(url, {params});
  }
}