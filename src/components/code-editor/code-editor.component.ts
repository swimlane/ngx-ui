import {
  Component, Input, Output, ElementRef, ViewChild, OnInit, Renderer,
  EventEmitter, forwardRef, AfterViewInit, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import * as CodeMirror from 'codemirror';

// code extensions
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/powershell/powershell.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

// add-ons
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';

const CODEMIRROR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true
};

@Component({
  selector: 'ngx-codemirror',
  providers: [CODEMIRROR_VALUE_ACCESSOR],
  template: `
    <div visibilityObserver (visible)="onVisible()">
      <textarea #host></textarea>
      <div #content>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './codemirror.css',
    './lint.css',
    './dialog.css',
    './foldgutter.css',
    './dracula.css',
    './code-editor.component.scss'
  ]
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() config: any = {};
  @Input() theme: string = 'dracula';
  @Input() readOnly: any = false;
  @Input() mode: any;
  @Input() autofocus: boolean = false;
  @Input() lint: any;
  @Input() allowDropFileTypes: any[] = [];
  @Input() lineNumbers: any;
  @Input() gutters: any[] = [];

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(this._value);
    }
  }

  get value(): string {
    return this._value;
  }

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('host') host: any;
  @ViewChild('content') content: any;

  editor: any;
  instance: any;
  _value: string;

  constructor(private renderer: Renderer) { }

  ngOnInit(): void {
    this.config = {
      theme: this.theme,
      readOnly: this.readOnly,
      mode: this.mode,
      autofocus: this.autofocus,
      lint: this.lint,
      allowDropFileTypes: this.allowDropFileTypes,
      lineNumbers: this.lineNumbers,
      gutters: this.gutters,
      ...this.config
    };
  }

  ngAfterViewInit(): void {
    if(typeof this.value !== 'string') {
      const elm = this.content.nativeElement;
      const code = elm.innerHTML;
      this.renderer.detachView([].slice.call(elm.childNodes));
      this.host.nativeElement.value = this.cleanCode(code);
    }

    this.instance = CodeMirror.fromTextArea(this.host.nativeElement, this.config);
    this.instance.on('change', () => {
      this.updateValue(this.instance.getValue());
    });

    this.instance.on('blur', () => {
      this.blur.emit(this.instance.getValue());
    });
  }

  ngOnDestroy(): void {
    this.instance.off('change');
    this.instance.off('blur');
  }

  cleanCode(code: string): string {
    let lines = code.split('\n');
    
    // Remove empty lines
    lines = lines.filter(function(line) {
      return line.trim().length > 0;
    });

    // don't mess w/ empties
    if(!lines.length) return '';

    // Make it so each line starts at 0 whitespace
    const firstLineWhitespace = lines[0].match(/^\s*/)[0];
    const startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function(line) {
      return line
        .replace('=""', '') // remove empty values
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    const codeToParse = lines.join('\n')
      .replace(/\{ \{/gi, '{{').replace(/\} \}/gi, '}}')
      // replace with < and > to render HTML in angular 2
      .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');

    return codeToParse;
  }

  onVisible(): void {
    // hidden on init will cause incorrect sizing
    this.instance.refresh();
  }

  updateValue(value): void {
    this.value = value;
    this.onTouchedCallback();
    this.onChangeCallback(value);
    this.change.emit(value);
  }

  writeValue(val: any): void {
    if (val !== this.value && this.instance) {
      this._value = val;
      this.instance.setValue(this._value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
