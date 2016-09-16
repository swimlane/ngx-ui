import { ViewContainerRef } from '@angular/core';
export declare class TemplateWrapper {
    template: any;
    context: any;
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
