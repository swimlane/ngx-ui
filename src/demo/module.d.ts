import { ApplicationRef } from '@angular/core';
export declare class AppModule {
    private appRef;
    constructor(appRef: ApplicationRef);
    hmrOnDestroy(store: any): void;
    hmrAfterDestroy(store: any): void;
}
