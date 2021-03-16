import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import * as CodeMirror from 'codemirror';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/hint/show-hint.js';

// add-ons
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/mode/handlebars/handlebars.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/powershell/powershell.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

// code extensions
import 'codemirror/mode/yaml/yaml.js';
import type { HintCompletion } from './models';
import './mustache';

const CODEMIRROR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeMirrorComponent),
  multi: true,
};

@Component({
  selector: 'ngx-codemirror',
  exportAs: 'ngxCodemirror',
  templateUrl: './code-mirror.component.html',
  styleUrls: [
    './codemirror.css',
    './lint.css',
    './dialog.css',
    './foldgutter.css',
    './dracula.css',
    './hint.scss',
    './code-mirror.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CODEMIRROR_VALUE_ACCESSOR],
})
export class CodeMirrorComponent implements OnInit {
  static ngAcceptInputType_autofocus: BooleanInput;
  static ngAcceptInputType_lineNumbers: BooleanInput;

  @Input() config: CodeMirror.EditorConfiguration = { lineWrapping: true };
  @Input() mode?: string | Record<string, unknown>;
  @Input() lint?:
    | boolean
    | CodeMirror.LintStateOptions
    | CodeMirror.Linter
    | CodeMirror.AsyncLinter;

  @Input() theme = 'dracular';
  @Input() readOnly: string | boolean = false;

  @Input() allowDropFileTypes: string[] = [];
  @Input() gutters: Array<string | { className: string; style?: string }> = [];
  @Input() autocompleteTokens?: Array<string | HintCompletion>;

  @InputBoolean()
  @Input()
  autofocus = false;

  @InputBoolean()
  @Input()
  lineNumbers = false;

  @Output() change = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLDivElement>;

  instance!: CodeMirror.EditorFromTextArea;

  _value!: string;

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

  constructor(private readonly renderer: Renderer2) {}

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
        'Ctrl-Space': 'autocomplete',
      },
      ...this.config,
    };

    if (this.autocompleteTokens) {
      this.config.hintOptions = this.config.hintOptions || {};
      this.config.hintOptions.hint = (cm: CodeMirror.Editor) =>
        this.autocomplete(cm as CodeMirror.EditorFromTextArea);
    }
  }

  ngAfterViewInit(): void {
    if (typeof this.value !== 'string') {
      const elm = this.content.nativeElement;
      const code = elm.innerHTML;

      let childNodeIndex = elm.childNodes.length;
      while (childNodeIndex--) {
        const childNode = elm.childNodes.item(childNodeIndex);
        this.renderer.removeChild(elm, childNode);
      }

      this.host.nativeElement.value = this.cleanCode(code);
    }

    this.instance = CodeMirror.fromTextArea(
      this.host.nativeElement,
      this.config
    );
    this.instance.on('change', this.onChange.bind(this));
    this.instance.on('blur', this.onBlur.bind(this));

    if (this.autocompleteTokens) {
      this.instance.on('keyup', (instance, event) => {
        this.onKeyUp(instance as CodeMirror.EditorFromTextArea, event);
      });
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
    const firstLineWhitespace = lines[0].match(/^\s*/)?.[0];
    // tslint:disable-next-line: tsr-detect-non-literal-regexp
    const startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function (line) {
      return line
        .replace('=""', '') // remove empty values
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    return (
      lines
        .join('\n')
        .replace(/{ {/gi, '{{')
        .replace(/} }/gi, '}}')
        // replace with < and > to render HTML in angular 2
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
    );
  }

  onVisible(): void {
    // hidden on init will cause incorrect sizing
    this.instance.refresh();
  }

  onKeyUp(cm: CodeMirror.EditorFromTextArea, event: KeyboardEvent) {
    if (
      (!cm.state.completionActive &&
        event.keyCode > 64 &&
        event.keyCode < 91) ||
      event.keyCode === 219
    ) {
      (CodeMirror.commands as any).autocomplete(cm, null, {
        completeSingle: false,
      });
    }
  }

  onChange() {
    this.updateValue(this.instance!.getValue());
  }

  onBlur() {
    this.blur.emit(this.instance!.getValue());
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

    const curWord = start !== end ? curLine.slice(start, end) : '';
    const list = this.autocompleteTokens?.filter(
      (s: string | HintCompletion) => {
        s = typeof s === 'string' ? s : s.text;
        return s ? s.startsWith(curWord) : false;
      }
    );

    return {
      list,
      from: CodeMirror.Pos(cur.line, start),
      to: CodeMirror.Pos(cur.line, end),
    };
  }
}
