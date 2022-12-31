import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileStatus'
})
export class ProfileStatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let status = '';
    switch(value) {
      case 0: status = 'Newcomer'; break;
      case 1: status = 'Zamac'; break;
      case 2: status = 'Iron'; break;
      case 3: status = 'Silver'; break;
      case 4: status = 'Gold'; break;
      case 5: status = 'Platinum'; break;
    }

    return status;
  }
}
