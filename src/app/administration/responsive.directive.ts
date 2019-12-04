import {Directive, ElementRef, HostListener, Input, Renderer2, ViewChild} from '@angular/core';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective  {
  constructor(private compon: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('valueChange') change() {
    alert('hi');
    // const select = this.compon.nativeElement.querySelector('#select');
    // this.compon.nativeElement.style.width = `${this.value}px`;
  }

}
