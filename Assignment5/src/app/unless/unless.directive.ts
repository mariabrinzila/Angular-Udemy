import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // Structural directive, the opposite of ngIf

  // Setter (it's still a property which has a method to set it which gets executed whenever the property changes)
  // The property must have the same name as the directive since we bind it to the condition
  @Input()
  set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear(); // remove everything from this place from the DOM
    }
  }

  constructor(private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef) {
    // TemplateRef gives us access to the template the directive is on 
    // Just like ElementRef gives us access to the element the directive is on
    // ViewContainerRef gives us access to where we place the directive in the document
  }
}