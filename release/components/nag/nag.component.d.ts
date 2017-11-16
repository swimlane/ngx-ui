import { EventEmitter, OnDestroy, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class NagComponent implements OnDestroy, OnChanges, OnInit {
    cssClass: string;
    state: string;
    stateChange: EventEmitter<string>;
    stateChanged: EventEmitter<string>;
    zIndex: number;
    title: string;
    watch: any;
    readonly klass: string;
    ngOnInit(): void;
    toggle(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
