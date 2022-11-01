import { EventEmitter } from "@angular/core";

export class CounterService {
    // Counter for active -> inactive switches
    inactiveSwitch = 0;

    // Counter for inactive -> active switches
    activeSwitch = 0;

    inactiveChange = new EventEmitter<number>();

    activeSwitchIncrement() {
        this.activeSwitch++;
    }


    inactiveSwitchIncrement() {
        this.inactiveSwitch++;
    }
}