import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strikes'
})
export class StrikesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let str = '';

    switch(value) {
      case 0: str = '-- Clean Record --'; break;
      case 1: str = '-- X --'; break;
      case 2: str = 'X -- X'; break;
      case 3: str = '--Banned --'; break;
    }

    return str;
  }

}
