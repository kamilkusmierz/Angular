import { Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges, OnChanges } from '@angular/core';


@Directive({
  selector: '[appCounterOf]'
})
export class CounterDirective implements OnChanges {
  constructor(private cointainer: ViewContainerRef, private template: TemplateRef<Object>) {
  }

 @Input() counterOf: number;


  ngOnChanges(change: SimpleChanges) {
    this.cointainer.clear();
    for (let i = 0; i < this.counterOf; i++) {
      this.cointainer.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}
class CounterDirectiveContext {
  constructor(public $implict: any) {}
}
