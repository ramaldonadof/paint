import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { Line } from 'src/app/home/objects/line/line';
import { LinesAlgoModule } from '../lines-algo/lines-algo.module';


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
  private lines = new LinesAlgoModule();

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  drawGrill(p, canvasSizeX, canvasSizeY, partX, partY)
  {
    let i = 0;
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

  doubleClickPaint(p, state, numberClick, partX, partY)
  {
    let a_X, a_Y, b_X, b_Y;
    
    if(numberClick == 1)
    {
      this.auxState = state;
      a_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
      a_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 
      this.line.a_X = a_X;
      this.line.a_Y = a_Y;
      console.log('Soy 1');
    }

    if(numberClick == 2 && this.auxState == state)
    {
      b_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
      b_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

      this.line.b_X = b_X;
      this.line.b_Y = b_Y;

      numberClick = 0;
      console.log(this.line.a_X + " " + this.line.a_Y + " " + b_X + " " + b_Y);
      switch(state)
      {
        case'line':
        {
          this.lines.DDALine(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY);
          break;
        }
        case'line_Bre':
        {
          this.lines.lineBre(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY);
          break;
        }
        case 'circle':
        {
          
        }
      }
    }
    else if(this.auxState != state)
    {
      console.log(this.auxState + ' : ' + state);
      this.line.a_X = 0;
      this.line.a_Y = 0;
      this.line.b_X = 0;
      this.line.b_Y = 0;
      numberClick = 0;
    }
    
    numberClick = numberClick + 1;

    return numberClick;
  }
}
