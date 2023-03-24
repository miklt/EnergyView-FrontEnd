import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiConsumptionService {
  //carList: Car[];

    backendURL : string = 'HERE_GOES_THE_URL/curva-de-carga';
    backendURLConsumoDiario : string = "HERE_GOES_THE_URL/dashboard-consumo-diario";
    
    constructor(private http: HttpClient) { 
        
    }
    getChartsConsumoDiario(dateParam: Date){
        let data = Array<string>();
        const params = new HttpParams().set("date", dateParam.toDateString());

        this.http.get(this.backendURLConsumoDiario, { params : params }).subscribe(
            (response : any) => {
                for(let i = 0; i < response.length; i++){
                    data.push(response[i]);
                }
            }
        )
        return data;
    }

}