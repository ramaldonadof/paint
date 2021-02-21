import { Component, OnInit, ElementRef } from '@angular/core';
import { PointModule } from './modules/point/point.module';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';
import { AuxFuntionModule } from './modules/aux-funtion/aux-funtion.module';
import { ElipAlgoModule } from './modules/elip-algo/elip-algo.module';

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
  private parts = 20;
  private partX = this.canvasSizeX / this.parts;
  private partY = this.canvasSizeY / this.parts;
  private state = "point";
  private numberClick = 1;
  private color = "000000";

  private point = new PointModule();
  private coordin = new CoordinatesModule();
  private aux = new AuxFuntionModule();
  private ellip = new ElipAlgoModule();

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
    
    this.aux.drawGrill(p, this.canvasSizeX, this.canvasSizeY, this.partX, this.partY);

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
    
    switch(this.state)
    {
      case 'point':
      {
        let coor_X = this.coordin.mousePosition_to_coordinates(this.partX, p.mouseX);
        let coor_Y = this.coordin.mousePosition_to_coordinates(this.partY, p.mouseY);
        this.point.paintPoint(p, coor_X, coor_Y, this.partX, this.partY);
        break;
      }
      case 'ellipse':
      {
        this.numberClick = this.aux.tripleClickPaint(p, this.state, this.numberClick, this.partX, this.partY);
        break;
      }
      default:
      {
        console.log('Estado: ' + this.numberClick);
        this.numberClick = this.aux.doubleClickPaint(p, this.state, this.numberClick, this.partX, this.partY);
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
    if(p.D)
    {
      p.background(220);

      this.aux.drawGrill(p, this.canvasSizeX, this.canvasSizeY, this.partX, this.partY);
    }
  }

  startup() {
    let muestrario;
    let colorPredeterminado = "#0000ff";

    muestrario = document.querySelector("#muestrario");
    muestrario.value = colorPredeterminado;
    muestrario.addEventListener("input", this.actualizarPrimero, false);
    muestrario.addEventListener("change", this.actualizarTodo, false);
    muestrario.select();
  }

  actualizarPrimero(event) {
    let p = document.querySelector("p");
  
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
}