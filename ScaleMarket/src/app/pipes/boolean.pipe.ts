import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let str = '';

    switch(value) {
      case 0: str = 'No'; break;
      case 1: str = 'Yes'; break;
    }

    return str;
  }

}
