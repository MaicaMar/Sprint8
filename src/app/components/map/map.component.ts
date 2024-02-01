import { Component, OnInit } from '@angular/core';
import { createMap, addMarker, addSingleMarker } from './helpers/map-helper';
import { Location } from '../../interfaces/location.interface'
import { LocationService } from '../../services/location.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: []
})
export class MapComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    // Crear el mapa usando la función de ayuda (helpers/map-helper.ts)
    const map = createMap('map', environment.accessToken);

    // Recupera las ubicaciones desde la base de datos y agrega marcadores
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        locations.forEach(location => {
          const lngLat = { lat: location.latitude, lng: location.longitude };
          addSingleMarker(map, lngLat, location.name);
        });
      },
      error => {
        console.error('Error al recuperar ubicaciones:', error);
      }
    );

    // Llama a la función para agregar marcadores
    addMarker(map, (location: Omit<Location, 'id'>) => {
      this.sendLocationToBackend(location);
    });
  }

  // Función para enviar la ubicación al backend a través del servicio
  sendLocationToBackend(location: Omit<Location, 'id'>) {
    console.log('Enviar ubicación al backend:', location);

    // Llama al servicio de ubicación para almacenar los datos en el backend
    this.locationService.saveLocation(location).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
      },
      error => {
        console.error('Error al enviar la ubicación al backend:', error);
      }
    );
  }

}
