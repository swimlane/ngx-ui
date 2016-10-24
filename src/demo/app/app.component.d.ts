/// <reference types="core-js" />
import { TemplateRef } from '@angular/core';
import { DrawerService } from '../../components/drawer';
import { DialogService } from '../../components/dialog';
import { TableOptions } from 'angular2-data-table';
import 'angular2-data-table/release/datatable.css';
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
    toggleChk: boolean;
    code: string;
    curDate: Date;
    minDate: Date;
    maxDate: Date;
    invalidDate: string;
    emptyDate: any;
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
    table: {
        rows: any[];
        options: TableOptions;
    };
    shadows: any[];
    uploader: {
        url: string;
        autoUpload: boolean;
    };
    deps: any;
    constructor(drawerMngr: DrawerService, dialogMngr: DialogService);
    getHex(scssVar: any): any;
    dateChanged(val: any): void;
    setTheme(theme: any): void;
    openDrawer(direction?: string): void;
    openDialog(options: any): void;
    menuClicked(event: any): void;
    onToggleChange(event: any): void;
}
