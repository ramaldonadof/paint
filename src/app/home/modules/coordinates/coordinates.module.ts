import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoordinatesModule 
{
  mousePosition_to_coordinates(_part, pos)
    {
        var coor;

        for(var i = 0; i*_part<= pos;i++)
        {
        coor = i;
        }
        return  coor + 1;
    }

    coordinates_to_mousePosition(_part, coor_X)
    {
        let point = _part * (coor_X - 1);
        return point;
    }
}
