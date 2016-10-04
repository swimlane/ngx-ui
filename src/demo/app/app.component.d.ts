/// <reference types="core-js" />
import { TemplateRef } from '@angular/core';
import { DrawerService } from '../../components/drawer';
import { DialogService } from '../../components/dialog';
import './app.scss';
export declare class App {
    private drawerMngr;
    private dialogMngr;
    version: string;
    editTmpl: TemplateRef<any>;
    dialogTpl: TemplateRef<any>;
    tooltipModel: {
        text: string;
    };
    dynamicVal: string;
    colors: string[];
    chartColorsOrdinal: {
        name: string;
        colors: string[];
    }[];
    chartColorsSequential: {
        name: string;
        colors: string[];
    }[];
    icons: any;
    code: string;
    curDate1: any;
    curDate: Date;
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
    constructor(drawerMngr: DrawerService, dialogMngr: DialogService);
    dateChanged(val: any): void;
    setTheme(theme: any): void;
    openDrawer(direction?: string): void;
    openDialog(options: any): void;
    menuClicked(event: any): void;
}
