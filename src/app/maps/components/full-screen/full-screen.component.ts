import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {} from 'src/environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #map {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.313330160590274, 52.50012804092757],
      zoom: 18,
    });
  }
}
