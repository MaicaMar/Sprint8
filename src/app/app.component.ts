import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { FoolCalendarComponent } from './components/fool-calendar/fool-calendar.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserModalComponent } from './components/home/edit-user-modal/edit-user-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLinkActive,
    RouterLink,
    HttpClientModule,
    HomeComponent,
    MapComponent,
    FoolCalendarComponent,
    GraphicsComponent,
    EditUserModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sprint8chat';
}
