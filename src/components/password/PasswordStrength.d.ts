import { EventEmitter } from '@angular/core';
import './passwordStrength.scss';
export declare class PasswordStrength {
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
