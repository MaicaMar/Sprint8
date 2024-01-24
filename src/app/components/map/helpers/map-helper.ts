// map-helper.ts
import * as mapboxgl from 'mapbox-gl';

export function createMap(containerId: string, token: string): mapboxgl.Map {
    // Crea el mapa y configura el token
    const map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [2.1700, 41.3870], // Coordenadas de Barcelona
        zoom: 10,
        accessToken: token  // Configura el token aquí
    });

    return map;
}
// token de mapbox: "pk.eyJ1IjoibWFpY2FtYXBib3giLCJhIjoiY2xyZThqemRwMThzMzJrdnhhYXdqZm1lcyJ9._3MRKxu1wVIZod8cakgw5g"