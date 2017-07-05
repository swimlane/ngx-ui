var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, Input, Output, ViewChild, Renderer, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
// themes
import * as codeMirrorCss from 'codemirror/lib/codemirror.css';
import * as lintCss from 'codemirror/addon/lint/lint.css';
import * as dialogCss from 'codemirror/addon/dialog/dialog.css';
import * as foldCss from 'codemirror/addon/fold/foldgutter.css';
import * as draculaCss from 'codemirror/theme/dracula.css';
import * as ngxEditorCss from './code-editor.component.scss';
var CODEMIRROR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CodeEditorComponent; }),
    multi: true
};
var CodeEditorComponent = (function () {
    function CodeEditorComponent(renderer) {
        this.renderer = renderer;
        this.config = {};
        this.theme = 'dracula';
        this.readOnly = false;
        this.autofocus = false;
        this.allowDropFileTypes = [];
        this.gutters = [];
        this.change = new EventEmitter();
        this.onTouchedCallback = function () {
            // placeholder
        };
        this.onChangeCallback = function () {
            // placeholder
        };
    }
    Object.defineProperty(CodeEditorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            if (val !== this._value) {
                this._value = val;
                this.onChangeCallback(val);
                this.change.emit(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CodeEditorComponent.prototype.ngOnInit = function () {
        this.config = __assign({ theme: this.theme, readOnly: this.readOnly, mode: this.mode, autofocus: this.autofocus, lint: this.lint, allowDropFileTypes: this.allowDropFileTypes, lineNumbers: this.lineNumbers, gutters: this.gutters }, this.config);
    };
    CodeEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (typeof this.value !== 'string') {
            var elm = this.content.nativeElement;
            var code = elm.innerHTML;
            this.renderer.detachView([].slice.call(elm.childNodes));
            this.host.nativeElement.value = this.cleanCode(code);
        }
        this.instance = CodeMirror.fromTextArea(this.host.nativeElement, this.config);
        this.instance.on('change', function () {
            _this.updateValue(_this.instance.getValue());
        });
    };
    CodeEditorComponent.prototype.ngOnDestroy = function () {
        this.instance.off('change');
    };
    CodeEditorComponent.prototype.cleanCode = function (code) {
        var lines = code.split('\n');
        // Remove empty lines
        lines = lines.filter(function (line) {
            return line.trim().length > 0;
        });
        // don't mess w/ empties
        if (!lines.length)
            return '';
        // Make it so each line starts at 0 whitespace
        var firstLineWhitespace = lines[0].match(/^\s*/)[0];
        var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
        lines = lines.map(function (line) {
            return line
                .replace('=""', '') // remove empty values
                .replace(startingWhitespaceRegex, '')
                .replace(/\s+$/, '');
        });
        var codeToParse = lines.join('\n')
            .replace(/\{ \{/gi, '{{').replace(/\} \}/gi, '}}')
            .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
        return codeToParse;
    };
    CodeEditorComponent.prototype.onVisible = function () {
        // hidden on init will cause incorrect sizing
        this.instance.refresh();
    };
    CodeEditorComponent.prototype.updateValue = function (value) {
        this.value = value;
        this.onTouchedCallback();
        this.onChangeCallback(value);
        this.change.emit(value);
    };
    CodeEditorComponent.prototype.writeValue = function (val) {
        if (val !== this.value && this.instance) {
            this._value = val;
            this.instance.setValue(this._value);
        }
    };
    CodeEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CodeEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    CodeEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-codemirror',
                    providers: [CODEMIRROR_VALUE_ACCESSOR],
                    template: "\n    <div visibilityObserver (visible)=\"onVisible()\">\n      <textarea #host></textarea>\n      <div #content>\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    styles: [
                        codeMirrorCss,
                        lintCss,
                        draculaCss,
                        dialogCss,
                        ngxEditorCss,
                        foldCss
                    ]
                },] },
    ];
    /** @nocollapse */
    CodeEditorComponent.ctorParameters = function () { return [
        { type: Renderer, },
    ]; };
    CodeEditorComponent.propDecorators = {
        'config': [{ type: Input },],
        'theme': [{ type: Input },],
        'readOnly': [{ type: Input },],
        'mode': [{ type: Input },],
        'autofocus': [{ type: Input },],
        'lint': [{ type: Input },],
        'allowDropFileTypes': [{ type: Input },],
        'lineNumbers': [{ type: Input },],
        'gutters': [{ type: Input },],
        'change': [{ type: Output },],
        'host': [{ type: ViewChild, args: ['host',] },],
        'content': [{ type: ViewChild, args: ['content',] },],
    };
    return CodeEditorComponent;
}());
export { CodeEditorComponent };
//# sourceMappingURL=code-editor.component.js.map