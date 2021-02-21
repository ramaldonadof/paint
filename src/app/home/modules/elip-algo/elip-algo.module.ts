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
    return radius;
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

  ellipseMidpoint(p5, xCenter, yCenter, Rx, Ry, partX, partY)
  {
    let Rx2 = Rx*Rx;
    let Ry2 = Ry*Ry;
    let twoRx2 = 2*Rx2;
    let twoRy2 = 2*Ry2;
    let p;
    let x = 0;
    let y = Ry;
    let px = 0;
    let py = twoRx2 * y;

    /* Plot the first set of point */
    this.ellipsePlotPoints(p5, xCenter, yCenter, x, y, partX, partY);

    /* Region 1 */
    p = (Ry2 - (Rx2 * Ry) + (0.25 * Rx2)) + 0.5;

    while(px <py)
    {
      x++;
      px += twoRy2;

      if(p<0)
        p += Ry2 + px;
      else
      {
        y--;
        py -= twoRx2;
        p += Ry2 + px - py;
      }
      this.ellipsePlotPoints(p5, xCenter, yCenter, x, y, partX, partY);
    }

    /*Region 2 */
    p = (Ry2*(x+0.5)*(x+0.5)+ Rx2*(y-1)*(y-1) - Rx2*Ry2) + 0.5;

    while(y>0)
    {
      y--;
      py -= twoRx2;
      if(p>0)
        p += Rx2 - py;
      else
      {
        x++;
        px += twoRy2;
        p += Rx2 - py + px;
      }
      this.ellipsePlotPoints(p5, xCenter, yCenter, x, y, partX, partY);
    }
  }

  ellipsePlotPoints(p5, xCenter,  yCenter,  x,  y, partX, partY)
  {
    this.point.paintPoint(p5, xCenter + x, yCenter + y, partX, partY);
    this.point.paintPoint(p5, xCenter - x, yCenter + y, partX, partY);
    this.point.paintPoint(p5, xCenter + x, yCenter - y, partX, partY);
    this.point.paintPoint(p5, xCenter - x, yCenter - y, partX, partY);
  }
}
