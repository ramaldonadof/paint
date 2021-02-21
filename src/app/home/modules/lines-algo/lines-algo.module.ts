import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointModule } from '../point/point.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LinesAlgoModule
{
  point = new PointModule();

  DDALine(p, sx, sy, ex, ey, partX, partY)
  {
    var dx = ex - sx;
    var dy = ey - sy;
    var steps;
    if(Math.abs(dx) > Math.abs(dy))
    {
        steps = Math.abs(dx);
    }
    else
    {
      steps = Math.abs(dy);
    }

    var xinc = dx / parseFloat(steps);
    var yinc = dy / parseFloat(steps);

    var x = sx;
    var y = sy;

    for (var i = 0; i <= steps; i++)
    {
      this.point.paintPoint(p, Math.round(x),Math.round(y), partX, partY);
      x += xinc;
      y += yinc;
    }
  }

  lineBre(p, x0, y0, x1, y1, partX, partY)
  { 
    var dx = Math.abs(x1-x0); 
    var dy = Math.abs(y1-y0); 
    var sx = (x0 < x1) ? 1 : -1; 
    var sy = (y0 < y1) ? 1 : -1; 
    var err = dx-dy; 

    while(true)
    { 
      this.point.paintPoint(p, x0, y0, partX, partY);

      if ((x0==x1) && (y0==y1)) break; 
      var e2 = 2*err; 
      if (e2 >-dy)
      {
        err -= dy; x0 += sx; 
      } 
      if (e2 < dx)
      {
        err += dx; y0 += sy; 
      } 
    } 
  }
}
