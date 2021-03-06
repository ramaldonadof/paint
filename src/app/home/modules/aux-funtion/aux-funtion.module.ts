import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { Line } from 'src/app/home/objects/line/line';
import { Ellipse } from 'src/app/home/objects/ellipse/ellipse';
import { LinesAlgoModule } from '../lines-algo/lines-algo.module';
import { ElipAlgoModule } from '../elip-algo/elip-algo.module';
import { AuxCoorModule } from '../aux-coor/aux-coor.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuxFuntionModule
{
  
  private coordin = new CoordinatesModule();
  private auxState = '';
  private line = new Line(0,0,0,0);
  private ellipse = new Ellipse(0,0,0,0,0,0);
  private lines = new LinesAlgoModule();
  private elip = new ElipAlgoModule();
  private aux_coor = new AuxCoorModule();

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  drawGrill(p, canvasSizeX, canvasSizeY, partX, partY, color_back)
  {
    let i = 0;
    p.background(color_back);
    p.fill(1);
    do
    {
      p.line(i,0,i,canvasSizeY);
      i = i + partX;
    }while(i<canvasSizeX);
      
    i = 0;
    
    do
    {
      p.line(0,i,canvasSizeX,i);
      i = i + partY;
    }while(i<canvasSizeY);
  }

  doubleClickPaint(p, state, numberClick, partX, partY, color)
  {
    let a_X, a_Y, b_X, b_Y;
    let object = [];

    switch(numberClick)
    {
      case 1:
      {
        this.auxState = state;
        a_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
        a_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 
        this.line.a_X = a_X;
        this.line.a_Y = a_Y;
        break;
      }
      case 2:
      {
        if(this.auxState == state)
        {
          b_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
          b_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

          this.line.b_X = b_X;
          this.line.b_Y = b_Y;

          numberClick = 0;
          switch(state)
          {
            case'line':
            {
              let aux = this.lines.DDALine(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY, color);
              object = this.aux_coor.existEl(object, aux);
              break;
            }
            case'line_Bre':
            {
              let aux = this.lines.lineBre(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY, color);
              object = this.aux_coor.existEl(object, aux);
              break;
            }
            case 'circle':
            {
              let aux = this.elip.circleMidpoint(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY, color);
              object = this.aux_coor.existEl(object, aux);
              break;
            }
          }
        }
        else if(this.auxState != state)
        {
          this.line.a_X = 0;
          this.line.a_Y = 0;
          this.line.b_X = 0;
          this.line.b_Y = 0;
          numberClick = 0;
        }
        break;
      }
    }
    numberClick = numberClick + 1;
    return [numberClick, object];
  }

  tripleClickPaint(p, state, numberClick, partX, partY, color)
  {
    let a_X, a_Y, b_X, b_Y, c_X, c_Y, d_a, d_b;
    let object = [];

    switch(numberClick)
    {
      case 1:
      {
        this.auxState = state;
        a_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
        a_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY);

        this.ellipse.a_X = a_X;
        this.ellipse.a_Y = a_Y;
        break;
      }
      case 2:
      {
        if(this.auxState == state)
        {
          this.auxState = state;
          b_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
          b_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

          this.ellipse.b_X = b_X;
          this.ellipse.b_Y = b_Y;
        }
        else
        {
          this.ellipse.a_X = 0;
          this.ellipse.a_Y = 0;
          this.ellipse.b_X = 0;
          this.ellipse.b_Y = 0;
          this.ellipse.c_X = 0;
          this.ellipse.c_Y = 0;
          numberClick = 0;
        }
        break;
      }
      case 3:
      {
        if(this.auxState == state)
        {
          c_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
          c_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

          this.ellipse.c_X = c_X;
          this.ellipse.c_Y = c_Y;

          numberClick = 0;
          d_a = this.elip.radius(this.ellipse.a_X, this.ellipse.a_Y, this.ellipse.b_X, this.ellipse.b_Y);
          d_b = this.elip.radius(this.ellipse.a_X, this.ellipse.a_Y, c_X, c_Y);
          let aux = this.elip.ellipseMidpoint(p, this.ellipse.a_X, this.ellipse.a_Y, Math.round(d_a), Math.round(d_b), partX, partY, color);
          object = this.aux_coor.existEl(object, aux);
        }
        else
        {
          this.ellipse.a_X = 0;
          this.ellipse.a_Y = 0;
          this.ellipse.b_X = 0;
          this.ellipse.b_Y = 0;
          this.ellipse.c_X = 0;
          this.ellipse.c_Y = 0;
          numberClick = 0;
        }
        break;
      }
    }
    numberClick += 1;
    return [numberClick, object];
  }

  actual_Color()
  {
    let muestrario;

    muestrario = document.querySelector("#muestrario");

    return muestrario.value;
  }
}