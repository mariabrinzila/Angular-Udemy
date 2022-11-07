import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  // Set pure to false so that the list is resorted when new servers are added or filtered etc. (they will always be displayed sorted)
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  /* transform(value: any) {
    // Sort servers by name in ascending order
    // sort can receive a function as a parameter that tells it how to sort 2 objects (1 for greater, 0 for equal, -1 for smaller)
    return value.sort(
      (server1, server2) => {
        if (server1.name > server2.name)
          return 1;

        if (server1.name < server2.name)
          return -1;

        return 0;
      }
    );
  } */


  transform(value: any, sortBy: string) {
    return value.sort(
      (a, b) => {
        if (a[sortBy] > b[sortBy])
          return 1;
        else
          return -1;
      }
    );
  }
}