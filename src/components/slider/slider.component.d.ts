import { EventEmitter } from '@angular/core';
export declare class SliderComponent {
    id: string;
    min: number;
    max: number;
    step: number;
    orientation: string;
    filled: boolean;
    multiple: boolean;
    showTicks: boolean;
    tickStep: any;
    _value: any;
    count: any[];
    active: boolean;
    value: any;
    onChange: EventEmitter<{}>;
    readonly isFilled: boolean;
    readonly isHorizontal: boolean;
    readonly isVertical: boolean;
    readonly isActive: boolean;
    readonly percent: number;
    getCount(): any[];
    getFill(): {
        'background-size': string;
    };
    onMouseDown(): void;
    onMouseUp(): void;
    ngOnInit(): void;
    changed(event: any): void;
}
