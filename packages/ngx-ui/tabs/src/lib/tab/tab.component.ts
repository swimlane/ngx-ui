import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IfTabActiveDirective } from '../directives';

@Component({
  selector: 'ngx-tab',
  templateUrl: './tab.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit, OnChanges {
  @HostBinding('class.ngx-tab') hostClass = true;

  @Input() label: string | TemplateRef<unknown> = '';
  @Input() active = false;
  @Input() disabled = false;

  @Output() inputChanges = new EventEmitter<SimpleChanges>();

  @ViewChild('labelIsStringTmpl', { static: true, read: TemplateRef })
  labelStringTemplate?: TemplateRef<unknown>;

  @ContentChild(IfTabActiveDirective) template?: IfTabActiveDirective;
  labelTemplate?: TemplateRef<unknown>;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.labelTemplate =
      typeof this.label === 'string' ? this.labelStringTemplate : this.label;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges.emit(changes);
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }
}
