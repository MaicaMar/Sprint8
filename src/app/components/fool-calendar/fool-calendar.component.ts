import { Component, OnInit, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarEvent } from '../../interfaces/calendar-event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-fool-calendar',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, FullCalendarModule ],
  templateUrl: './fool-calendar.component.html',
  styleUrl: './fool-calendar.component.css'
})
export class FoolCalendarComponent implements OnInit {

  constructor() { }

  private eventsService = inject(EventsService);
  public events: CalendarEvent[] = [];
  public calendar?: Calendar;

  ngOnInit() {
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.updateCalendarOptions();
      }
    });
  }


   calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    themeSystem: 'bootstrap5',
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin],
    droppable: true,
    events: [
      { title: 'Evento 111', date: '2024-01-01' },
      { title: 'Evento 22222', date: '2024-01-02' }
    ],
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
     eventClick: (info) => {
       console.log('El console-log que dice Isma:', info.event);
      alert("Soy un evento de Maica: " + info.event.title);
    }
   }

   updateCalendarOptions() {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events.map(event => ({
        ...event,
        id: event.id?.toString() // Convierte el id a cadena si no es undefined
      }))
    };
  }


}
