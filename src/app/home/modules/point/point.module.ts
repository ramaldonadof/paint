import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesModule } from '../coordinates/coordinates.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class PointModule
{ 
  coor = new CoordinatesModule();

  paintPoint(p, point_X, point_Y, partX, partY)
  {
      let aux_X = this.coor.coordinates_to_mousePosition(partX, point_X);
      let aux_Y = this.coor.coordinates_to_mousePosition(partY, point_Y);

      p.fill(1);
      p.rect(aux_X, aux_Y, partX, partY);
  }
  
}
