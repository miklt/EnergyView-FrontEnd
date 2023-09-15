import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent {
  demandaAtual = 702;

  constructor(){
    this.generateRandomNumbers();
  }
  
  async generateRandomNumbers() {
    while(true){
      await new Promise<void>(resolve => {
        setTimeout(() => {
          // Generate a random number in the range of 600 to 800
          this.demandaAtual = Math.floor(Math.random() * (800 - 600 + 1)) + 600;
          resolve();
        }, 10000); // Delay the execution of each iteration by 10 seconds (10000 milliseconds)
      });
    }
  }
  
}
