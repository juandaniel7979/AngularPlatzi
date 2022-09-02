import { Pipe, PipeTransform } from '@angular/core';
import { te } from 'date-fns/locale';

@Pipe({
  name: 'vocalNumbers'
})
export class VocalNumbersPipe implements PipeTransform {


  transform(value: string): string {
    const temp:(string|number)[] = value.split('');
    for (let index = 0; index < temp.length; index++) {
      if(this.NumberToLetter(temp[index])>0){
        temp[index]=this.NumberToLetter(temp[index]);
      }

    }
    const textoCambiado=temp.join('');
    return textoCambiado;
  }
  NumberToLetter(value:(string|number)){
    switch (value.toString().toLowerCase()) {
      case 'a':
        return 1;
      case 'e':
        return 2;
      case 'i':
        return 3;
      case 'o':
        return 4;
      case 'u':
        return 5;
      default:
        return 0;
    }
  }
}
