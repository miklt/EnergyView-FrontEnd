import { SafeHtml } from '@angular/platform-browser';

export interface DailyConsumptionData {
  'consumo-acumulado': string | SafeHtml;
  'curva-de-carga': string | SafeHtml;
  'demanda-maxima': number,
  'demanda-media': number,
  'variacao-demanda-maxima': string,
  'variacao-demanda-media': string,
  'horario-de-pico': string,
  'horario-de-pico-ontem': string,
  'consumo-total': number,
  'variacao-consumo-total': string,
  'consumo-total-a': number,
  'variacao-consumo-total-a': string,
  'consumo-total-b': number,
  'variacao-consumo-total-b': string,
  'consumo-total-c': number,
  'variacao-consumo-total-c': string
}
