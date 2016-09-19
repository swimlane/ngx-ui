import { EventEmitter } from '@angular/core';
import './password-strength.scss';
export declare class PasswordStrengthComponent {
    id: string;
    name: any;
    value: string;
    placeholder: string;
    showMessage: boolean;
    showAscent: boolean;
    onChange: EventEmitter<{}>;
    results: any;
    readonly cssClasses: string;
    readonly score: any;
    readonly message: any;
    ngOnInit(): void;
    onKeyUp(event: any): void;
}
