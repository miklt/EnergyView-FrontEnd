import { SafeHtml } from '@angular/platform-browser';

export interface DailyConsumptionData {
  'consumo-acumulado': string | SafeHtml;
  'curva-de-carga': string | SafeHtml;
  'demanda-maxima': number,
  'demanda-media': number,
  'variacao-demanda-maxima': number,
  'variacao-demanda-media': number,
  'horario-de-pico': string,
  'horario-de-pico-ontem': string,
  'consumo-total': number,
  'variacao-consumo-total': number,
  'consumo-total-a': number,
  'variacao-consumo-total-a': number,
  'consumo-total-b': number,
  'variacao-consumo-total-b': number,
  'consumo-total-c': number,
  'variacao-consumo-total-c': number
}
