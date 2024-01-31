import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PieChartData } from '../interfaces/pie-chart-data.interface';


@Injectable({
  providedIn: 'root',
})
export class GraphicsService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  // Obtener todos los datos de 'graphics_barchart'
  getBarChartData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/graphics_barchart`);
  }

  // Actualizar un dato en 'graphics_barchart' por ID
  updateBarChartData(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/graphics_barchart/${id}`, data);
  }

  // Obtener todos los datos de 'graphics_doughnut'
  getPieChartData(): Observable<PieChartData[]> {
    return this.http.get<PieChartData[]>(`${this.apiUrl}/graphics_pie`);
  }

  // Actualizar un dato en 'graphics_doughnut' por ID
  updatePieChartData(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/graphics_pie/${id}`, data);
  }
}
