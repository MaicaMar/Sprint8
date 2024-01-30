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
      // Aquí puedes realizar la lógica para enviar los datos al backend
      this.sendLocationToBackend(location);
    });

  }

  // Función para enviar la ubicación al backend a través del servicio
  sendLocationToBackend(location: Omit<Location, 'id'>) {
    // Aquí puedes llamar al servicio para enviar la ubicación al backend
    console.log('Enviar ubicación al backend:', location);

    // Llama a tu servicio de ubicación para almacenar los datos en el backend
    this.locationService.saveLocation(location).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
        // Luego de guardar la ubicación, puedes actualizar el mapa si es necesario
        // this.refreshMap(); // Agrega esta función si es necesaria
      },
      error => {
        console.error('Error al enviar la ubicación al backend:', error);
        // Aquí puedes manejar el error según tus necesidades
      }
    );
  }

  // // Función para eliminar un marcador
  // deleteMarker(locationId: string) {
  //   console.log('deleteMarker function called with locationId:', locationId);
  //   // Parsea el identificador para obtener la información necesaria
  //   const [name, lat, lng] = locationId.split('_');
  //   const location: Location = {
  //       name,
  //       latitude: parseFloat(lat),
  //       longitude: parseFloat(lng)
  //   };

  //   // Verifica si hay un id definido antes de llamar al servicio de ubicación para eliminar
  //   if (location.id) {
  //       this.locationService.deleteLocation(location.id).subscribe(
  //           response => {
  //               console.log('Marcador eliminado correctamente:', response);
  //               // Después de eliminar, puedes actualizar el mapa si es necesario
  //               // this.refreshMap(); // Agrega esta función si es necesaria
  //           },
  //           error => {
  //               console.error('Error al eliminar el marcador:', error);
  //               // Aquí puedes manejar el error según tus necesidades
  //           }
  //       );
  //   } else {
  //       console.error('El identificador del marcador no está definido. No se puede eliminar.');
  //       // Puedes manejar este caso de acuerdo a tus necesidades
  //   }
  // }

}
