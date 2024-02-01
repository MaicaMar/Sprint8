import { Routes } from '@angular/router';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { MapComponent } from './components/map/map.component';
import { FoolCalendarComponent } from './components/fool-calendar/fool-calendar.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserModalComponent } from './components/home/edit-user-modal/edit-user-modal.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'edit-user-modal',
        component: EditUserModalComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'fool-calendar',
        component: FoolCalendarComponent
    },
    {
        path: 'graphics',
        component: GraphicsComponent
    },
    {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
    }
];
