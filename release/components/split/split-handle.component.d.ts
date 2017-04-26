import { AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
export declare class SplitHandleComponent implements AfterContentInit {
    button: any;
    drag: Observable<{
        x: number;
        y: number;
    }>;
    ngAfterContentInit(): void;
}
