import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiConsumptionService {
    backendURLConsumoDiario : string = "http://127.0.0.1:8000/day-consumption-dashboard";

    constructor(private http: HttpClient) { 
    }

    getChartsConsumoDiario(dateParam: string){
        let data = Array<string>();
        const params = new HttpParams().set("date", "2023-03-20");

        this.http.get(this.backendURLConsumoDiario, { params : params }).subscribe(
            (response : any) => {
                for(let i = 0; i < response.length; i++){
                    data.push(response[i]);
                }
            }
        )
        console.log(data)
        return data;
    }
}