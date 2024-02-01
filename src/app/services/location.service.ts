import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { environment } from '../../environments/environment';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  saveLocation(location: Location) {
    const url = `${API_URL}/locations`;
    return this.http.post(url, location);
  }

  getAllLocations(): Observable<Location[]> {
    const url = `${API_URL}/locations`;
    return this.http.get<Location[]>(url);
  }

  deleteLocation(id: number): Observable<any> {
    const url = `${API_URL}/locations/${id}`;
    return this.http.delete(url);
  }

}
