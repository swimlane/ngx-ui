/// <reference types="core-js" />
import { TemplateRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { DrawerService } from '../../src/components/drawer';
import { DialogService } from '../../src/components/dialog';
import { NotificationService } from '../../src/components/notification';
import 'angular2-data-table/release/datatable.css';
import './app.scss';
export declare class App {
    private drawerMngr;
    private dialogMngr;
    private notificationMngr;
    version: string;
    editTmpl: TemplateRef<any>;
    dialogTpl: TemplateRef<any>;
    tooltipModel: {
        text: string;
    };
    chars: string;
    nums: string;
    letters: string;
    lettersLower: string;
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
    rows: any[];
    shadows: any[];
    uploadOptions: {
        url: string;
        autoUpload: boolean;
    };
    uploaderInstance: FileUploader;
    deps: any;
    constructor(drawerMngr: DrawerService, dialogMngr: DialogService, notificationMngr: NotificationService);
    getHex(scssVar: any): any;
    dateChanged(val: any): void;
    setTheme(theme: any): void;
    openDrawer(direction?: string): void;
    openDialog(options: any): void;
    menuClicked(event: any): void;
    onToggleChange(event: any): void;
}
