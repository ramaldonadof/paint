import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointModule } from '../point/point.module';
import { AuxCoorModule } from '../aux-coor/aux-coor.module';
import { AuxFuntionModule } from '../aux-funtion/aux-funtion.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PaintModule
{
  aux = new AuxFuntionModule();

  floodFill4(p, x, y, partX, partY, fillColor, color_O, color_A, parts, canvasSizeX, canvasSizeY)
  {
    let point = new PointModule();
    let aux_coor = new AuxCoorModule();
    let element = this.getpixel(fillColor, x, y);
    console.log(element);
    console.log(element.color_A + ' ' + color_O + ' ' + x  + ':' + y);
    if(fillColor.length > 0)
    {
      if(element.color_A == color_O && x <= parts && y <= parts && x>0 && y>0)
      {
        let aux = point.paintPoint(p, x, y, partX, partY, color_A);
        fillColor = aux_coor.exist(fillColor, element);
        fillColor = aux_coor.exist(fillColor, aux);
        aux = this.floodFill4 (p, x+1, y  , partX, partY, fillColor, color_O, color_A, parts, canvasSizeX, canvasSizeY);
        fillColor = aux_coor.exist(fillColor, element);
        aux = this.floodFill4 (p, x-1, y  , partX, partY, fillColor, color_O, color_A, parts, canvasSizeX, canvasSizeY);
        fillColor = aux_coor.exist(fillColor, element);
        aux = this.floodFill4 (p, x  , y+1, partX, partY, fillColor, color_O, color_A, parts, canvasSizeX, canvasSizeY);
        fillColor = aux_coor.exist(fillColor, element);
        aux = this.floodFill4 (p, x  , y-1, partX, partY, fillColor, color_O, color_A, parts, canvasSizeX, canvasSizeY);
        fillColor = aux_coor.exist(fillColor, element);
      }
    }
    else
    {
      this.aux.drawGrill(p, canvasSizeX, canvasSizeY, partX, partY, color_A);
    }
    return fillColor;
  }

  getpixel(fillColor, x, y)
  {
    let element;
    let conditional = true; 
    for(let i = 0; i<fillColor.length; i++)
    {
      if(fillColor[i].x == x && fillColor[i].y == y)
      {
        conditional = false;
        element = {x: fillColor[i].x, y: fillColor[i].y, color_A: fillColor[i].color_A, color_O: fillColor[i].color_O};
      }
    }

    if(conditional)
    {
      element = {x: x, y: y, color_A: 'FFFFFF', color_O: 'FFFFFF'};
    }

    return element;
  }

  actualcolor(object, x, y)
  {
    let element;
    let condition = true;
    console.log(x + ':' + y);
    for(let i = 0; i<object.length; i++)
    {
      if(object[i].x == x && object[i].y == y)
      {
        condition = false;
        element = object[i].color_A;
      }
    }
    if(condition)
    {
      element = 'FFFFFF';
    }0

    return element;
  }

}
