import { Component, OnInit, ElementRef } from '@angular/core';
import { Line } from './objects/line/line';
import { PointModule } from './modules/point/point.module';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';
import { LinesAlgoModule } from './modules/lines-algo/lines-algo.module';

import * as p5 from 'p5';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {

  curve: any;
  private canvasSizeX = 650;
  private canvasSizeY = 650;
  private parts = 100;
  private partX = this.canvasSizeX / this.parts;
  private partY = this.canvasSizeY / this.parts;
  private state = "point";
  private numberClick = 1;
  private color = "000000";

  private point = new PointModule();
  private line = new Line(0,0,0,0);
  private lines = new LinesAlgoModule();
  private coordin = new CoordinatesModule();

  constructor(private el: ElementRef) { }

  ngOnInit()
  {
    const p5obj = new p5(p => {
      p.setup = () => { this.setup(p); };
      p.draw = () => { this.draw(p); };
      p.mouseClicked = () => { this.mouseClicked(p); };
      p.keyPressed = () => {this.keyPressed(p); };
    }, this.el.nativeElement);
  }

  setup(p)
  {
    const c = document.querySelector('#canvasContainer');
    p
      .createCanvas(this.canvasSizeX, this.canvasSizeY)
      .parent(c);
    p.background(220);

    p.stroke(1); // Hacer que el color de trazado sea negro
    p.frameRate(30);
    
    let i = 0;
    do
    {
      p.line(i,0,i,this.canvasSizeY);
      i = i + this.partX;
    }while(i<this.canvasSizeX);
      
    i = 0;
    
    do
    {
      p.line(0,i,this.canvasSizeX,i);
      i = i + this.partY;
    }while(i<this.canvasSizeY);

  }

  draw(p)
  {
    if(p.mouseIsPressed)
    {
      if(p.mouseX <= this.canvasSizeX && p.mouseY <= this.canvasSizeY && this.state == 'point')
      this.drawing(p);  
    }
  }

  mouseClicked(p) 
  {
    if(p.mouseX <= this.canvasSizeX && p.mouseY <= this.canvasSizeY)
    this.drawing(p);  
  }
  
  drawing(p)
  {
    p.fill(this.color.toString());
    console.log(this.color);
    switch(this.state)
    {
      case 'point':
      {
        var coor_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
        var coor_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY);
        this.point.paintPoint(p, coor_X, coor_Y, this.partX, this.partY);
        break;
      }
      case 'line':
      {
        var a_X, a_Y, b_X, b_Y;
      
        if(this.numberClick == 1)
        {
          a_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
          a_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY); 
          this.line.a_X = a_X;
          this.line.a_Y = a_Y;
          console.log('Soy 1');
        }

        if(this.numberClick == 2)
        {
          b_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
          b_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY); 

          this.line.b_X = b_X;
          this.line.b_Y = b_Y;

          this.numberClick = 0;
          console.log(this.line.a_X + " " + this.line.a_Y + " " + b_X + " " + b_Y);
          
          this.lines.DDALine(p, this.line.a_X, this.line.a_Y, b_X, b_Y, this.partX, this.partY);
        }
        
        this.numberClick = this.numberClick + 1;
        
        break;
      }
      case 'line_Bre':
      {

        var a_X, a_Y, b_X, b_Y;
    
        if(this.numberClick == 1)
        {
          a_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
          a_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY); 
          this.line.a_X = a_X;
          this.line.a_Y = a_Y;
          console.log('Soy 1');
        }

        if(this.numberClick == 2)
        {
          b_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
          b_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY); 

          this.line.b_X = b_X;
          this.line.b_Y = b_Y;

          this.numberClick = 0;
          console.log(this.line.a_X + " " + this.line.a_Y + " " + b_X + " " + b_Y);
          
          this.lines.lineBre(p, this.line.a_X, this.line.a_Y, b_X, b_Y, this.partX, this.partY);
        }
        
        this.numberClick = this.numberClick + 1;
        
        break;
      }
    }
  }

  modeChange(mode)
  {
    this.state = mode;
  }

  keyPressed(p)
  {
    if(p.DELETE)
    {
      p.background(220);

      p.stroke(1); // Hacer que el color de trazado sea negro
      p.frameRate(30);
      
      let i = 0;
      do
      {
        p.line(i,0,i,this.canvasSizeY);
        i = i + this.partX;
      }while(i<this.canvasSizeX);
        
      i = 0;
      
      do
      {
        p.line(0,i,this.canvasSizeX,i);
        i = i + this.partY;
      }while(i<this.canvasSizeY);
    }
  }

  startup() {
    var muestrario;
    var colorPredeterminado = "#0000ff";

    muestrario = document.querySelector("#muestrario");
    muestrario.value = colorPredeterminado;
    muestrario.addEventListener("input", this.actualizarPrimero, false);
    muestrario.addEventListener("change", this.actualizarTodo, false);
    muestrario.select();
  }

  actualizarPrimero(event) {
    var p = document.querySelector("p");
  
    if (p) {
      p.style.color = event.target.value;
      this.color = event.target.value;
    }
  }

  actualizarTodo(event) {
    document.querySelectorAll("p").forEach(function(p) {
      p.style.color = event.target.value;
      this.color = p.style.color;
    });
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}