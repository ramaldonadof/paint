import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { GridCo } from '../../objects/grid-co';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class PointModule
{ 
  coor = new CoordinatesModule();

  paintPoint(p, point_X, point_Y, partX, partY, color)
  {
    let point = {}
    p.fill(color);
    let aux_X = this.coor.coordinates_to_mousePosition(partX, point_X);
    let aux_Y = this.coor.coordinates_to_mousePosition(partY, point_Y);
    console.log(point_X + " " + point_Y);
    point = {x:point_X, y:point_Y, color_A: color, color_O: 'FFFFFF'}
    p.rect(aux_X, aux_Y, partX, partY);
    return point;
  }
  
}
