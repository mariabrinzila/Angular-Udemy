import { Directive, ElementRef, Renderer2, HostListener, 
  HostBinding, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[appEvenBetterHighlight]'
})
export class EvenBetterHighlightDirective implements OnInit {
  // Directive properties
  @Input() 
  defaultColor = 'transparent';
  
  @Input('appEvenBetterHighlight') 
  highlightColor = 'blue';

  // @HostBinding('property') <=> binded to a property whose value will become important, the argument is a string defining to which property of the hosting element we want to bind
  @HostBinding('style.backgroundColor') 
  backgroundColor: string;

  constructor() {}


  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }


  // HostListener('someEvent') methodName <=> the method is triggered when someEvent occurs
  @HostListener('mouseenter') 
  mouseover() {
    this.backgroundColor = this.highlightColor;  
  }


  @HostListener('mouseleave') 
  mouseleave() {
    this.backgroundColor = this.defaultColor; 
  }
}