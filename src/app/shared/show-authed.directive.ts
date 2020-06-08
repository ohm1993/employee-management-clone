import { Directive, ElementRef, Input, Renderer, HostBinding, Attribute, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy{
  @Input() appShowAuthed: boolean;
  sub: Subscription;
  constructor( private el: ElementRef, private renderer: Renderer) { 
    console.log('[appShowAuthed] value:' + this.appShowAuthed);
  }
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }

      } else {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        }
      }
  }

  ngOnDestroy() {
    console.log('[appShowAuthed] ngOnDestroy:');
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
