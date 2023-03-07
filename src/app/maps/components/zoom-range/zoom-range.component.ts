import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }
      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 30px;
        padding: 10px;
        position: fixed;
        z-index: 9999;
        width: 400px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  //! ATTRIBUTES
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomAmount: number = 10;
  center: [number, number] = [13.313330160590274, 52.50012804092757];

  //! CONSTRUCTOR
  constructor() {}

  //! INIT
  ngAfterViewInit(): void {
    console.log('afterViewInit: ', this.divMap);
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomAmount,
    });

    this.map.on('zoom', () => {
      this.zoomAmount = this.map.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (e) => {
      const target = e.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  //! METHODS
  zoomOut() {
    this.map.zoomOut();
    console.log('zoom out!');
  }
  zoomIn() {
    this.map.zoomIn();

    console.log('zoom in!');
  }

  zoomChange(value: string) {
    console.log(value);
    this.map.zoomTo(Number(value));
  }
}
