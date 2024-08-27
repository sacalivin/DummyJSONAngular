import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFocusInvalidInput]',
  standalone: true,
})
export class FocusInvalidInputDirective {
  @ContentChildren(NgControl) formControls!: QueryList<NgControl>;

  @HostListener('submit')
  check(formControls?: QueryList<NgControl>) {
    const controls = formControls
      ? formControls.toArray()
      : this.formControls.toArray();

    for (let field of controls) {
      if (field.invalid) {
        
        (field.valueAccessor as any)._elementRef.nativeElement.focus();
        console.error(field);
        break;
      }
    }
  }
}
