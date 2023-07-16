import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressformatter'
})
export class AddressformatterPipe implements PipeTransform {

  transform(value: any): string {
    const { addressLine1, addressLine2, city, state, zip } = value;
    return `${addressLine1} ${addressLine2 || ''} ${city} ${state} ${zip}`;
  }

}
