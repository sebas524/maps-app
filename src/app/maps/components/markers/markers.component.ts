import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface colorOfMarker {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarkersComponent implements AfterViewInit {
  //! ATTRIBUTES
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomAmount: number = 15;
  center: [number, number] = [13.313330160590274, 52.50012804092757];
  arrayOfMarkers: colorOfMarker[] = [];

  //! INIT
  ngAfterViewInit(): void {
    console.log('afterViewInit: ', this.divMap);
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomAmount,
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'hello world';
    // new mapboxgl.Marker({ element: markerHtml })
    //   .setLngLat(this.center)
    //   .addTo(this.map);

    // new mapboxgl.Marker().setLngLat(this.center).addTo(this.map);
  }
  //! METHODS
  addMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const newMarker = new mapboxgl.Marker({ draggable: true, color: color })
      .setLngLat(this.center)
      .addTo(this.map);

    this.arrayOfMarkers.push({
      color: color,
      marker: newMarker,
    });
  }
  goToMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({ center: marker.getLngLat() });
  }
}
