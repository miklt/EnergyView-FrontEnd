import { Component } from '@angular/core';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent {
  today = new Date();
  response : any = {} as any;

  constructor(private apiClient : ApiService){
    this.getData(); //Starts getData loop
  }

  async getData() {
    while (true){ //Loops every 15 minutes
      //Sets today again in case the day has changed
      this.today = new Date();

      //Separates the date in day, month and year to make a formatted string
      var day = this.today.getDate();
      var month = this.today.getMonth() + 1; //For some reason month goes from 0 to 11
      var year = this.today.getFullYear();

      //Handles the date so that dateString is always YYYY-MM-DD
      if(day <= 9 && month <= 9) dateString = year + "-" + "0" + month + "-" + "0" + day;
      else if(day <= 9) var dateString = year + "-" + month + "-" + "0" + day;
      else if(month <= 9) var dateString = year + "-" + "0" + month + "-" + day;
      else var dateString = year + "-" + month + "-" + day;

      //Gets the response
      this.response = await this.apiClient.getResponse(dateString, "consumo");

      //Waits for 15 minutes
      await new Promise(resolve => setTimeout(resolve, 900000));
    }
  }
}
