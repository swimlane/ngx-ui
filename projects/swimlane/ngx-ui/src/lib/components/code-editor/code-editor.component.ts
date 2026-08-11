import {
  Component,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Renderer2,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';

import { EditorState, Extension, Compartment, StateEffect } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers as lineNumbersExt,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  tooltips
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  foldGutter,
  foldKeymap,
  bracketMatching,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle
} from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap, CompletionContext } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';
import { lintKeymap, linter, lintGutter, Diagnostic } from '@codemirror/lint';
import { jsonParseLinter } from '@codemirror/lang-json';

import { HintCompletion } from './hint-completion.interface';
import { isJsonLikeMode, languageExtensionForMode } from './code-editor-languages';
import { themeExtensionForName } from './code-editor-themes';
import { fillHostHeight } from './fill-host-height';

const CODEMIRROR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true
};

@Component({
  exportAs: 'ngxCodemirror',
  selector: 'ngx-codemirror',
  providers: [CODEMIRROR_VALUE_ACCESSOR],
  host: { class: 'ngx-codemirror' },
  templateUrl: './code-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./code-editor.component.scss', './hint.scss'],
  standalone: false
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() config: any = { lineWrapping: true };
  @Input() theme = 'dracula';
  @Input() readOnly: string | boolean = false;
  @Input() allowDropFileTypes: string[] = [];
  /** Legacy CM5 gutters; fold/lint gutters are enabled from config or lint. */
  @Input() gutters: Array<string | { className: string; style?: string }> = [];
  @Input() mode?: any;
  @Input() lint?: any;
  @Input() autocompleteTokens?: Array<string | HintCompletion>;
  /** Extra CodeMirror 6 extensions (e.g. app-specific languages). */
  @Input() extensions: Extension[] = [];

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

  @ViewChild('host', { static: true }) host: ElementRef<HTMLDivElement>;
  @ViewChild('content', { static: true }) content: ElementRef<HTMLDivElement>;

  /** CodeMirror 6 EditorView instance (breaking: was CM5 EditorFromTextArea). */
  instance: EditorView;
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
  private _updatingFromWrite = false;

  private readonly themeCompartment = new Compartment();
  private readonly languageCompartment = new Compartment();
  private readonly lineNumbersCompartment = new Compartment();
  private readonly readOnlyCompartment = new Compartment();
  private readonly lintCompartment = new Compartment();
  private readonly foldCompartment = new Compartment();
  private readonly autocompleteCompartment = new Compartment();
  private readonly extensionsCompartment = new Compartment();
  private readonly wrappingCompartment = new Compartment();

  private readonly overlay = inject(Overlay);
  private ownsTooltipPortalLease = false;

  private static tooltipPortal: { overlayRef: OverlayRef; host: HTMLElement; refCount: number } | null = null;

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
      lineWrapping: true,
      ...this.config
    };

    if (this.config.theme != null) {
      this.theme = this.config.theme;
    }
    if (this.config.mode != null && this.mode == null) {
      this.mode = this.config.mode;
    }
    if (this.config.lineNumbers != null) {
      this._lineNumbers = coerceBooleanProperty(this.config.lineNumbers);
    }
    if (this.config.readOnly != null && this.readOnly === false) {
      this.readOnly = this.config.readOnly;
    }
    if (this.config.lint != null && this.lint == null) {
      this.lint = this.config.lint;
    }
    if (this.config.autofocus != null) {
      this._autofocus = coerceBooleanProperty(this.config.autofocus);
    }
  }

  ngAfterViewInit(): void {
    let initialDoc = typeof this._value === 'string' ? this._value : '';

    if (typeof this._value !== 'string') {
      const elm = this.content.nativeElement;
      const code = elm.innerHTML;

      for (const childNode of Array.from(elm.childNodes)) {
        this.renderer.removeChild(elm, childNode);
      }

      initialDoc = this.cleanCode(code);
      this._value = initialDoc;
    }

    this.instance = new EditorView({
      parent: this.host.nativeElement,
      state: EditorState.create({
        doc: initialDoc || '',
        extensions: this.buildExtensions()
      })
    });

    if (this._autofocus) {
      this.instance.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const effects: StateEffect<unknown>[] = [];

    if (changes['theme'] && !changes['theme'].firstChange) {
      effects.push(this.themeCompartment.reconfigure(themeExtensionForName(this.theme)));
    }
    if (changes['mode'] && !changes['mode'].firstChange) {
      effects.push(this.languageCompartment.reconfigure(languageExtensionForMode(this.mode)));
      effects.push(this.lintCompartment.reconfigure(this.buildLintExtension()));
    }
    if (changes['lineNumbers'] && !changes['lineNumbers'].firstChange) {
      effects.push(this.lineNumbersCompartment.reconfigure(this.buildLineNumbersExtension()));
    }
    if (changes['readOnly'] && !changes['readOnly'].firstChange) {
      effects.push(this.readOnlyCompartment.reconfigure(this.buildReadOnlyExtension()));
    }
    if (changes['lint'] && !changes['lint'].firstChange) {
      effects.push(this.lintCompartment.reconfigure(this.buildLintExtension()));
    }
    if (changes['autocompleteTokens'] && !changes['autocompleteTokens'].firstChange) {
      effects.push(this.autocompleteCompartment.reconfigure(this.buildAutocompleteExtension()));
    }
    if (changes['extensions'] && !changes['extensions'].firstChange) {
      effects.push(this.extensionsCompartment.reconfigure(this.extensions || []));
    }

    if (effects.length) {
      this.instance.dispatch({ effects });
    }
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
    this.disposeTooltipPortal();
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

  /** Request a layout measure (replaces CM5 refresh). */
  onVisible(): void {
    this.instance?.requestMeasure();
  }

  /** Public alias for consumers that previously called instance.refresh(). */
  refresh(): void {
    this.instance?.requestMeasure();
  }

  /** Reconfigure line numbers at runtime (e.g. full-screen editor settings). */
  setLineNumbers(enabled: boolean): void {
    this._lineNumbers = coerceBooleanProperty(enabled);
    this.instance?.dispatch({
      effects: this.lineNumbersCompartment.reconfigure(this.buildLineNumbersExtension())
    });
  }

  /** Reconfigure fold gutter at runtime. */
  setFoldGutter(enabled: boolean): void {
    this.instance?.dispatch({
      effects: this.foldCompartment.reconfigure(enabled ? foldGutter() : [])
    });
  }

  /** Reconfigure theme at runtime. */
  setTheme(theme: string): void {
    this.theme = theme;
    this.instance?.dispatch({
      effects: this.themeCompartment.reconfigure(themeExtensionForName(theme))
    });
  }

  /** Reconfigure language mode at runtime. */
  setMode(mode: any): void {
    this.mode = mode;
    this.instance?.dispatch({
      effects: [
        this.languageCompartment.reconfigure(languageExtensionForMode(mode)),
        this.lintCompartment.reconfigure(this.buildLintExtension())
      ]
    });
  }

  /** Replace app-specific extensions at runtime. */
  setExtensions(extensions: Extension[]): void {
    this.extensions = extensions || [];
    this.instance?.dispatch({
      effects: this.extensionsCompartment.reconfigure(this.extensions)
    });
  }

  onBlur(): void {
    this.blur.emit(this.getDocValue());
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
      this._updatingFromWrite = true;
      this.instance.dispatch({
        changes: { from: 0, to: this.instance.state.doc.length, insert: val ?? '' }
      });
      this._updatingFromWrite = false;
    } else if (val !== this.value) {
      this._value = val;
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

  private getDocValue(): string {
    return this.instance?.state.doc.toString() ?? this._value ?? '';
  }

  private buildExtensions(): Extension[] {
    const lineWrapping = this.config?.lineWrapping !== false;
    const foldEnabled = this.shouldEnableFoldGutter();

    return [
      history(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      rectangularSelection(),
      crosshairCursor(),
      // Autocomplete / hover tooltips via CDK overlay portal (never clipped by editor overflow).
      tooltips({ parent: this.ensureTooltipPortalParent(), position: 'fixed' }),
      // Pixel-lock editor height to the host so .cm-scroller scrolls for tall docs.
      fillHostHeight(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      highlightSelectionMatches(),
      search(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab
      ]),
      this.themeCompartment.of(themeExtensionForName(this.theme)),
      this.languageCompartment.of(languageExtensionForMode(this.mode ?? this.config?.mode)),
      this.lineNumbersCompartment.of(this.buildLineNumbersExtension()),
      this.readOnlyCompartment.of(this.buildReadOnlyExtension()),
      this.lintCompartment.of(this.buildLintExtension()),
      this.foldCompartment.of(foldEnabled ? foldGutter() : []),
      this.autocompleteCompartment.of(this.buildAutocompleteExtension()),
      this.extensionsCompartment.of(this.extensions || []),
      this.wrappingCompartment.of(lineWrapping ? EditorView.lineWrapping : []),
      EditorView.updateListener.of(update => {
        if (update.docChanged && !this._updatingFromWrite) {
          this.updateValue(update.state.doc.toString());
        }
      }),
      EditorView.domEventHandlers({
        blur: () => {
          this.onBlur();
          return false;
        }
      })
    ];
  }

  /**
   * Mount a viewport-sized host in a shared CDK overlay pane and return it as the
   * CodeMirror tooltip parent so autocomplete is never clipped by overflow.
   */
  private ensureTooltipPortalParent(): HTMLElement {
    if (!CodeEditorComponent.tooltipPortal) {
      const host = this.renderer.createElement('div') as HTMLElement;
      this.renderer.addClass(host, 'ngx-codemirror-tooltip-host');
      // DomPortal requires the node to already be attached before move into the overlay.
      this.renderer.appendChild(document.body, host);

      const overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global().top('0').left('0'),
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        panelClass: 'ngx-codemirror-tooltip-overlay',
        hasBackdrop: false
      });
      overlayRef.attach(new DomPortal(host));

      CodeEditorComponent.tooltipPortal = { overlayRef, host, refCount: 0 };
    }

    if (!this.ownsTooltipPortalLease) {
      CodeEditorComponent.tooltipPortal.refCount++;
      this.ownsTooltipPortalLease = true;
    }

    return CodeEditorComponent.tooltipPortal.host;
  }

  private disposeTooltipPortal(): void {
    if (!this.ownsTooltipPortalLease || !CodeEditorComponent.tooltipPortal) {
      return;
    }

    CodeEditorComponent.tooltipPortal.refCount--;
    this.ownsTooltipPortalLease = false;

    if (CodeEditorComponent.tooltipPortal.refCount <= 0) {
      CodeEditorComponent.tooltipPortal.overlayRef.dispose();
      CodeEditorComponent.tooltipPortal = null;
    }
  }

  private buildLineNumbersExtension(): Extension {
    return this._lineNumbers ? lineNumbersExt() : [];
  }

  private buildReadOnlyExtension(): Extension {
    const ro = this.readOnly === true || this.readOnly === 'nocursor' || this.readOnly === 'true';
    return EditorState.readOnly.of(!!ro);
  }

  private buildLintExtension(): Extension {
    const mode = this.mode ?? this.config?.mode;
    const explicit = this.lint ?? this.config?.lint;
    const lintEnabled = explicit !== false && (!!explicit || isJsonLikeMode(mode) || resolveJsMode(mode));
    if (!lintEnabled) {
      return [];
    }

    if (isJsonLikeMode(mode)) {
      return [lintGutter(), linter(jsonParseLinter())];
    }

    // Soft JS validity without eval / new Function (CSP-safe).
    if (resolveJsMode(mode)) {
      return [lintGutter(), linter(jsSoftLinter)];
    }

    return explicit ? [lintGutter()] : [];
  }

  private buildAutocompleteExtension(): Extension {
    if (!this.autocompleteTokens?.length) {
      return autocompletion({ activateOnTyping: true });
    }

    const tokens = this.autocompleteTokens;
    const source = (context: CompletionContext) => {
      const word = context.matchBefore(/[\S$]+/);
      if (!word && !context.explicit) {
        return null;
      }
      const from = word ? word.from : context.pos;
      const typed = word ? word.text : '';
      const options = tokens
        .filter((s: string | HintCompletion) => {
          const text = typeof s === 'string' ? s : s.text;
          return text ? text.startsWith(typed) : false;
        })
        .map((s: string | HintCompletion) => {
          if (typeof s === 'string') {
            return { label: s };
          }
          return {
            label: s.displayText || s.text,
            apply: s.text,
            type: s.className
          };
        });

      return { from, options, validFor: /[\S$]*/ };
    };

    return autocompletion({
      override: [source],
      activateOnTyping: true,
      defaultKeymap: true
    });
  }

  private shouldEnableFoldGutter(): boolean {
    if (this.config?.foldGutter === false) {
      return false;
    }
    const gutters = this.gutters?.length ? this.gutters : this.config?.gutters || [];
    if (!gutters.length) {
      return true;
    }
    return gutters.some((g: string | { className: string }) => {
      const name = typeof g === 'string' ? g : g?.className;
      return name === 'CodeMirror-foldgutter' || name === 'cm-foldGutter' || name === 'fold';
    });
  }
}

function resolveJsMode(mode: any): boolean {
  if (!mode) {
    return false;
  }
  if (typeof mode === 'string') {
    return mode.toLowerCase() === 'javascript' || mode.toLowerCase() === 'js';
  }
  return mode.name === 'javascript' || mode.name === 'js';
}

/** Soft JS lint without eval / new Function (CSP-safe). */
function jsSoftLinter(view: EditorView): Diagnostic[] {
  const text = view.state.doc.toString();
  const diagnostics: Diagnostic[] = [];
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escape = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === '\\' && (inSingle || inDouble || inTemplate)) {
      escape = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === "'") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"') {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === '`') {
      inTemplate = !inTemplate;
      continue;
    }
    if (inSingle || inDouble || inTemplate) {
      continue;
    }
    if (ch === '{' || ch === '(' || ch === '[') {
      depth++;
    } else if (ch === '}' || ch === ')' || ch === ']') {
      depth--;
      if (depth < 0) {
        diagnostics.push({
          from: i,
          to: i + 1,
          severity: 'error',
          message: 'Unmatched closing bracket'
        });
        depth = 0;
      }
    }
  }

  if (inSingle || inDouble || inTemplate) {
    diagnostics.push({
      from: Math.max(0, text.length - 1),
      to: text.length,
      severity: 'error',
      message: 'Unterminated string'
    });
  } else if (depth > 0) {
    diagnostics.push({
      from: Math.max(0, text.length - 1),
      to: text.length,
      severity: 'error',
      message: 'Unmatched opening bracket'
    });
  }

  return diagnostics;
}
