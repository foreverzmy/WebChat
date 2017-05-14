import { Directive } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoScrollToBottom]'
})
export class AutoScrollToBottomDirective implements AfterViewChecked {

  constructor(
    public elem: ElementRef
  ) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.elem.nativeElement.scrollTop = this.elem.nativeElement.scrollHeight;
  }
}
