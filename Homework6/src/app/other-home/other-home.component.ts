import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './other-home.component.html',
  styleUrls: ['./other-home.component.css']
})
export class OtherHomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;
  private customObservableSubscription: Subscription;

  constructor() {}


  ngOnInit() {
    // Build a new observable
    // interval(nr) <=> every nr miliseconds, a new event will be emitted
    // subscribe returns a subscription
    this.firstObservableSubscription = interval(1000).subscribe(
      count => {
        console.log('New observable: ' + count);
      }
    );

    // Build a real custom observable
    const customIntervalObservable = new Observable(
      // observer <=> the part that is interested in being informed about new data, errors, completion (it's the listener)
      observer => {
        let count = 0;

        setInterval(
          () => {
            // next <=> method to emit a new valu
            // error <=> method to throw an error
            // complete <=> anounce the observe the observable has been completed
            observer.next(count);

            // Have the observable complete (there are no other values emitted, it's done)
            // We don't need to unsubscribe, if the observables completed
            if (count === 2) 
              observer.complete();

            // Throw an error
            // Whenever an observable throws an error, it cancels (it won't emit any other values)
            // Canceling due to an error is different to completion <=> it won't get to the completion handling code
            if (count > 3) 
              observer.error(new Error('Count is greater than 3!'));

            count++;
          }, 1000);
      }
    );
    
    // Operators <=> transform the data / change the format of the data in the observable (this is done before subscribing)
    // After the operators are done transforming the data, we can subscribe to the observable and use the transformed data
    // Operators can be used on any observable (custom or built in)
    // To see the changed data, the observable we subscribe to must be replace with the observable with the pipe function
    // pipe can receive as many operators as we want (they're separated with ,)
    customIntervalObservable.pipe(map(
      (data: number) => {
        // data is the current data emitted by the observable
        // The map function returns the transformed data
        return 'Round: ' + (data + 1);
      }
    ));
    
    // subscribe can have 3 functions <=> one for handling the data, one for handling errors and one for handling the completion
    this.customObservableSubscription = customIntervalObservable.pipe(filter(data => {
        // The function returns true / false whether the data will be go on or it'll be dropped
        return data > 0;
      }), map(
      (data: number) => {
        // data is the current data emitted by the observable
        // The map function returns the transformed data
        return 'Round: ' + (data + 1);
      })).subscribe(
      data => {
        console.log('Custom observable: ' + data);
      }, 
      error => {
        console.log(error);
        alert(error.message);
      }, 
      () => {
        console.log('Completed');
      }
    );
  } 


  ngOnDestroy() {
    // Memory leak <=> the memory is ocupied with data we don't need 
    // To stop an observable from emitting an event when we're no longer interested in it and prevent memory leaks <=> unsubscribe
    // Whenever we leave this componenent, the subscription is cleared (the counter stops)
    // All the Angular observables (features, in packages etc. like params for example) are managed by Angular so we don't have to unsubscribe manually, this happens automatically because Angular takes care of it
    this.firstObservableSubscription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }
}