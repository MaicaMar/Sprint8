import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface'; // Ajusta la ruta según la ubicación real de tus carpetas
import { environment } from '../../environments/environment';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  // Obtener todas las ubicaciones
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${API_URL}/locations`);
  }

  // Agregar una nueva ubicación
  addLocation(locationData: { name: string; latitude: number; longitude: number }): Observable<Location> {
    return this.http.post<Location>(`${API_URL}/locations`, locationData);
}

    // // Agregar una nueva ubicación
    // addLocation(locationData: { name: string; latitude: number; longitude: number }): Observable<Location> {
    //   return this.http.post<Location>(`${API_URL}/locations`, locationData);
    // }
}