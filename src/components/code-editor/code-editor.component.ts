import {
  Component, Input, Output, ElementRef, ViewChild, 
  EventEmitter, forwardRef, AfterViewInit, ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/powershell/powershell.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

import * as codeMirrorCss from 'codemirror/lib/codemirror.css';
import * as draculaCss from 'codemirror/theme/dracula.css';

@Component({
  selector: 'codemirror',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  }],
  template: `<textarea #host></textarea>`,
  encapsulation: ViewEncapsulation.None,
  styles: [
    codeMirrorCss,
    draculaCss
  ]
})
export class CodeEditorComponent implements AfterViewInit {

  @Input() config: any;

  get value(): any {
    return this._value;
  }

  @Input() set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(this._value);
    }
  }

  @Output() instance = null;
  @Output() change: EventEmitter<any> = new EventEmitter();

  @ViewChild('host') host: any;

  editor: any;
  _value: string = '';

  ngAfterViewInit() {
    this.config = this.config || {};
    this.codemirrorInit(this.config);
  }

  codemirrorInit(config) {
    this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
    this.instance.on('change', () => {
      this.updateValue(this.instance.getValue());
    });
  }

  updateValue(value) {
    this.value = value;
    this.onTouchedCallback();
    this.onChangeCallback(value);
    this.change.emit(value);
  }

  writeValue(val: any): void {
    if (val !== this.value && this.instance) {
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
