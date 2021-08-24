import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getContactGroupKeys'
})
export class GetContactGroupKeysPipe implements PipeTransform {

  transform(objectValue: Object): string[]  {
    return Object.keys(objectValue);
  }

}
