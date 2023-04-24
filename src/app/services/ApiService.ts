import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // Credenciais de conexao na VM da AWS
  /*
    backendURLConsumoDiario = "http://44.203.100.131:80/day-consumption-dashboard";
    backendURLConsumoMensal = "http://44.203.100.131:80/month-consumption-dashboard";
    backendURLFinanceiroDiario = "http://44.203.100.131:80/day-financial-dashboard";
    backendURLFinanceiroMensal  = "http://44.203.100.131:80/month-financial-dashboard";
  */

  // Credenciais de conexao no ambiente de homologacao do LabSoft
  
    backendURLConsumoDiario = "http://143.107.102.8:8083/day-consumption-dashboard";
    backendURLConsumoMensal = "http://143.107.102.8:8083/month-consumption-dashboard";
    backendURLFinanceiroDiario = "http://143.107.102.8:8083/day-financial-dashboard";
    backendURLFinanceiroMensal  = "http://143.107.102.8:8083/month-financial-dashboard";
  
    constructor(private http: HttpClient){}

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
                },
                (error : any) => {
                  console.error("There's no data for the informed date", error);
                  resolve([]);
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
                },
                (error : any) => {
                  console.error("There's no data for the informed date", error);
                  resolve([]);
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
                },
                (error : any) => {
                  console.error("There's no data for the informed date", error);
                  resolve([]);
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
                },
                (error : any) => {
                  console.error("There's no data for the informed date", error);
                  resolve([]);
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