import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './map/map.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { GraphicsComponent } from './graphics/graphics.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'full-calendar',
        component: FullCalendarComponent
    },
    {
        path: 'graphics',
        component: GraphicsComponent
    },
    {
        path: '**',
        redirectTo: '/home'
    },
    // {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    // }
];
