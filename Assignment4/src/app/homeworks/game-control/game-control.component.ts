import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @ViewChild('start', { static: true})
  start: ElementRef;

  @Output()
  startEvent = new EventEmitter<number>();

  buttonNumber: number;

  constructor() {
    this.buttonNumber = 0;
  }


  ngOnInit(): void {}


  onStart() {
    this.start.nativeElement = setInterval(() => {
      this.buttonNumber++; 

      this.startEvent.emit(this.buttonNumber);
    }, 1000);
  }


  onStop() {
    clearInterval(this.start.nativeElement);
  }
}