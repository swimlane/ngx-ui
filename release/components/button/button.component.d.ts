import { OnInit, OnChanges } from '@angular/core';
export declare class ButtonComponent implements OnInit, OnChanges {
    disabled: boolean;
    state: string;
    promise: any;
    inProgress: boolean;
    active: boolean;
    success: boolean;
    fail: boolean;
    _disabled: boolean;
    ngOnInit(): void;
    ngOnChanges(): void;
    updatePromise(): void;
    updateState(): void;
    onClick(event: any): boolean;
}
