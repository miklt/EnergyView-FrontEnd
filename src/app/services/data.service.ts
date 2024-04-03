import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DailyConsumptionData } from '../interfaces/daily-consumption-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getDailyConsumptionData(date: string): Observable<DailyConsumptionData> {    
    const url = "/api/day-consumption-dashboard"; //using proxy instead of environment url.
    const params = new HttpParams().set('day', date);    
    return this.http.get<DailyConsumptionData>(url, {params});
  }
}
