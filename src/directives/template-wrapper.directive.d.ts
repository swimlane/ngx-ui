import { ViewContainerRef } from '@angular/core';
export declare class TemplateWrapper {
    private viewContainer;
    template: any;
    context: any;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
