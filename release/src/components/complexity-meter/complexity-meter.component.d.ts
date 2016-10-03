import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import './complexity-meter.scss';
export declare class ComplexityMeterComponent implements OnInit, OnChanges {
    value: string;
    showMessage: boolean;
    showAscent: boolean;
    onChange: EventEmitter<{}>;
    private results;
    readonly score: any;
    readonly message: any;
    readonly cssClass: string;
    ngOnInit(): void;
    ngOnChanges(change: any): void;
    updateValue(value: any): void;
}
