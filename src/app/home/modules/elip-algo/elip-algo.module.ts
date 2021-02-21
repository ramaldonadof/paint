import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointModule } from '../point/point.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ElipAlgoModule
{
  private point = new PointModule();

  circleMidpoint (p5, xCenter, yCenter, b_X, b_Y, partX, partY)
  {
    console.log('Circulito');
    let radius = Math.round(this.radius( xCenter, yCenter, b_X, b_Y));
    let x = 0;
    let y = radius;
    let p = 1 - radius;

    /' Plot first set of points '/
    this.circlePlotPoints (p5, xCenter, yCenter, x, y, partX, partY);

    while (x < y) 
    {
      x++;
      if (p < 0) 
        p += 2 * x + 1;
      else
      {
        y--;
        p += 2 * (x - y) + 1;
      }
      this.circlePlotPoints (p5, xCenter, yCenter, x, y, partX, partY);
    }
  }

  radius( xCenter, yCenter, b_X, b_Y)
  {
    let aux_X = (xCenter-b_X) * (xCenter-b_X);
    let aux_Y = (yCenter-b_Y) * (yCenter-b_Y);
    let radius = Math.sqrt(aux_X+aux_Y);
    console.log('X: ' + aux_X + ' Y: ' + aux_Y + ' radius: ' + radius);
    return radius
  }

  circlePlotPoints (p5, xCenter,  yCenter,  x,  y, partX, partY)
  {
    this.point.paintPoint(p5, xCenter + x, yCenter + y, partX, partY);
    this.point.paintPoint(p5, xCenter - x, yCenter + y, partX, partY);
    this.point.paintPoint(p5, xCenter + x, yCenter - y, partX, partY);
    this.point.paintPoint(p5, xCenter - x, yCenter - y, partX, partY);
    this.point.paintPoint(p5, xCenter + y, yCenter + x, partX, partY);
    this.point.paintPoint(p5, xCenter - y, yCenter + x, partX, partY);
    this.point.paintPoint(p5, xCenter + y, yCenter - x, partX, partY);
    this.point.paintPoint(p5, xCenter - y, yCenter - x, partX, partY);
  }
}
