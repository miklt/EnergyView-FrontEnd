import { Component, Input, AfterViewInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() innerHTML: SafeHtml = '';

  ngAfterViewInit(): void {
    this.executeScripts();
  }

  executeScripts(): void {
    // Get all script elements within the document
    const chartScripts = document.getElementsByTagName('script');

    // Loop through each script element executing them
    for (let i = 0; i < chartScripts.length; i++) {
      const scriptFunction = new Function(String(chartScripts[i].textContent));
      scriptFunction();
    }
  }
}
