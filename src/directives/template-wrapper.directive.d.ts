import { ViewContainerRef } from '@angular/core';
export declare class TemplateWrapperDirective {
    private viewContainer;
    template: any;
    context: any;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
