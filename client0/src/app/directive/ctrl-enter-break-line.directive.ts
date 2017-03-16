import { Directive } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, Output } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';
import { HostListener, EventEmitter } from '@angular/core';

const KEY_ENTER: number = 13;
const KEY_CTRL: number = 17;

@Directive({
  selector: '[appCtrlEnterBreakLine]'
})
export class CtrlEnterBreakLineDirective {

  @Input() set appCtrlEnterBreakLine(callback) {
    this.callback = callback;
  };
  @Input() newMessage: string = 'Hello';

  @Output() scroll = new EventEmitter();

  private ctrlDown = false;
  private callback;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer
  ) {
    // console.log(elem)
  }

  ngOnInit() {
    console.log(this.newMessage);
  }

  ngOnChange(changes: SimpleChanges) {
    console.log(this.newMessage)
  }

  @HostListener('keydown', ["$event"])
  keydown(e: any) {
    if (e.which === KEY_CTRL) {
      this.ctrlDown = true;
    }
    if (e.which === KEY_ENTER) {
      if (this.ctrlDown === true) {
        this.elem.nativeElement.value = this.elem.nativeElement.value + '\n';
      } else {
        e.preventDefault();
      }
    }
  }

  @HostListener('keyup', ["$event"])
  keyup(e: any) {
    if (e.which === KEY_CTRL) {
      this.ctrlDown = false;
    }
  }

}
