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
  ChangeDetectorRef,
  EventEmitter,
  Output,
  SimpleChanges,
  OnChanges,
  HostBinding
} from '@angular/core';
import { IfTabActiveDirective } from './if-tab-active.directive';

let nextId = 0;

/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
@Component({
  selector: 'ngx-tab',
  templateUrl: './tab.component.html',
  host: {
    class: 'ngx-tab'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TabComponent implements OnInit, OnChanges {
  @HostBinding('attr.id')
  id = `tab-panel-${++nextId}`;

  @HostBinding('attr.aria-labelledby')
  tabId = `tab-${nextId}`;

  @HostBinding('attr.role')
  role = 'tabpanel';

  @Input() title = '';
  @Input() label: string | TemplateRef<any> = '';
  @Input() active = false;
  @Input() disabled = false;

  @Output() inputChanges = new EventEmitter<SimpleChanges>();

  @ViewChild('labelIsStringTmpl', { static: true }) labelStringTemplate;
  @ContentChild(IfTabActiveDirective) template: IfTabActiveDirective;
  labelTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnInit(): void {
    // backwards compatibility
    if (this.title) {
      this.label = this.title;
      this.renderer.removeAttribute(this.elRef.nativeElement, 'title');
    }

    this.labelTemplate = typeof this.label === 'string' ? this.labelStringTemplate : this.label;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges.emit(changes);
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }
}
