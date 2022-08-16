import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Make properties events that can be emitted to another component
  // Add the @Output() decorator to make a property listenable from parent components
  @Output()
  serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // @Output('propertyNameForOutsideUse') <=> assign an alias to a property so it can be used outside of the component with that name (the property's name in the component will no longer work)
  @Output('blueprint')
  blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  
  // @ViewChild('referenceNameOrComponentName') <=> get access to / fetch a local reference or a component
  // ElementRef <=> a local reference to a HTML element
  @ViewChild('serverContentInput', { static: true})
  serverContentInput: ElementRef;
  
  constructor() {}


  ngOnInit(): void {
    // Lifecycle hook => Angular supports a few:
    // ngOnChanges <=> called after a bound input property (properties decorated with @Input) changes
    // ngOnInit <=> called after the component is initialized (runs after the constructor)
    // ngDoCheck <=> called during every change detection run (Angular detects whether something changed inside a component, so whether it needs to change something in the template)
    // ngAfterContentInit <=> called after content (ng-content) has been projected into view 
    // ngAfterContentChecked <=> called every time the projected content (from ng-content) has been checked
    // ngAfterViewInit <=> called after the component's view (and child views) has been initialized
    // ngAfterViewChecked <=> called every time the component's view (and child views) has been checked
    // ngOnDestroy <=> called when the component is about to be destroyed
    // ngOnChanges is the only one that receives an argument (of type SimpleChanges)
  }


  onAddServer(nameInput: HTMLInputElement) {
    // Emit (pass) the data
    this.serverCreated.emit({
      serverName: nameInput.value, 
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  
  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value, 
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}