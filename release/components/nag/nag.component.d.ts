import { EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
export declare class NagComponent implements OnDestroy, OnChanges {
    cssClass: string;
    state: string;
    stateChanged: EventEmitter<string>;
    zIndex: number;
    title: string;
    watch: any;
    readonly klass: string;
    toggle(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
