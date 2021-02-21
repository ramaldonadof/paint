import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { Line } from 'src/app/home/objects/line/line';
import { Ellipse } from 'src/app/home/objects/ellipse/ellipse';
import { LinesAlgoModule } from '../lines-algo/lines-algo.module';
import { ElipAlgoModule } from '../elip-algo/elip-algo.module';


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

    switch(numberClick)
    {
      case 1:
      {
        this.auxState = state;
        a_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
        a_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 
        this.line.a_X = a_X;
        this.line.a_Y = a_Y;
        console.log('Soy 1');
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
              this.elip.circleMidpoint(p, this.line.a_X, this.line.a_Y, b_X, b_Y, partX, partY);
              break;
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
        break;
      }
    }
    numberClick = numberClick + 1;
    return numberClick;
  }

  tripleClickPaint(p, state, numberClick, partX, partY)
  {
    let a_X, a_Y, b_X, b_Y, c_X, c_Y, d_a, d_b;

    switch(numberClick)
    {
      case 1:
      {
        this.auxState = state;
        a_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
        a_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY);

        this.ellipse.a_X = a_X;
        this.ellipse.a_Y = a_Y;
        console.log('Soy elipse 1');
        break;
      }
      case 2:
      {
        console.log('Soy elipse 2');
        if(this.auxState == state)
        {
          this.auxState = state;
          b_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
          b_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

          this.ellipse.b_X = b_X;
          this.ellipse.b_Y = b_Y;
          console.log('Soy 2');
        }
        else
        {
          console.log(this.auxState + ' : ' + state);
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
        console.log('Soy elipse 3');
        if(this.auxState == state)
        {
          c_X = this.coordin.mousePosition_to_coordinates(partX, p.mouseX);
          c_Y = this.coordin.mousePosition_to_coordinates(partY, p.mouseY); 

          this.ellipse.c_X = c_X;
          this.ellipse.c_Y = c_Y;

          numberClick = 0;
          console.log('Soy 3');
          d_a = this.elip.radius(this.ellipse.a_X, this.ellipse.a_Y, this.ellipse.b_X, this.ellipse.b_Y);
          d_b = this.elip.radius(this.ellipse.a_X, this.ellipse.a_Y, c_X, c_Y);
          this.elip.ellipseMidpoint(p, this.ellipse.a_X, this.ellipse.a_Y, Math.round(d_a), Math.round(d_b), partX, partY);
        }
        else
        {
          console.log(this.auxState + ' : ' + state);
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
    console.log(numberClick);
    return numberClick;
  }
}
