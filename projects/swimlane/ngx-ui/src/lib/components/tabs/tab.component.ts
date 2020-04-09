import {
  Component,
  Input,
  TemplateRef,
  ContentChild,
  ElementRef,
  Renderer2,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { IfTabActiveDirective } from './if-tab-active.directive';

/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
@Component({
  selector: 'ngx-tab',
  templateUrl: './tab.component.html',
  host: {
    class: 'ngx-tab'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  @Input() title: string = '';
  @Input() label: string | TemplateRef<any> = '';
  @Input() active = false;
  @Input() disabled = false;
  @ViewChild('labelIsStringTmpl', { static: true }) labelStringTemplate;
  @ContentChild(IfTabActiveDirective) template: IfTabActiveDirective;
  labelTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit() {
    // backwards compatibility
    if (this.title) {
      this.label = this.title;
      this.renderer.removeAttribute(this.elRef.nativeElement, 'title');
    }

    this.labelTemplate = typeof this.label === 'string' ? this.labelStringTemplate : this.label;
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}
