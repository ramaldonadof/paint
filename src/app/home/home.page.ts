import { Component, OnInit, ElementRef } from '@angular/core';

import * as p5 from 'p5';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {

  curve: any;
  canvasSizeX = 1500;
  canvasSizeY = 600;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const p5obj = new p5(p => {
      p.setup = () => { this.setup(p); };
      p.draw = () => { this.draw(p); };
    }, this.el.nativeElement);
  }

  setup(p) {
    const c = document.querySelector('#canvasContainer');
    p
      .createCanvas(this.canvasSizeX, this.canvasSizeY)
      .parent(c);
    p.background(220);

    p.stroke(1); // Hacer que el color de trazado sea blanco
    p.frameRate(30);
    
    let parts = 50;
    let part = this.canvasSizeX / parts;
    let partY = this.canvasSizeY / parts;
    let i = 0;
    do
    {
      p.line(i,0,i,this.canvasSizeY);
      i = i + part;
    }while(i<this.canvasSizeX);
      
    i = 0;
    
    do
    {
      p.line(0,i,this.canvasSizeX,i);
      i = i + part;
    }while(i<this.canvasSizeY);

  }

  draw(p) {
    //p.background(220);
    /*if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);*/
  }
}