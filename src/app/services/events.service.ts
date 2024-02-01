import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../interfaces/calendar-event';
import { Observable, map } from 'rxjs';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }


  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<{ start: string; end: string; id?: number; title: string; color: string }[]>(`${API_URL}/events`).pipe(
      map(events => events.map(event => ({
        ...event
      })))
    );
  }

}
