import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointModule } from '../point/point.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuxCoorModule
{

  exist(object, element)
  {
    let a = true;
    for(let i = 0; i<object.length; i++)
    {
      if(object[i].x == element.x && object[i].y == element.y && object[i].color_A == element.color_A)
      {
        console.log('Existe')
        a = false;
      }
      if(object[i].x == element.x && object[i].y == element.y && object[i].color_A != element.color_A)
      {
        object[i].color_O = object[i].color_A;
        object[i].color_A = element.color_A;
        a = false;
      }
    }

    if(a)
    {
      object.push(element)
    }
    return object;
  }

  existEl(object1, object2)
  {
    for(let j = 0; j<object2.length; j++)
    {
      let a = true;
      for(let i = 0; i<object1.length; i++)
      {
        if(object1[i].x == object2[j].x && object1[i].y == object2[j].y && object1[i].color_A == object2[j].color_A)
        {
          console.log('Existe')
          a = false;
        }
        if(object1[i].x == object2[j].x && object1[i].y == object2[j].y && object1[i].color_A != object2[j].color_A)
        {
          object1[i].color_O = object1[i].color_A;
          object1[i].color_A = object2[j].color_A;
          a = false;
        }
      }
      if(a)
      {
        object1.push(object2[j])
      }
    }
    return object1;
  }

  redrawin_Size(p, object, partX, partY)
  {
    let point = new PointModule();
    for(let i = 0; i<object.length; i++)
    {
      point.paintPoint(p, object[i].x, object[i].y, partX, partY,object[i].color_A);
    }
  }
}
