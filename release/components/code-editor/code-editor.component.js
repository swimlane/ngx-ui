var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var CODEMIRROR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CodeEditorComponent; }),
    multi: true
};
var CodeEditorComponent = /** @class */ (function () {
    function CodeEditorComponent(renderer) {
        this.renderer = renderer;
        this.config = {};
        this.theme = 'dracula';
        this.readOnly = false;
        this.autofocus = false;
        this.allowDropFileTypes = [];
        this.gutters = [];
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
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
        this.instance.on('blur', function () {
            _this.blur.emit(_this.instance.getValue());
        });
    };
    CodeEditorComponent.prototype.ngOnDestroy = function () {
        this.instance.off('change');
        this.instance.off('blur');
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
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "config", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CodeEditorComponent.prototype, "theme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "readOnly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CodeEditorComponent.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "lint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CodeEditorComponent.prototype, "allowDropFileTypes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "lineNumbers", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CodeEditorComponent.prototype, "gutters", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CodeEditorComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CodeEditorComponent.prototype, "blur", void 0);
    __decorate([
        ViewChild('host'),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "host", void 0);
    __decorate([
        ViewChild('content'),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "content", void 0);
    CodeEditorComponent = __decorate([
        Component({
            selector: 'ngx-codemirror',
            providers: [CODEMIRROR_VALUE_ACCESSOR],
            template: "\n    <div visibilityObserver (visible)=\"onVisible()\">\n      <textarea #host></textarea>\n      <div #content>\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styleUrls: [
                './codemirror.css',
                './lint.css',
                './dialog.css',
                './foldgutter.css',
                './dracula.css',
                './code-editor.component.css'
            ]
        }),
        __metadata("design:paramtypes", [Renderer])
    ], CodeEditorComponent);
    return CodeEditorComponent;
}());
export { CodeEditorComponent };
//# sourceMappingURL=code-editor.component.js.map