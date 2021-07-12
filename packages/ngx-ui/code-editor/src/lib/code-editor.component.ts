import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
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
import './add-ons';
import { HintCompletion } from './models';

const CODEMIRROR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true,
};

@Component({
  selector: 'ngx-code-editor',
  exportAs: 'ngxCodemirror',
  template: `
    <div (ngxIntersect)="onIntersect()">
      <textarea #host></textarea>
      <div #content>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: [
    './styles/codemirror.css',
    './styles/lint.css',
    './styles/dialog.css',
    './styles/foldgutter.css',
    './styles/dracula.css',
    './styles/hint.scss',
    './code-editor.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CODEMIRROR_VALUE_ACCESSOR],
})
export class CodeEditorComponent implements OnInit, AfterViewInit {
  static ngAcceptInputType_autofocus: BooleanInput;
  static ngAcceptInputType_lineNumbers: BooleanInput;

  @HostBinding('class.ngx-code-editor') hostClass = true;

  @Input() config: Partial<CodeMirror.EditorConfiguration> = {
    lineWrapping: true,
  };
  @Input() theme = 'dracula';
  @Input() readOnly: CodeMirror.EditorConfiguration['readOnly'] = false;
  @Input()
  allowDropFileTypes: CodeMirror.EditorConfiguration['allowDropFileTypes'] = [];
  @Input() gutters: CodeMirror.EditorConfiguration['gutters'] = [];
  @Input() mode?: CodeMirror.EditorConfiguration['mode'];
  @Input() lint?: CodeMirror.EditorConfiguration['lint'];
  @Input() autocompleteTokens: Array<string | HintCompletion> = [];

  @NgxBooleanInput()
  @Input()
  autofocus = false;

  @NgxBooleanInput()
  @Input()
  lineNumbers = false;

  @Output() codeEditorChange = new EventEmitter<string>();
  @Output() codeEditorBlur = new EventEmitter<string>();

  instance?: CodeMirror.EditorFromTextArea;
  _value = '';

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(val);
      this.codeEditorChange.emit(this._value);
    }
  }

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLDivElement>;

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
      this.config.hintOptions.hint = this.autocomplete.bind(this);
    }
  }

  ngAfterViewInit(): void {
    if (this.value == null) {
      const elm = this.content.nativeElement;
      const code = elm.innerHTML;

      for (const childNode of Array.from(elm.childNodes)) {
        // this.renderer.removeChild(elm, childNode);
        elm.removeChild(childNode);
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
      this.instance.on('keyup', this.onKeyUp.bind(this));
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
        .replace(/\{ \{/gi, '{{')
        .replace(/\} \}/gi, '}}')
        // replace with < and > to render HTML in angular 2
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
    );
  }

  onIntersect() {
    // hidden on init will cause incorrect sizing
    this.instance?.refresh();
  }

  onKeyUp(cm: CodeMirror.Editor, event: KeyboardEvent) {
    if (
      (!cm.state.completionActive &&
        event.keyCode > 64 &&
        event.keyCode < 91) ||
      event.keyCode === 219
    ) {
      CodeMirror.commands.autocomplete(cm, undefined, {
        completeSingle: false,
      });
    }
  }

  onChange() {
    this.updateValue(this.instance?.getValue() || '');
  }

  onBlur() {
    this.codeEditorBlur.emit(this.instance?.getValue());
  }

  updateValue(value: string): void {
    this.value = value;
    this.onTouchedCallback();
    this.onChangeCallback(value);
    this.codeEditorChange.emit(value);
  }

  writeValue(val: string): void {
    if (val !== this.value && this.instance) {
      this._value = val;
      this.instance.setValue(this._value);
    }
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: string) => void = () => {
    // placeholder
  };

  private autocomplete(editor: CodeMirror.Editor) {
    const word = /[\S$]+/;
    const cur = editor.getCursor();
    const curLine = editor.getLine(cur.line);
    const end = cur.ch;
    let start = end;

    while (start && word.test(curLine.charAt(start - 1))) {
      --start;
    }

    const curWord = (start !== end && curLine.slice(start, end)) as string;
    const list = this.autocompleteTokens.filter(
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
