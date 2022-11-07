import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propertyName: string) {
    // Return the servers in the array that fulfill the filterString (the input from the user)
    // filterString will the server's status
    if (value.length === 0 || filterString === '')
      return value;

    const resultArray = [];

    for (const item of value) {
      if (item[propertyName] === filterString) 
        resultArray.push(item);
    }

    return resultArray;
  }
}