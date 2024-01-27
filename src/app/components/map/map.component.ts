import { Component, OnInit } from '@angular/core';
import { createMap } from './helpers/map-helper';
import { LocationService } from '../../services/location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '../../interfaces/location.interface';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ HttpClientModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: [LocationService, HttpClient]
})
export class MapComponent implements OnInit {
  locations: Location[] = [];

  constructor(private locationService: LocationService, private http: HttpClient) {}

  ngOnInit(): void {
    // Crear el mapa usando la función de ayuda (helpers/map-helper.ts)
    const map = createMap('map', 'pk.eyJ1IjoibWFpY2FtYXBib3giLCJhIjoiY2xyZThqemRwMThzMzJrdnhhYXdqZm1lcyJ9._3MRKxu1wVIZod8cakgw5g');

    // Agregar un evento de clic al mapa
    map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      this.handleMapClick(map, lat, lng);
    });

    // Obtener ubicaciones y mostrarlas en el mapa
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations = data;
        this.displayLocationsOnMap(map, this.locations);
      },
      (error) => {
        console.error('Error al obtener ubicaciones', error);
      }
    );
  }

  public handleMapClick(map: mapboxgl.Map, latitude: number, longitude: number): void {
    const locationName = prompt('Ingrese el nombre de la ubicación:');
    if (locationName) {
      // Envía datos al backend
      this.locationService.addLocation({ name: locationName, latitude, longitude })
        .subscribe(
          (newLocation) => {
            console.log(`Ubicación ${locationName} agregada con éxito:`, newLocation);
            // Actualizar el mapa con la nueva ubicación si lo deseas
            this.displayLocationsOnMap(map, [newLocation]);
          },
          (error) => {
            console.error('Error al agregar la ubicación', error);
          }
        );
    }
  }

  private displayLocationsOnMap(map: mapboxgl.Map, locations: Location[]): void {
    locations.forEach(location => {
      // Verificar si las coordenadas son válidas
      if (!isNaN(location.longitude) && !isNaN(location.latitude)) {
        // Crea y añade un marcador solo si las coordenadas son válidas
        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setText(`Nombre: ${location.name}`))
          .addTo(map);
      }
    });
}

  
}
