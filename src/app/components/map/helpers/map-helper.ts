// map-helper.ts
import * as mapboxgl from 'mapbox-gl';
import { Location } from '../../../interfaces/location.interface';
import { environment } from '../../../../environments/environment';


// Función para crear un mapa
export function createMap(containerId: string, token: string): mapboxgl.Map {
    const map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [2.1700, 41.3870], // Coordenadas de Barcelona
        zoom: 10,
        accessToken: environment.accessToken
    });

    return map;
}


// Función para agregar marcadores al mapa
export function addMarker(map: mapboxgl.Map, onMarkerAdded: (location: Omit<Location, 'id'>) => void) {
    map.on('contextmenu', (e) => {
        // Captura las coordenadas del clic derecho
        const lngLat = e.lngLat;

        // Aquí puedes abrir un modal o crear tu propio menú contextual para ingresar el nombre de la ubicación
        const locationName = prompt('Indica el nombre de esta ubicación');

        if (locationName) {
            const newLocation: Omit<Location, 'id'> = {
                name: locationName,
                latitude: lngLat.lat,
                longitude: lngLat.lng
            };

            // Añade un marcador al mapa
            addSingleMarker(map, lngLat, locationName);

            // Llama a la función de devolución de llamada cuando se agrega un marcador
            onMarkerAdded(newLocation);
        }
    });
}

// Función para agregar un marcador al mapa
export function addSingleMarker(map: mapboxgl.Map, lngLat: { lat: number; lng: number; }, locationName: string) {
    const locationId = `${locationName}_${lngLat.lat}_${lngLat.lng}`;
    // Convierte el objeto { lat, lng } a un objeto de tipo LngLat
    const mapboxLngLat = new mapboxgl.LngLat(lngLat.lng, lngLat.lat);

    new mapboxgl.Marker()
        .setLngLat(mapboxLngLat)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
            <div style="background-color: white; padding: 10px; border-radius: 10px;">
                <h4 style="margin: 0;">${locationName}</h4>
                <p>Esta es una ubicación personal</p>
            </div>
            `)
        )
        .addTo(map);
}
