import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, 
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, 
  OnDestroy, ViewChild, ElementRef, ContentChild} from '@angular/core';


@Component({
  // ViewEncapsulation.None <=> no style encapsulation so the styles you define in this component are global (will be applied in every other component)
  // ViewEncapsulation.ShadowDom <=> for the Shadow Dom technology (basically the same result as with ViewEncapsulation.Emulated but only on browsers that support this technology)
  // ViewEncapsulation.Emulated <=> default (applies to each styles in a component an unique attribute so the styles per component are all different even though the selector is the same)
  
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // By default, all properties of a component are only accessible in that component, not from outside
  // In order to make a property bindable, we must be explicit <=> add the @Input decorator
  // Any parent component can bind to this property
  // @Input('propertyNameForOutsideUse') <=> assign an alias to a property so it can be used outside of the component with that name (the property's name in the component will no longer work)
  @Input('serverElement')
  element: {
    type: string,
    name: string,
    content: string
  }

  @Input() 
  name: string;

  @ViewChild('heading', { static: true }) 
  header: ElementRef;

  // @ContentChild('referenceName') <=> just like ViewChild but for content (get access to content which is stored in another component but passed on via ng-content)
  @ContentChild('contentParagraph', { static: true }) 
  paragraph: ElementRef;

  constructor() {
    console.log('Constructor called');
  }


  ngOnInit() {
    console.log('OnInit called');
    console.log('Text content ' + this.header.nativeElement.textContent);
    console.log('Text content of paragraph ' + this.paragraph.nativeElement.textContent);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges called');
    console.log(changes);
  }


  ngDoCheck() {
    console.log('DoCheck called');
  }


  ngAfterContentInit() {
    console.log('AfterContentInit called');
    console.log('Text content of paragraph ' + this.paragraph.nativeElement.textContent);
  }


  ngAfterContentChecked() {
    console.log('AfterContentChecked called');
  }


  ngAfterViewInit() {
    console.log('AfterViewInit called');
    console.log('Text content ' + this.header.nativeElement.textContent);
  }


  ngAfterViewChecked() {
    console.log('AfterViewChecked called');
  }


  ngOnDestroy() {
    console.log('OnDestroy called');
  }
}