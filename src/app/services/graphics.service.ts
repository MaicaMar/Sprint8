import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


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

  // Obtener un dato en 'graphics_piechart' por ID
  getPieChartDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/graphics_piechart/${id}`);
  }

  

  // // Obtener todos los datos de 'graphics_piechart'
  // getPieChartData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/graphics_piechart`);
  // }

  // // Actualizar un dato en 'graphics_piechart' por ID
  // updatePieChartData(id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/graphics_piechart/${id}`, data);
  // }
}
