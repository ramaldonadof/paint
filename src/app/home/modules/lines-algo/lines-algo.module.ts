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
    let dx = ex - sx;
    let dy = ey - sy;
    let steps;
    if(Math.abs(dx) > Math.abs(dy))
    {
        steps = Math.abs(dx);
    }
    else
    {
      steps = Math.abs(dy);
    }

    let xinc = dx / parseFloat(steps);
    let yinc = dy / parseFloat(steps);

    let x = sx;
    let y = sy;

    for (let i = 0; i <= steps; i++)
    {
      this.point.paintPoint(p, Math.round(x),Math.round(y), partX, partY);
      x += xinc;
      y += yinc;
    }
  }

  lineBre(p, x0, y0, x1, y1, partX, partY)
  { 
    let dx = Math.abs(x1-x0); 
    let dy = Math.abs(y1-y0); 
    let sx = (x0 < x1) ? 1 : -1; 
    let sy = (y0 < y1) ? 1 : -1; 
    let err = dx-dy; 

    while(true)
    { 
      this.point.paintPoint(p, x0, y0, partX, partY);

      if ((x0==x1) && (y0==y1)) break; 
      let e2 = 2*err; 
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
