import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MarkersComponent } from './components/markers/markers.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullscreen', component: FullScreenComponent },
      { path: 'zoom-range', component: ZoomRangeComponent },
      { path: 'markers', component: MarkersComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'mini-map', component: MiniMapComponent },
      { path: '**', redirectTo: 'fullscreen' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
