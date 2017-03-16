import { Directive, OnInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoScrollToBottom]'
})
export class AutoScrollToBottomDirective {
  constructor(
    private elem: ElementRef) {
  }

  ngOnInit() {
    // console.log('init');
  }

  ngAfterContentChecked() {
    this.scrollToBottom();
  }

  // @Output() scroll = new EventEmitter();
  scrollToBottom(): void {
    this.elem.nativeElement.scrollTop = this.elem.nativeElement.scrollHeight;
  }
}
