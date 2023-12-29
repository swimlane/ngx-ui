import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import type * as CodeMirror from 'codemirror';

import { HintCompletion } from './hint-completion.interface';
import { isPlatformBrowser } from '@angular/common';

const CODEMIRROR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true
};

let codeMirror: typeof import('codemirror') = null;
if (typeof window !== 'undefined') {
  import('codemirror').then(e => {
    // @ts-ignore
    codeMirror = e.default ?? e;
  });

  // code extensions
  import('codemirror/mode/yaml/yaml.js');
  import('codemirror/mode/python/python.js');
  import('codemirror/mode/powershell/powershell.js');
  import('codemirror/mode/javascript/javascript.js');
  import('codemirror/mode/htmlmixed/htmlmixed.js');
  import('codemirror/mode/spreadsheet/spreadsheet.js');
  import('codemirror/mode/handlebars/handlebars.js');
  import('./mustache');

  // add-ons
  import('codemirror/addon/lint/lint.js');
  import('codemirror/addon/search/search.js');
  import('codemirror/addon/search/searchcursor.js');
  import('codemirror/addon/search/jump-to-line.js');
  import('codemirror/addon/dialog/dialog.js');
  import('codemirror/addon/fold/foldcode.js');
  import('codemirror/addon/fold/foldgutter.js');
  import('codemirror/addon/fold/indent-fold.js');
  import('codemirror/addon/hint/show-hint.js');
  import('codemirror/addon/mode/overlay.js');
}

@Component({
  exportAs: 'ngxCodemirror',
  selector: 'ngx-codemirror',
  providers: [CODEMIRROR_VALUE_ACCESSOR],
  host: { class: 'ngx-codemirror' },
  templateUrl: './code-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './codemirror.css',
    './lint.css',
    './dialog.css',
    './foldgutter.css',
    './dracula.css',
    './hint.scss',
    './code-editor.component.scss'
  ]
})
export class CodeEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() config: any = { lineWrapping: true };
  @Input() theme = 'dracula';
  @Input() readOnly: string | boolean = false;
  @Input() allowDropFileTypes: string[] = [];
  @Input() gutters: Array<string | { className: string; style?: string }> = [];
  @Input() mode?: any;
  @Input() lint?: any;
  @Input() autocompleteTokens?: Array<string | HintCompletion>;

  @Input()
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(autofocus: boolean) {
    this._autofocus = coerceBooleanProperty(autofocus);
  }

  @Input()
  get lineNumbers() {
    return this._lineNumbers;
  }
  set lineNumbers(lineNumbers: boolean) {
    this._lineNumbers = coerceBooleanProperty(lineNumbers);
  }

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('host', { static: true }) host: any;
  @ViewChild('content', { static: true }) content: any;

  instance: CodeMirror.EditorFromTextArea;
  _value: string;

  get value(): string {
    return this._value;
  }
  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(this._value);
    }
  }

  private _autofocus = false;
  private _lineNumbers = false;

  constructor(private readonly renderer: Renderer2, @Inject(PLATFORM_ID) private readonly platformId: any) {}

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
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      },
      ...this.config
    };

    if (this.autocompleteTokens) {
      this.config.hintOptions = this.config.hintOptions || {};
      this.config.hintOptions.hint = this.autocomplete.bind(this);
    }
  }

  ngAfterViewInit(): void {
    if (typeof this.value !== 'string') {
      const elm = this.content.nativeElement;
      const code = elm.innerHTML;

      for (const childNode of elm.childNodes) {
        this.renderer.removeChild(elm, childNode);
      }

      this.host.nativeElement.value = this.cleanCode(code);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.instance = codeMirror.fromTextArea(this.host.nativeElement, this.config);
      this.instance.on('change', this.onChange.bind(this));
      this.instance.on('blur', this.onBlur.bind(this));

      if (this.autocompleteTokens) {
        this.instance.on('keyup', this.onKeyUp.bind(this));
      }
    }
  }

  cleanCode(code: string): string {
    let lines = code.split('\n');

    // Remove empty lines
    lines = lines.filter(function (line) {
      return line.trim().length > 0;
    });

    // don't mess w/ empties
    if (!lines.length) return '';

    // Make it so each line starts at 0 whitespace
    const firstLineWhitespace = lines[0].match(/^\s*/)[0];
    // eslint-disable-next-line
    const startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function (line) {
      return line
        .replace('=""', '') // remove empty values
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    const codeToParse = lines
      .join('\n')
      .replace(/\{ \{/gi, '{{')
      .replace(/\} \}/gi, '}}')
      // replace with < and > to render HTML in angular 2
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>');

    return codeToParse;
  }

  onVisible(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // hidden on init will cause incorrect sizing
    this.instance.refresh();
  }

  onKeyUp(cm: CodeMirror.EditorFromTextArea, event: KeyboardEvent) {
    if ((!cm.state.completionActive && event.keyCode > 64 && event.keyCode < 91) || event.keyCode === 219) {
      (codeMirror.commands as any).autocomplete(cm, null, { completeSingle: false });
    }
  }

  onChange() {
    this.updateValue(this.instance.getValue());
  }

  onBlur() {
    this.blur.emit(this.instance.getValue());
  }

  updateValue(value: string): void {
    this.value = value;
    this.onTouchedCallback();
    this.onChangeCallback(value);
    this.change.emit(value);
  }

  writeValue(val: string): void {
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
  };

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  private autocomplete(editor: CodeMirror.EditorFromTextArea) {
    const word = /[\S$]+/;
    const cur = editor.getCursor();
    const curLine = editor.getLine(cur.line);
    const end = cur.ch;
    let start = end;

    while (start && word.test(curLine.charAt(start - 1))) {
      --start;
    }

    const curWord = start !== end && curLine.slice(start, end);
    const list = this.autocompleteTokens.filter((s: string | HintCompletion) => {
      s = typeof s === 'string' ? s : s.text;
      return s ? s.startsWith(curWord) : false;
    });

    return {
      list,
      from: codeMirror.Pos(cur.line, start),
      to: codeMirror.Pos(cur.line, end)
    };
  }
}
