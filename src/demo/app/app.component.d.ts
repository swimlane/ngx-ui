import { TemplateRef, ViewContainerRef } from '@angular/core';
import { DrawerManagerService } from '../../components/drawer';
import './app.scss';
export declare class App {
    private drawerMngr;
    viewContainerRef: ViewContainerRef;
    version: string;
    editTmpl: TemplateRef<any>;
    tooltipModel: {
        text: string;
    };
    dynamicVal: string;
    colors: string[];
    icons: any;
    code: string;
    state: any;
    editorConfig: {
        lineNumbers: boolean;
        theme: string;
        mode: {
            name: string;
            json: boolean;
        };
    };
    sliderValue: number;
    gradients: string[];
    toolbarMenu: ({
        label: string;
        click: () => void;
    } | {
        label: string;
        disabled: boolean;
    })[];
    shadows: any[];
    constructor(drawerMngr: DrawerManagerService, viewContainerRef: ViewContainerRef);
    setTheme(theme: any): void;
    openDrawer(direction?: string): void;
    menuClicked(event: any): void;
}
