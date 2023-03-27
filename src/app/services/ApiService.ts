import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
    backendURLConsumoDiario = "http://127.0.0.1:8000/day-consumption-dashboard";
    backendURLConsumoMensal = "http://127.0.0.1:8000/"; //Mudar quando implementado
    backendURLFinanceiroDiario = "http://127.0.0.1:8000/"; //Mudar quando implementado
    backendURLFinanceiroMensal  = "http://127.0.0.1:8000/"; //Mudar quando implementado
    today = new Date();
    minDate = new Date();

    constructor(private http: HttpClient){
      var day = this.today.getDate();
      var month = this.today.getMonth() + 1;
      var year = this.today.getFullYear();
      if(day <= 9 && month <= 9) todayString = year + "-" + "0" + month + "-" + "0" + day;
      else if(day <= 9) var todayString = year + "-" + month + "-" + "0" + day;
      else if(month <= 9) var todayString = year + "-" + "0" + month + "-" + day;
      else var todayString = year + "-" + month + "-" + day;
      const params = new HttpParams().set("day", todayString);
      this.http.get(this.backendURLConsumoDiario, { params : params }).subscribe(
        (response : any) => {
          for(let i = 0; i < response.length; i++){
            response.push(response[i]);
          }
        }
      );
      this.minDate = new Date(this.today.getFullYear() - 20, 0, 1);
    }

    getResponse(dateString: string, dashboardType: string){
        let response = Array<string>();
        const params = new HttpParams().set("day", dateString);
        return new Promise((resolve, reject) => {
          if(dateString.length == 10){ //Diario
            if(dashboardType == "consumo"){ //Consumo diario
              this.http.get(this.backendURLConsumoDiario, { params : params }).subscribe(
                (response : any) => {
                  for(let i = 0; i < response.length; i++){
                    response.push(response[i]);
                  }
                  resolve(response);
                }
              );
            }
            else if(dashboardType == "financeiro"){ //Financeiro diario
              this.http.get(this.backendURLFinanceiroDiario, { params : params }).subscribe(
                (response : any) => {
                  for(let i = 0; i < response.length; i++){
                    response.push(response[i]);
                  }
                  resolve(response);
                }
              );
            }
            else{
              reject("Dashboard type not found.");
            }
          }
          else if(dateString.length == 7){ //Mensal
            if(dashboardType == "consumo"){ //Consumo mensal
              this.http.get(this.backendURLConsumoMensal, { params : params }).subscribe(
                (response : any) => {
                  for(let i = 0; i < response.length; i++){
                    response.push(response[i]);
                  }
                  resolve(response);
                }
              );
            }
            else if(dashboardType == "financeiro"){ //Financeiro mensal
              this.http.get(this.backendURLFinanceiroMensal, { params : params }).subscribe(
                (response : any) => {
                  for(let i = 0; i < response.length; i++){
                    response.push(response[i]);
                  }
                  resolve(response);
                }
              );
            }
            else{
              reject("Dashboard type not found.");
            }
          }
          else{
            reject("Date type not found.");
          }
        });
    }
}