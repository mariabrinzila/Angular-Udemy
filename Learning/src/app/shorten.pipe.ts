import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    /* transform(value: any) {
        // Custom pipe
        if (value.length > 10)
            // Get the first 10 characters of the given value
            return value.substr(0, 10) + ' ...';
        
        return value;
    } */


    transform(value: any, limit: number) {
        // Custom parametrized pipe
        if (value.length > limit)
            // Get the first 10 characters of the given value
            return value.substr(0, limit) + ' ...';
        
        return value;
    }
}