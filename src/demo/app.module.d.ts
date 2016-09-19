import { ApplicationRef } from '@angular/core';
export declare class AppModule {
    private applicationRef;
    constructor(applicationRef: ApplicationRef);
    hmrOnDestroy(store: any): void;
    hmrAfterDestroy(store: any): void;
}
