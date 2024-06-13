import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealTimeData } from '../interfaces/RealTimeData';
import {
  MqttService,
  IMqttMessage, 
  
} from 'ngx-mqtt';


@Injectable({
  providedIn: 'root',
})
export class RealTimeDataService {
  
  private readonly mqttTopic = 'garsoft/dev/je05/dados';
  
  constructor(
    private _mqttService: MqttService    
  ) {}
 

  getRealTimeData(): Observable<RealTimeData> {
    return new Observable<RealTimeData>((observer) => {
      this._mqttService
        .observe(this.mqttTopic)
        .subscribe((message: IMqttMessage) => {
          const m = JSON.parse(message.payload.toString());
          const realTimeData: RealTimeData = m['DATA'];
          
          observer.next(realTimeData);
        });
    });
  }
}

