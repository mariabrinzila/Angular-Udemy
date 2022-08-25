import { Directive, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // @HostBinding allows us to bind to properties of the element the directive is placed on
    @HostBinding('class.open')
    isOpen = false;

    // Listen for click events <=> @HostListener('click')
    @HostListener('click') 
    toggleOpen() {
        // When isOpen is true, it'll add open to the class attribute to the element and when it's false, it'll remove it
        this.isOpen = !this.isOpen;
    }
}