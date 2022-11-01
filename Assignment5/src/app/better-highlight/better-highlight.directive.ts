import { Directive, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';


@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // The renderer is a better approach of accessing the DOM (since Angular isn't limited to running in the browser and so sometimes we might not get access to the DOM)
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}


  ngOnInit() {
    /* this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', 'blue'); */
  }


  // HostListener('someEvent') methodName <=> the method is triggered when someEvent occurs
  @HostListener('mouseenter') 
  mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', 'blue'); 
  }


  @HostListener('mouseleave') 
  mouseleave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 
      'background-color', 'transparent');
  }
}
