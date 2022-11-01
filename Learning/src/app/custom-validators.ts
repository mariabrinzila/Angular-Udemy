import { FormControl } from '@angular/forms';

import { Observable } from "rxjs";


export class CustomValidators {
    static forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test')
            return { 'forbiddenProjectName': true };
        
        return null;
    }


    static forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'TestAsync')
                        resolve({ 'forbiddenProjectNameAsync': true });
                    else
                        resolve(null);
                }, 1500);
            }
        );
    }
}